// pages/history_list/history_list.js
/**
 * @author sunLei
 * @time 2019/4/3
 */
var server=require('../../../utils/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    info: []
  },
  getData:function(id){
    //id决定请求参数
    var that=this;
    var requestUrl=['/user/getCreatedList','/user/getJoinList','/user/getHistoryList'];
    //id=0,1,2
    if(id>=0 && id<=2){
      server.request(requestUrl[id],'',function(res){
        that.setData({
          info:res.data.data.historyList
        })
      })
    }
  },
  delete_my_list:function(res){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id!=null){
      this.setData({
        id: options.id
      })
    }
    this.getData(this.data.id);
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
    this.getData(this.data.id);
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
  delete_my_list: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除该拼单吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})