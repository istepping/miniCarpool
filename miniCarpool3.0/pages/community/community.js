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
  },
  input_comment: function (e) {
    var app = getApp()
    app.globalData.comments = e.detail.value
    // console.log(app.globalData.comments)
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  }, 
  confirm: function (e) {
    this.setData({
      hiddenmodalput: true
    })
    var that = this
    var app = getApp()
    // console.log(app.globalData.comments)
    if(app.globalData.comments){
      var obj={}
      app.globalData.time = util.formatTime(new Date())
      obj.comments = app.globalData.comments
      obj.time = app.globalData.time
      // let comment = that.data.comment
      let temp = that.data.comment[app.globalData.id].info
      temp.push(obj)
      let comment = that.data.comment
      that.setData({comment})
      // console.log(temp)
      // temp.push(obj)
      // that.setData({temp})
      // app.globalData.comments = null
    }
  } ,
  appearance: function (e) {
    var app = getApp()
    app.globalData.id = e.currentTarget.dataset.id
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
    // console.log(e.currentTarget.dataset.id)
  }, 
  reload: function () {
    var that = this
    var app = getApp()
      if (app.globalData.title && app.globalData.content) {
        var obj = {}
        app.globalData.time = util.formatTime(new Date())
        obj.community_title = app.globalData.title
        obj.community_content = app.globalData.content
        obj.community_time = app.globalData.time
        obj.number = 0
        obj.info = []
        let comment = that.data.comment
        comment.push(obj)
        that.setData({ comment })
        app.globalData.title = null
        app.globalData.content = null
    }
  },
  change_image: function (e){
    var that = this
    var bol = that.data.comment[e.currentTarget.dataset.id].is_like
    // console.log(that.data.comment[e.currentTarget.dataset.id].number)
    if(!bol){
      var numbers = that.data.comment[e.currentTarget.dataset.id].number
      var param_1 = {}
      var string_1 = "comment[" + e.currentTarget.dataset.id + "].number"
      param_1[string_1] = numbers + 1
      that.setData(param_1)
    }
    else{
      var numbers = that.data.comment[e.currentTarget.dataset.id].number
      var param_1 = {}
      var string_1 = "comment[" + e.currentTarget.dataset.id + "].number"
      param_1[string_1] = numbers - 1
      that.setData(param_1)
    }
    var param = {}
    var string = "comment[" + e.currentTarget.dataset.id + "].is_like"
    param[string] = !bol
    that.setData(param)
    // console.log(e)
  },
  stretch: function(e){
    var that = this
    var bol = that.data.comment[e.currentTarget.dataset.id].is_visible
    var param = {}
    var string = "comment[" + e.currentTarget.dataset.id + "].is_visible"
    param[string] = !bol
    that.setData(param)
    // console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    server.request('/post/get','',function(res){
      that.setData({
        comment:res.data.data.posts
      })
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
  },
  add: function(){
    wx.navigateTo({
      url: '/pages/create_tip/create_tip',
    })
  }
})