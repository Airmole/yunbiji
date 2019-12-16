// pages/index/view.js
var id
var ida
Page({

  /**
   * 页面的初始数据
   */
  data: {
  root:getApp().globalData.root
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id=options.id
    ida =options.id
   
    var that=this
    wx.request({
      url: getApp().globalData.url + 'index/tiezicha?id='+id,
      success: function (res) {
        var img = JSON.parse(res.data.a_image)
        console.log(img)
        that.setData({
          list: res.data,
          image: img

        })
      }
    })
    
      
    
  },
   
   
   xihuan:function(e){
     var that=this
     console.log(e.currentTarget.dataset.id)
     var id = e.currentTarget.dataset.id
     wx.request({
       header: {
         'Cookie': 'PHPSESSID=' + getApp().globalData.pid
       },
       url: getApp().globalData.url + 'index/xihuan',
       data: {
         id: ida,
        
       },
       success: function (res) {     //获取各个权限

         var  shiti=that.data.list
           if(res.data==1){
             shiti.xihuan=Number(shiti.xihuan)+1
           }
           else{
             shiti.xihuan = Number(shiti.xihuan)- 1
           }
           that.setData({
             list:shiti
           })
      
       }
     })
   },





   tijiao:function(){
     if (this.data.neirong){
       wx.request({
         header: {
           'Cookie': 'PHPSESSID=' + getApp().globalData.pid
         },
         url: getApp().globalData.url + 'index/huifu',
         data: {
          id:id,
          neirong:this.data.neirong
         },
         success: function (res) {     //获取各个权限

           console.log(res)
         }
       })
       var shiti=this.data.shiti
       shiti.num=Number(shiti.num)+1
       this.setData({
         huifu:'',
         shiti:shiti
       })
      wx.redirectTo({
        url: '/pages/index/view?id=' + id,
      })
     } 
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