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

  biaoti: function (e) {
    console.log(e.detail.value)
    this.setData({

      biaoti: e.detail.value
    })
  },

  tuijian: function () {
    var that = this
    wx.request({
      header: {
        'Cookie': 'PHPSESSID=' + getApp().globalData.pid
      },
      url: getApp().globalData.url + 'index/tuijian',
      data: {
        userinfo: getApp().globalData.userInfo
      },
      success: function (res) {     //获取各个权限

        if (res.data.length == 0) {
          wx.showToast({
            title: '暂无推荐',
          })

        }
        else {
          that.setData({
            list: res.data
          })
        }
      }
    })

  },


  gogo: function () {
    var that = this
    wx.request({
      url: getApp().globalData.url + 'index/tiezia',
      data: ({ key: this.data.biaoti }),
      success: function (res) {
        that.setData({
          list: res.data
        })
      }
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.tuijian()
  },


  kan: function (e) {
    wx.navigateTo({
      url: '/pages/kan/user?openid=' + e.currentTarget.dataset.openid,
    })
  },
  go: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/view?id=' + id,
    })
  },
  fa: function () {
    wx.navigateTo({
      url: '/pages/index/fa',
    })
  },
  my: function () {
    wx.navigateTo({
      url: '/pages/index/my',
    })
  },
  user: function () {
    wx.navigateTo({
      url: '/pages/index/user',
    })
  },
  getUserInfo: function (e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  }
})
