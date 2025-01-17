Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    email: false
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    try {
      var email = wx.getStorageSync('email')
      if (email) {
        that.setData({
          email: email
        })
      }
    } catch (e) {
      console.log('未获取到邮箱缓存')
    }
    // numDH();

    // function numDH() {
    //   if (i < 20) {
    //     setTimeout(function() {
    //       that.setData({
    //         starCount: i,
    //         forksCount: i,
    //         visitTotal: i
    //       })
    //       i++
    //       numDH();
    //     }, 20)
    //   } else {
    //     that.setData({
    //       starCount: that.coutNum(3000),
    //       forksCount: that.coutNum(484),
    //       visitTotal: that.coutNum(24000)
    //     })
    //   }
    // }
    wx.hideLoading()
  },
  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
    xihuan: function() {
      wx.navigateTo({
        url: '/pages/xihuan/index?ifrom=like',
      })
    },
    trash: function() {
      wx.navigateTo({
        url: '/pages/xihuan/index?ifrom=trash',
      })
    },
    emailModal: function(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    bindEmail: function(e) {
      var that = this;
      console.log(e.detail.value.email);
      try {
        wx.setStorageSync('email', e.detail.value.email);
        this.setData({
          email: e.detail.value.email
        })
        wx.showToast({
          icon:'success',
          title: '绑定成功',
        })
        that.hideModal();
      } catch (e) {}

    }
  },
})