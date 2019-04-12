// pages/home/home.js
/**
 * @author sunLei
 * @time 2019/3/28
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice:'本平台不提供实际拼车服务,致力于帮助大学生在寒暑假出行提供在线组团的功能。   本平台不提供实际拼车服务,致力于帮助大学生在寒暑假出行提供在线组团的功能。   本平台不提供实际拼车服务,致力于帮助大学生在寒暑假出行提供在线组团的功能'
  },
  //创建拼单
  createList:function(){
    wx.navigateTo({
      url: '/pages/home/create/create',
    })
  },
  goCreatedList:function(){
  wx.navigateTo({
      url: '/pages/me/history/history?id=0',
    })
  },
  goJoinedList:function(){
    wx.navigateTo({
      url: '/pages/me/history/history?id=1',
    })
  },
  goHistoryList:function(){
    wx.navigateTo({
      url: '/pages/me/history/history?id=2',
    })
  },
  goHelp:function(){
    wx.navigateTo({
      url: '/pages/me/help/help',
    })
  },
  goSuggesstion:function(){
    wx.navigateTo({
      url: '/pages/me/feedback/feedback',
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

  }
})