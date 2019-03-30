// pages/chat/chat.js
var server=require("../../utils/server.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gId:'13',
    groupInfo:{},
    send_msg:'',
    msgList:[{
      senderId:'1000',
      senderAvatar:'',
      sendTime:'2019-12-23 12:30',
      msg:'你好'
    }]
  },
  sendChange:function(res){
    this.setData({
      send_msg:res.detail.value
    })
  },
  goSet:function(res){

  },
  showDetail:function(res){
  },
  emoj:function(res){

  },
  send:function(res){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //群ID
    if(options.gId!=null){
      this.setData({
        gId:options.gId
      })
    }
    //加载群信息
    server.request("/group/getGroup",{gId:this.data.gId},function(res){
      if(res.data.statusCode=="1"){
        that.setData({
          groupInfo:res.data.data.groupInfo
        })
      }
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