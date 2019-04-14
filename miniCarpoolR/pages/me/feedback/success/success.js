//success.js
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      })
  },
  back:function(){
    wx.navigateBack({
      delta: 2
    })
  }
})