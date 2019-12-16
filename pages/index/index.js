//index.js
//获取应用实例
const app = getApp()
const url = getApp().globalData.url
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  biaoti:function(e){
    console.log(e.detail.value)
    this.setData({
   
      biaoti: e.detail.value
    })
  },

  tuijian:function(){
    var that=this
    wx.request({
      header: {
        'Cookie': 'PHPSESSID=' + getApp().globalData.pid
      },
      url: getApp().globalData.url + 'index/tuijian',
      data: {
        userinfo: getApp().globalData.userInfo
      },
      success: function (res) {     //获取各个权限

        if(res.data.length==0)
        {
          wx.showToast({
            title: '暂无推荐',
          })
       
        }
        else{
          that.setData({
            list:res.data
          })
        }
      }
    })
  
  },


  gogo:function(){
    var that=this
    wx.request({
      url: getApp().globalData.url + 'index/tiezia',
      data:({key:this.data.biaoti}),
      success: function (res) {
        that.setData({
          list: res.data
        })
      }
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   
    var that=this
   wx.request({
     url: getApp().globalData.url + 'index/tiezi?cha=1',
     success:function(res){
      that.setData({
        list:res.data
      })
     }
   })

    function show() {
      wx.request({
        header: {
          'Cookie': 'PHPSESSID=' + getApp().globalData.pid
        },
        url: getApp().globalData.url + 'index/update',
        data: {
          userinfo: getApp().globalData.userInfo
        },
        success: function (res) {     //获取各个权限

         console.log(res)
        }
      })
    } 
    setTimeout(show, 1000)
  },


  kan:function(e){
    wx.navigateTo({
      url: '/pages/kan/user?openid='+e.currentTarget.dataset.openid,
    })
  },
  go:function(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/view?id='+id,
    })
  },
  fa:function(){
    wx.navigateTo({
      url: '/pages/index/fa',
    })
  },
  my:function(){
    wx.navigateTo({
      url: '/pages/index/my',
    })
  },
  user: function () {
    wx.navigateTo({
      url: '/pages/index/user',
    })
  },
  getUserInfo: function(e) {
   
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    
  }
})
