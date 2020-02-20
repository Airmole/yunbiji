var app = getApp();
Page({
  data: {
    ISBN: "",
    jsonStr: "",
    doubanStr: '',
  },
  onLoad: function(options) {
    console.log(options)
    var that = this;
    var id = options.id;
    wx.request({
      url: 'https://airmole.cn/doubanapi/v2/book/isbn/' + options.isbn,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        that.setData({
          doubanStr: res.data,
        })
      }
    })
    wx.request({
      url: app.globalData.root + '/zq/getBookById.php?id=' + id,
      method: 'GET',
      success: function(res) {
        if (res.data.length > 0) {
          that.setData({
            booklist: res.data,
            thisid: id
          })
        }
      }
    })
  },
  onReady: function() {

  },
  onShareAppMessage: function(res) {},
  delete: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.root + '/zq/delBookById.php?id=' + that.data.thisid,
      method: 'GET',
      success: function(res) {
        if (res.data.result) {
          wx.showToast({
            icon: 'success',
            title: '删除成功',
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
        }
      }
    })

  },
});