// pages/chat/chat.js
var server=require("../../utils/server.js");
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gId:'13',
    groupInfo:{},
    send_msg:'',
    uId:'',
    hidenModel:true,
    isPull:true,
    toView:'bottom',
    msgList:[{
      msgId:'msg1',
      type:'文本',
      senderId:'1000',
senderAvatar:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIXHyqKuvqGhdj2jhGiaTaiadRicTOOhuc2IVBBKa6nwV4JWz0nKyVdW9Vuxel4qccJWKBPYvASUtc3A/132',
      senderNickName:'三石คิดถึง',
      sendTime:'2019-12-23 12:30',
      isToday:false,
      time:"12:30",
      msg:'你好https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIXHyqKuvqGhdj2jhGiaTaiadRicTOOhuc2IVBBKa6nwV4JWz0nKyVdW9Vuxel4qccJWKBPYvASUtc3A/132'
    },
      {
        msgId: 'msg2',
        type: '文本',
        senderId: '1001',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL9hYp3X9x803CrNlgEBiaapkrQDsKv9UPicFjOR9ALvLUXW1JDN0lkZTU0KsTkuyQ5UsjBPFjVhI1w/132',
        senderNickName: "仲崇宇",
        isToday: true,
      sendTime: '2019-12-23 12:30',
        time: "12:30",
      msg: '你好'
    },
      {
        msgId: 'msg3',
        type: '文本',
        senderId: '1001',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL9hYp3X9x803CrNlgEBiaapkrQDsKv9UPicFjOR9ALvLUXW1JDN0lkZTU0KsTkuyQ5UsjBPFjVhI1w/132',
        senderNickName: "仲崇宇",
        sendTime: '2019-12-23 12:30',
        time: "12:30",
        isToday: true,
        msg: '你好'
      },
      {
        msgId: 'msg1',
        type: '文本',
        senderId: '1000',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIXHyqKuvqGhdj2jhGiaTaiadRicTOOhuc2IVBBKa6nwV4JWz0nKyVdW9Vuxel4qccJWKBPYvASUtc3A/132',
        senderNickName: '三石คิดถึง',
        sendTime: '2019-12-23 12:30',
        isToday: false,
        time: "12:30",
        msg: '你好'
      },
      {
        msgId: 'msg2',
        type: '文本',
        senderId: '1001',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL9hYp3X9x803CrNlgEBiaapkrQDsKv9UPicFjOR9ALvLUXW1JDN0lkZTU0KsTkuyQ5UsjBPFjVhI1w/132',
        senderNickName: "仲崇宇",
        isToday: true,
        sendTime: '2019-12-23 12:30',
        time: "12:30",
        msg: '你好'
      },
      {
        msgId: 'msg3',
        type: '文本',
        senderId: '1001',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL9hYp3X9x803CrNlgEBiaapkrQDsKv9UPicFjOR9ALvLUXW1JDN0lkZTU0KsTkuyQ5UsjBPFjVhI1w/132',
        senderNickName: "仲崇宇",
        sendTime: '2019-12-23 12:30',
        time: "12:30",
        isToday: true,
        msg: '你好'
      },
      {
        msgId: 'msg1',
        type: '文本',
        senderId: '1000',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIXHyqKuvqGhdj2jhGiaTaiadRicTOOhuc2IVBBKa6nwV4JWz0nKyVdW9Vuxel4qccJWKBPYvASUtc3A/132',
        senderNickName: '三石คิดถึง',
        sendTime: '2019-12-23 12:30',
        isToday: false,
        time: "12:30",
        msg: '你好'
      },
      {
        msgId: 'msg2',
        type: '文本',
        senderId: '1001',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL9hYp3X9x803CrNlgEBiaapkrQDsKv9UPicFjOR9ALvLUXW1JDN0lkZTU0KsTkuyQ5UsjBPFjVhI1w/132',
        senderNickName: "仲崇宇",
        isToday: true,
        sendTime: '2019-12-23 12:30',
        time: "12:30",
        msg: '你好'
      },
      {
        msgId: 'msg3',
        type: '文本',
        senderId: '1001',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL9hYp3X9x803CrNlgEBiaapkrQDsKv9UPicFjOR9ALvLUXW1JDN0lkZTU0KsTkuyQ5UsjBPFjVhI1w/132',
        senderNickName: "仲崇宇",
        sendTime: '2019-12-23 12:30',
        time: "12:30",
        isToday: true,
        msg: '你好'
      },
      {
        msgId: 'msg1',
        type: '文本',
        senderId: '1000',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIXHyqKuvqGhdj2jhGiaTaiadRicTOOhuc2IVBBKa6nwV4JWz0nKyVdW9Vuxel4qccJWKBPYvASUtc3A/132',
        senderNickName: '三石คิดถึง',
        sendTime: '2019-12-23 12:30',
        isToday: false,
        time: "12:30",
        msg: '你好'
      },
      {
        msgId: 'msg2',
        type: '文本',
        senderId: '1001',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL9hYp3X9x803CrNlgEBiaapkrQDsKv9UPicFjOR9ALvLUXW1JDN0lkZTU0KsTkuyQ5UsjBPFjVhI1w/132',
        senderNickName: "仲崇宇",
        isToday: true,
        sendTime: '2019-12-23 12:30',
        time: "12:30",
        msg: '你好'
      },
      {
        msgId: 'msg3',
        type: '文本',
        senderId: '1001',
        senderAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL9hYp3X9x803CrNlgEBiaapkrQDsKv9UPicFjOR9ALvLUXW1JDN0lkZTU0KsTkuyQ5UsjBPFjVhI1w/132',
        senderNickName: "仲崇宇",
        sendTime: '2019-12-23 12:30',
        time: "12:30",
        isToday: true,
        msg: '你好'
      }
    ]
  },
  sendChange:function(res){
    this.setData({
      send_msg:res.detail.value
    })
  },
  goSet:function(res){
    wx.navigateTo({
      url: '/pages/chat/chatSet/chatSet?gId='+this.data.gId
    })
  },
  showDetail:function(res){
    if(this.data.hidenModel){
      this.setData({
        hidenModel:false,
        isPull:false
      })
    }else{
      this.setData({
        hidenModel: true,
        isPull: true
      })
    }

  },
  emoj:function(res){

  },
  send:function(res){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //群ID和用户Id
    var uId=wx.getStorageSync("uId");
    this.setData({
      uId:uId
      })
    console.log("uId"+that.data.uId);
    if(options.gId!=null){
      this.setData({
        gId:options.gId
      })
    }
    var temp=[]
    //加载群信息
    server.request("/group/getGroup",{gId:this.data.gId},function(res){
      if(res.data.statusCode=="1"){
        //转换时间
        var groupInfo = res.data.data.groupInfo;
       groupInfo.carpoolList.lTime = util.toData(groupInfo.carpoolList.lTime, 'Y-M-D h:m');
        that.setData({
          groupInfo:groupInfo
        })
      }
    })
    //设置滑动到底部
    var temp = that.data.msgList;
    that.setData({
      toView:temp[temp.length-1].msgId
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

  }
})