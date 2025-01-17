//index.js
//获取应用实例
const app = getApp()
const url = getApp().globalData.url
Page({
  data: {
    ifrom: 'like',
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
  onLoad: function(options) {

    var that = this
    if (options.ifrom == 'like') {
      wx.request({
        url: getApp().globalData.url + 'index/xihuana',
        header: {
          'Cookie': 'PHPSESSID=' + getApp().globalData.pid
        },
        success: function(res) {
          that.setData({
            list: res.data
          })
        }
      })
    }

    if (options.ifrom == 'trash') {
      wx.request({
        url: app.globalData.root + '/zq/getDeletedBookComment.php',
        success: function(res) {
          that.setData({
            list: res.data,
            ifrom: 'trash'
          })
          that.calcLeftDays();
        }
      })

    }





  },

  calcLeftDays: function() {
    var that = this;
    var leftDaysArray = [];
    for (let i = 0; i < that.data.list.length; i++) {
      let now = parseInt(new Date().getTime() / 1000);
      let lastUpdate = that.data.list[i].createtime;
      let leftDay = 0;
      leftDay = parseInt((now - lastUpdate) / (3600 * 24));
      leftDaysArray.push(leftDay);
    }
    // console.log(leftDaysArray);
    that.setData({
      leftDaysArray: leftDaysArray
    })
  },
  go: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/view?id=' + id,
    })
  },
  goBook: function(e) {
    wx.navigateTo({
      url: '/pages/my/book?isbn=' + e.currentTarget.dataset.isbn + '&id=' + e.currentTarget.dataset.id,
    })
  },
  fa: function() {
    wx.navigateTo({
      url: '/pages/index/fa',
    })
  },
  user: function() {
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