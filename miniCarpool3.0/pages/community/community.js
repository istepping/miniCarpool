// pages/community/community.js
var util = require('../../utils/util.js');
var server=require('../../utils/server.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    animationData: null,
    comment: [
    ],
    submit:'',
    pId:''
  },
  input_comment: function (e) {
    this.setData({
      submit: e.detail.value
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      submit:''
    });
  }, 
  confirm: function (e) {
    if(this.data.submit==''){
      wx.showToast({
        title: '请输入内容',
        icon:'none',
        duration:500
      })
      return;
    }
    var that=this;
    this.setData({
      hiddenmodalput: true
    })
    server.request('/comment/add',{pId:this.data.pId,content:this.data.submit},function(res){
      that.setData({
        submit:''
      })
    })
  } ,
  appearance: function (e) {
    var that=this;
    this.setData({
      pId: that.data.comment[e.currentTarget.dataset.id].post.pId
    })
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  }, 
  change_image: function (e){
    var temp=this.data.comment;
    temp[e.currentTarget.dataset.id].is_like=true;
    temp[e.currentTarget.dataset.id].post.pLike+=1;
    this.setData({
      comment:temp
    })
    server.request('/post/like', { pId: this.data.comment[e.currentTarget.dataset.id].post.pId},function(res){});
  },
  stretch: function(e){
    console.log(e);
    var that = this;
    console.log("comment");
    console.log(that.data.comment);
    server.request('/comment/get',{pId:e.currentTarget.dataset.pid},function(res){
      var temp1=that.data.comment;
      temp1[e.currentTarget.dataset.id].report=res.data.data.comments
      that.setData({
        comment:temp1
      })
      var bol = that.data.comment[e.currentTarget.dataset.id].visible
      var temp = that.data.comment;
      temp[e.currentTarget.dataset.id].visible = !bol;
      that.setData({
        comment: temp
      })
      console.log(that.data.comment);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    server.request('/post/get','',function(res){
      var temp = res.data.data.posts;
      for(var i=0;i<temp.length;i++){
        temp[i].visible = false;
      }
      that.setData({
        comment:temp
      })
      console.log(temp);
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
    var that = this;
    server.request('/post/get', '', function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon:'none',
        duration:500
      })
      var temp = res.data.data.posts;
      for (var i = 0; i < temp.length; i++) {
        temp[i].visible = false;
      }
      that.setData({
        comment: temp
      })
      console.log(temp);
    })
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
  add: function(){
    wx.navigateTo({
      url: '/pages/create_tip/create_tip',
    })
  }
})