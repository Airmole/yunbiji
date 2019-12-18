var app = getApp();
Page({
  data: {
    ISBN: "",
    jsonStr: "",
    doubanStr: '',
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var id = options.id;
    wx.request({
      url:  'https://airmole.cn/doubanapi/v2/book/isbn/' + options.isbn,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          doubanStr: res.data,
        })
      }
    })
    wx.request({
      url: app.globalData.root + '/zq/getBookById.php?id='+id,
      method: 'GET',
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            booklist: res.data
          })
        }
      }
    })
  },
  onReady: function () {

  },
  onShareAppMessage: function (res) {
  },
});