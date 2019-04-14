// pages/history_list/history_list.js
/**
 * @author sunLei
 * @time 2019/4/3
 */
var server=require('../../../utils/server.js');
var util=require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    info: [],
    uId:''
  },
  getData:function(id){
    //id决定请求参数
    var that=this;
    var requestUrl=['/user/getCreatedList','/user/getJoinList','/user/getHistoryList'];
    //id=0,1,2
    if(id>=0 && id<=2){
      wx.showLoading({
        title: '拼命加载中...',
      })
      server.request(requestUrl[id],'',function(res){
        wx.hideLoading();
        var carpoolList=res.data.data.historyList;
        //转换时间
        for (var i = 0; i < carpoolList.length; i++) {
          carpoolList[i].carpoolList.lTime = util.toData(carpoolList[i].carpoolList.lTime, 'Y-M-D h:m');
        }
        that.setData({
          info:carpoolList
        })
      })
    }
  },
  delete_my_list:function(res){
    var that=this;
    if (that.data.info[res.target.id].carpoolList.lCreateUserId!=this.data.uId){
      wx.showToast({
        title: '您没有删除权限',
        icon:'none'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认删除此拼单?',
      fail:function(e){
        console.log(e)
      },
      success: function (e) {
        console.log(e);
        var id = res.target.id;
        if (e.confirm) {
          //删除
          wx.showLoading({
            title: '删除中...',
          })
          console.log(that.data.info);
          console.log(res);
          server.request('/carpoolList/deleteCarpoolList', { lId: that.data.info[res.target.id].carpoolList.lId }, function (res) {
            if (res.data.statusCode == "1") {
              console.log("删除成功");
              wx.showToast({
                title: '删除成功',
              });
              var temp=that.data.info;
              temp.splice(id,1);
              that.setData({
                info:temp
              })
            }
          });
        }
      }
    })
  },
  enter:function(res){
    console.log(res);
    console.log(this.data.info);
    wx.navigateTo({
      url: '/pages/chat/chat?gId=' + this.data.info[res.target.id].gId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.id!=null){
      this.setData({
        id: options.id,
        uId:wx.getStorageSync("uId")
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
})