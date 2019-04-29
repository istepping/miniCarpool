/**
 * @author sunLei
 * @time 2019/4/13
 */
var server = require("../../utils/server.js");
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      server.getUserInfo();
      wx.switchTab({
        url: '/pages/home/home'
      })
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }

})