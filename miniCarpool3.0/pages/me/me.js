// pages/my/my.js
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
  jump_to_launch_list: function () {
    wx.navigateTo({
      url: '/pages/me/history/history?id=0'
    })
  },
  jump_to_join_list: function () {
    wx.navigateTo({
      url: '/pages/me/history/history?id=1'
    })
  },
  jump_to_help: function () {
    wx.navigateTo({
      url: '/pages/me/help/help'
    })
  },
  jump_to_history_list: function () {
    wx.navigateTo({
      url: '/pages/me/history/history?id=2'
    })
  },
  jump_to_feedback: function () {
    wx.navigateTo({
      url: '/pages/me/feedback/feedback'
    })
  },
  jump_to_aboutme: function () {
    wx.navigateTo({
      url: '/pages/me/aboutme/aboutme'
    })
  }
})