//index.js
//获取应用实例
const app = getApp()
const url = getApp().globalData.url
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isbnCode: '',
    title: '',
    content: '',
  },
  onLoad: function() {
    // this.tuijian()
    console.log(app)
  },

  title: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  content: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  biaoti: function(e) {
    console.log(e.detail.value)
    this.setData({

      biaoti: e.detail.value
    })
  },

  tuijian: function() {
    var that = this
    wx.request({
      header: {
        'Cookie': 'PHPSESSID=' + getApp().globalData.pid
      },
      url: getApp().globalData.url + 'index/tuijian',
      data: {
        userinfo: getApp().globalData.userInfo
      },
      success: function(res) { //获取各个权限

        if (res.data.length == 0) {
          wx.showToast({
            title: '暂无推荐',
          })

        } else {
          that.setData({
            list: res.data
          })
        }
      }
    })

  },


  gogo: function() {
    var that = this
    wx.request({
      url: getApp().globalData.url + 'index/tiezia',
      data: ({
        key: this.data.biaoti
      }),
      success: function(res) {
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
  kan: function(e) {
    wx.navigateTo({
      url: '/pages/kan/user?openid=' + e.currentTarget.dataset.openid,
    })
  },
  go: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/view?id=' + id,
    })
  },
  fa: function() {
    wx.navigateTo({
      url: '/pages/index/fa',
    })
  },
  my: function() {
    wx.navigateTo({
      url: '/pages/index/my',
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

  },
  // ISBNInput: function(e) {
  //   //console.log(e.detail.value['isbn']);
  //   var that = this;
  //   that.setData({
  //     isbnCode: res.result
  //   })
  // },
  /**
   * 扫码
   */
  scan: function() {
    var that = this;
    wx.scanCode({
      success: (res) => {
        if (res.errMsg !== 'scanCode:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }
        if (res.scanType !== 'EAN_13') {
          wx.showToast({
            title: '这不是ISBN码',
            icon: 'loading',
            duration: 8000
          })
          return false;
        }
        that.setData({
          isbnCode: res.result
        })
      }
    })
  },
  publish: function() {
    var title = this.data.title;
    var content = this.data.content;
    var isbn = this.data.isbnCode;
    var nickname = app.globalData.userInfo.nickName;
    var openid = app.globalData.openid;

    wx.request({
      url: app.globalData.root + '/zq/publishBookComment.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        title: title,
        content: content,
        isbn: isbn,
        nickname: nickname,
        openid: openid,
      },
      success: function(res) {
        if (res.data == 'success') {
          wx.showToast({
            title: '发表成功',
            icon: 'success'
          })

        } else {
          wx.showToast({
            title: '提交失败',
            image: '../images/error.png'
          })
        }
      }
    })
  },
  inputISBN: function(e) {
    console.log(e)
    this.setData({
      isbnCode: e.detail.value
    })
  }
})