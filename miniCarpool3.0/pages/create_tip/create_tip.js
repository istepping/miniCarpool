// pages/create_tip/create_tip.js
var server=require("../../utils/server.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:''
  },
  input_1:function(e){
     this.setData({
       title: e.detail.value
     })
  },
  input_2: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  deliver_action: function(){
    if (this.data.title && this.data.content)
    {
      wx.showLoading({
        title: '创建中...',
      })
      server.request("/post/add",{title:this.data.title,content:this.data.content},function(res){
        wx.hideLoading();
        wx.navigateBack({
          delta: 1
        })
      })
    }
    else{
      wx.showToast({
        title: '内容不完整',
        icon:'none',
        duration: 1000
      })
    }
  }
})