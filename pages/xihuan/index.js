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
 
 


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
   
    var that=this
   wx.request({
     url: getApp().globalData.url + 'index/xihuana',
     header: {
       'Cookie': 'PHPSESSID=' + getApp().globalData.pid
     },
     success:function(res){
      that.setData({
        list:res.data
      })
     }
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
