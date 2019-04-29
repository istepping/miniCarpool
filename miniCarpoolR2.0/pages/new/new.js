// pages/near/near.js
/**
 * @author sunLei
 * @time 2019/3/29
 */
var server = require("../../utils/server.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    carListTotal: 0,
    page: 0,
    showDetail: false,
    item: {}
  },
  showDetail: function (res) {
    this.setData({
      item: this.data.carList[res.currentTarget.id],
      showDetail: true,
    })
  },
  join: function (res) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否加入?',
      success: function (e) {
        if (e.confirm) {
          console.log(that.data.carList[res.currentTarget.id]);
          var gId = that.data.carList[res.currentTarget.id].gId;
          server.request("/group/joinGroup", { gId: gId }, function (res) {
            if (res.data.statusCode == "1") {
              wx.navigateTo({
                url: '/pages/chat/chat?gId=' + gId
              })
            }
          })
        }
      }
    })
  },
  cancel: function () {
    this.setData({
      showDetail: false
    })
  },
  getData: function (page) {
    var that = this;
    server.request("/carpoolList/getCarpoolListByCreateTime", { page: page }, function (res) {
      //刷新成功
      wx.showToast({
        title: '加载成功',
        icon: 'none'
      })
      var carpoolList = res.data.data.carpoolList;
      for (var i = 0; i < carpoolList.length; i++) {
        carpoolList[i].carpoolList.lTime = util.toData(carpoolList[i].carpoolList.lTime, 'Y-M-D h:m');
      }
      wx.stopPullDownRefresh();
      if (page == 1) {
        that.setData({
          carList: carpoolList,
        })
      } else {
        var temp = that.data.carList;
        that.setData({
          carList: temp.concat(carpoolList)
        })
      }
      that.setData({
        carListTotal: res.data.data.total,
        page: page
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getData(1);
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
    this.getData(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.carList.length < this.data.carListTotal)
      this.getData(this.data.page + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})