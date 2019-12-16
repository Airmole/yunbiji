// pages/index/user.js
var openid
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     openid=options.openid
    var that=this
    wx.request({
      header: {
        'Cookie': 'PHPSESSID=' + getApp().globalData.pid
      },
      url: getApp().globalData.url + 'index/getuser?openid=' + openid,
      data: {
        userinfo: getApp().globalData.userInfo
      },
      success: function (res) {     //获取各个权限
        that.setData({
          userInfo: res.data
        })
      }
    })
  

   
  },
  guanzhu:function(e){
    var openid = e.currentTarget.dataset.openid
    var that=this
    wx.request({
      header: {
        'Cookie': 'PHPSESSID=' + getApp().globalData.pid
      },
      url: getApp().globalData.url + 'index/guanzhu?openid=' + openid,
     
      success: function (res) {     //获取各个权限
        var userinfo = that.data.userInfo
        if(res.data == 1){
          userinfo.guanzhu = Number(userinfo.guanzhu) + 1
        }
        else{
        userinfo.guanzhu = Number(userinfo.guanzhu) - 1
      }
        that.setData({
        userInfo: userinfo
      })

      }
    })

  }
,

fa:function(){
    wx.navigateTo({
      url: '/pages/index/fa',
    })
  },
  index: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  my:function(){
    wx.navigateTo({
      url: '/pages/my/index?id='+openid,
    })
  },
  xihuan: function () {
    wx.navigateTo({
      url: '/pages/xihuan/index?id='+openid,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})