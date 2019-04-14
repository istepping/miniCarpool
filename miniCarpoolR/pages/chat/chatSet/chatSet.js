// pages/setup/setup.js
/**
 * @author sunLei
 * @time 2019/4/14
 */
var server = require("../../../utils/server.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    hidden2:true,
    gId:'',
    uId:'',
    groupName:'',
    data:[],
    name:'',
    notice:''
  },
  confirm: function () {
    this.setData({
      hidden: true,
    });
    console.log("clicked confirm");
  },
  //查看用户信息
  lookInfo:function(res){
  var that=this;
  wx.showModal({
    title: '用户呢称',
    content: that.data.data.users[res.target.id].uNickName,
    showCancel:false
  })
  },
  //更改群名称
  changeGroupName:function(res){
    var that=this;
    if(this.data.uId==this.data.data.createUser.uId){
      //允许更改
      that.setData({
        hidden2:false
      })
    }else{
      //不允许更改
      wx.showToast({
        title: '群主才可以更改',
        icon: 'none'
      })
    }
  },
  //点击取消
  cancleName:function(res){
    this.setData({
      hidden2:true,
      groupName: ''
    })
  },
  //绑定input
  getGroupName:function(res){
    this.setData({
      groupName:res.detail.value
    })
  },
  //点击确定
  confirmName:function(res){
    var that=this;
    console.log(res);
    server.request('/group/changeGroupInfo',{gName:this.data.groupName,gId:this.data.gId},function(res){
      if(res.data.statusCode=='1'){
        wx.showToast({
          title: '修改成功!',
          icon: 'none'
        })
      }else{
        wx.showToast({
          title: '修改失败',
          icon: 'none'
        })
        that.setData({
          name: that.data.group.gName
        })
      }
    })
    that.setData({
      name: that.data.groupName
    })
    this.setData({
      hidden2: true,
      groupName: ''
    })
  },
  //点击群公告处理事件
  group_notice: function () {
    this.setData({
      hidden: false
    })
  },
  getGroupNotice:function(res){
    this.setData({
      notice: res.detail.value
    })
  },
  confirmNotice:function(res){
    var that = this;
    console.log(res);
    server.request('/group/changeGroupInfo', { gNotice: this.data.notice, gId: this.data.gId }, function (res) {
      if (res.data.statusCode == '1') {
        wx.showToast({
          title: '修改成功!',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'none'
        })
        that.setData({
          notice: that.data.group.gNotice
        })
      }
    })
    this.setData({
      hidden: true,
    })
  },
  cancelNotice:function(res){
    this.setData({
      hidden: true,
    })
  },
  //点击退出群聊
  exit_list: function () {
    var that=this;
    if (this.data.uId == this.data.data.createUser.uId) {
      wx.showToast({
        title: '群主不能退出!',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '确定退出吗?退出后您将不能收到该群消息!',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          server.request('/group/quitGroup',{gId:that.data.gId},function(res){
            if (res.data.statusCode == '1') {
              wx.showToast({
                title: '退出成功!',
                icon: 'none'
              })
              wx.switchTab({
                url: '/pages/home/home',
              })
            } else {
              wx.showToast({
                title: '退出失败'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getData:function(){
    var that=this;
    server.request('/group/getGroup', { gId: this.data.gId }, function (res) {
      that.setData({
        data: res.data.data.groupInfo,
        name: res.data.data.groupInfo.group.gName
      })
      if (res.data.data.groupInfo.group.gNotice != null && res.data.data.groupInfo.group.gNotice!='') {
        that.setData({
          notice: res.data.data.groupInfo.group.gNotice
        })
      }else{
        that.setData({
          notice: "暂无内容"
        })
      }
      console.log(that.data.notice);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
      gId:options.gId,
      uId:wx.getStorageSync("uId")
    })
    this.getData();
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
})