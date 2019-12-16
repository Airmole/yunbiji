// pages/index/dati.js
const app = getApp()
var xcolor=[]
var ax=[]  //选择题答案
var tx=[]  //填空题答案
var check=true
var timer=0
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var id=opt.id
    var that=this
    wx.request({
      header: {
        'Cookie': 'PHPSESSID=' + getApp().globalData.pid
      },
      url: getApp().globalData.url + 'index/huoqu?id='+id,
      success:function(res){
      that.setData({
        xuanze:res.data.xuanze,
        tiankong:res.data.tiankong,
        xl:res.data.xuanze.length,
        tl:res.data.tiankong.length,
        timer:res.data.shijian
      })
      that.yanse(that.data.xl)
      that.timer(res.data.shijian)
      }
    })
  },
 timer:function(e){
   var that=this
   timer=e
   var interval = setInterval(function () {
     timer=timer-1
     if (timer == 0) {
       clearInterval(interval);
       that.tijiao()
     }
    that.setData({
      timer:timer
    })
   }, 60000);
 },
  yanse:function(len){ //拼接颜色数组，拼接答案，
   console.log(len)
    for(var i=0;i<len;i++){
      var temp = ['white', 'white', 'white', 'white']
      xcolor.push(temp)
      var temp=''
      ax.push(temp)
      tx.push(temp)
    }
   this.setData({
     xcolor:xcolor
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  xuanze:function(e){//选择题点选
    var id = e.currentTarget.dataset.id
    var cas = e.currentTarget.dataset.case
    xcolor[id][0] = xcolor[id][1] = xcolor[id][2] = xcolor[id][3]='white'
    ax[id]=cas
    switch(cas){
      case 'A':
        xcolor[id][0] ='green';
        break;
      case 'B':
        xcolor[id][1] = 'green';
        break;
      case 'C':
        xcolor[id][2]= 'green';
        break;
      case 'D':
        xcolor[id][3]= 'green';
        break;
    }
    this.setData({
      xcolor:xcolor
    })
  },
  input:function(e){
   
    var id = e.currentTarget.dataset.id
    var val = e.detail.value
    tx[id]=val
  },
  tijiao:function(){
    if(!check){
      return 0;
    }
    check=false
    var xn=0
    var tn=0
    var xcolor=this.data.xcolor
    console.log(xcolor)
    var tcolor=[]
   for(var i=0;i<ax.length;i++){
     if(ax[i]==this.data.xuanze[i].answer){
        xn=xn+1
     }
     else{
      for(var n=0;n<4;n++){
        if(xcolor[i][n]=='green'){
          xcolor[i][n] ='red'
        }
      }
     }
     var txt = '你答对了选择题：' + xn + '/' + this.data.xl + ' 填空题:' + tn + '/' + this.data.tl
     wx.showToast({
       
       title: txt,
       icon: 'none',
       duration: 5000
     })
   }
   for(var i=0;i<tx.length;i++){
     if(tx[i]==this.data.tiankong[i].answer){
       tn=tn+1
       tcolor.push('green')
     }
     else{
       tcolor.push('red')
     }
    
   }
   this.setData({
     xcolor:xcolor,
     tcolor:tcolor
   })

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