// pages/near/near.js
/**
 * @author sunLei
 * @time 2019/3/29
 */
var server=require("../../utils/server.js");
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[],
    carListTotal:0,
    page:0,
    showDetail:false,
    item:{}
  },
  //显示详情
  showDetail:function(res){
    this.setData({
      item:this.data.carList[res.currentTarget.id],
      showDetail:true,
    })
  },
  //加入拼单
  join:function(res){
    //加入拼单逻辑
    var that=this;
    wx.showModal({
      title: '提示',
      content: '是否加入?',
      success:function(e){
        if(e.confirm){
          //加入群聊
          console.log(that.data.carList[res.currentTarget.id]);
          server.request("/group/joinGroup", {gId: that.data.carList[res.currentTarget.id].gId},function(res){
            if(res.data.statusCode=="1"){
              //跳转页面
              wx.navigateTo({
                url: '/pages/chat/chat',
              })
            }
          })
        }
      }
    })
  },
  //取消查看
  cancel:function(){
    this.setData({
      showDetail:false
    })
  },
  getData:function(page){
    var that=this;
    server.request("/carpoolList/getCarpoolListByCreateTime",{page:page},function(res){
      //跟新数据
      var carpoolList=res.data.data.carpoolList;
      //转换时间
      for(var i=0;i<carpoolList.length;i++){
        carpoolList[i].carpoolList.lTime=util.toData(carpoolList[i].carpoolList.lTime, 'Y-M-D h:m');
      }
      wx.stopPullDownRefresh();
      if(page==1){
        that.setData({
          carList: carpoolList,
        })
      }else{
        var temp = that.data.carList;
        that.setData({
          carList: temp.concat(carpoolList)
        })
      }
      that.setData({
        carListTotal: res.data.data.total,
        page:page
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载第一页
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
    if(this.data.carList.length<this.data.carListTotal)
    this.getData(this.data.page+1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})