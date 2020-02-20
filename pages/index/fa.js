// pages/index/fa.js
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
var neirong = ''
manager.onRecognize = function(res) {
  console.log("current result", res.result)
}

manager.onStart = function(res) {
  console.log("成功开始录音识别", res)
}
manager.onError = function(res) {
  console.error("error msg", res.msg)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: '0',
        value: '公有',
        checked: 'true'
      },
      {
        name: '1',
        value: '私有'
      },

    ],
    title: '', //标题
    neirong: '',
    type: '0',
    root: getApp().globalData.root,
    image: []

  },
  luyin: function() {
    var that = this
    manager.start({
      duration: 30000,
      lang: "zh_CN"
    })
    manager.onStop = function(res) {
      console.log("record file path", res.tempFilePath)
      that.setData({
        neirong: res.result
      })

    }
  },
  jieshu: function() {
    manager.stop();
    this.setData({
      neirong: neirong
    })
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      type: e.detail.value
    })
  },
  tag: function(e) {
    this.setData({
      tag: e.detail.value
    })
  },
  title: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  neirong: function(e) {
    this.setData({
      neirong: e.detail.value
    })
  },
  fatie: function() {
    var that = this;
    if (this.data.title != '' & this.data.neirong != '') {
      wx.request({
        header: {
          'Cookie': 'PHPSESSID=' + getApp().globalData.pid
        },
        url: getApp().globalData.url + 'index/fatie',

        data: {
          title: this.data.title,
          neirong: this.data.neirong,
          type: this.data.type,
          img: this.data.image,
          tag: this.data.tag
        },
        success: function(res) { //获取各个权限
          if (res.data == 'ok') {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              success: function() {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              },
            })
            that.setData({
              title: '',
              neirong: '',
              image: [],
              tag: '',
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '提交失败',
        image: '../images/error.png'
      })
    }

  },
  choice: function() {
    var that = this;
    var istip = false;
    var Img1 = [];
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var imgSrc = res.tempFilePaths;
        for (var i = 0; i < imgSrc.length; i++) {
          wx.uploadFile({
            url: getApp().globalData.url + 'index/photo',
            filePath: imgSrc[i],
            name: 'file',
            method: 'post',
            success: function(res) {
              var img = that.data.image
              img.push(res.data)
              that.setData({
                image: img
              })
            },
            fail: function(res) {
              console.log(res);
              console.log('接口调用失败');
            }
          });
        }
        that.setData({
          imgSrc: imgSrc,
          istip: istip,
        });
      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})