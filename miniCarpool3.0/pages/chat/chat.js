// pages/chat/chat.js
//sssssss
var server=require("../../utils/server.js");
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gId:'13',
    avatar:'',
    nickName:'',
    groupInfo:{},
    send_msg:'',
    uId:'',
    hidenModel:true,
    isPull:true,
    toView:'bottom',
    msgList:[],
    message:[]
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
  //发送消息
  //message结构:state(消息状态0-发送中,1-发送成功,-1-发送失败)
  send:function(res){
    var that=this;
    if (this.data.send_msg==null||this.data.send_msg==''){
      wx.showToast({
        title: '不能发送空消息',
      })
    }else{
      //加入消息
      var time = new Date().getTime();
      var m_date="";
      var m_time="";
      m_date=util.toData(time, "Y-M-D h:m")
      m_time=util.toData(time, "Y-M-D h:m")
      console.log("1"+m_date+m_time);
      //消息结构
      var message={
        msgId: "msg"+time,
        type: '文本',
        senderId: that.data.uId,
        senderAvatar: that.data.avatar,
        senderNickName: that.data.nickName,
        isToday: true,
        sendTime: "",
        time: "",
        msg: that.data.send_msg,
        timestamp: time,
        state: 0
      }
      //导入时间
      message.sendTime=m_date;
      message.time=m_time;
      console.log(message.sendTime);
      console.log("新增消息");
      console.log(util.toData(new Date().getTime(), "Y-M-D h:m"))
      console.log(message);
      var temp=that.data.msgList;
      var msg=that.data.send_msg;
      //追加
      temp.push(message);
      that.setData({
        msgList:temp,
        toView: temp[temp.length - 1].msgId,
        send_msg:'',
        message:message
      });
      //发送消息
      wx.sendSocketMessage({
        data: msg,
        success: function (res) {
          console.log("发送消息成功");
          //更改消息状态
          console.log(res);
          var temp=that.data.msgList;
          for (var i = 0; i < temp.length; i++){
            if(temp[i].state==0 && temp[i].senderId==that.data.uId){
              console.log("查找到消息");
              temp[i].state=1;
              break;
            }
          }
          that.setData({
            msgList:temp
          })
        },
        fail: function (res) {
          console.log("发送消息失败");
          var temp = that.data.msgList;
          for (var i = 0;i<temp.length;i++) {
            if (temp[i].state == 0 && temp[i].uId == that.data.uId) {
              console.log("查找到消息");
              temp[i].state = -1;
              break;
            }
          }
          that.setData({
            msgList: temp
          })
        },complete:function(res){
          //保存消息
          that.updateTime();
          wx.setStorageSync(that.data.gId, that.data.msgList);
        }
      })
    }
  },
  //消息时间跟新和跟新消息状态
  updateTime:function(){
    var temp=this.data.msgList;
    for(var i=0;i<temp.length;i++){
      if(temp[i].isToday==true && !this.isToday(temp[i].timestamp)){
        temp[i].isToday=false;
      }
    }
    this.setData({
      msgList:temp
    })
  },
  updateState:function(){
    var temp = this.data.msgList;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].state==0) {
        temp[i].state=-1;
      }
    }
    this.setData({
      msgList: temp
    })
  },
  //判断是否为今天
  isToday:function(m_timestamp){
    var msgTime = util.toData(m_timestamp, 'Y-M-D');
    return msgTime==util.toData(new Date().getTime(),'Y-M-D');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取群ID
    if(options.gId!=null){
      this.setData({
        gId:options.gId
      })
    }
    //获取历史消息和用户Id和跟新数据
    var msg=wx.getStorageSync(that.data.gId)
    if(msg!=''&&msg!=null){
      that.setData({
        msgList:msg
      })
      that.updateTime();
      that.updateState();
    }
    //获取昵称头像
    that.setData({
      avatar: wx.getStorageSync("avatar"),
      nickName: wx.getStorageSync("nickName"),
      uId: wx.getStorageSync("uId")
    })
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
    if(temp.length>0){
      console.log("id=" + temp[temp.length - 1].msgId);
      that.setData({
        toView: temp[temp.length - 1].msgId
      })
    }
    //加载新消息
    //建立webSocket连接
    wx.connectSocket({
      url: 'wss://www.billingf.xyz/carpool/webSocket/'+that.data.gId+"/"+that.data.uId
    })
    //连接成功
    wx.onSocketOpen(function(res){
      console.log("连接成功")
      console.log(res)
    })
    wx.onSocketError(function(error){
      console.log("连接失败");
      console.log(error)
    })
    wx.onSocketClose(function(res){
      console.log("连接关闭");
      console.log(res);
    })
    wx.onSocketMessage(function(res){
      console.log("获取到消息");
      //接受到消息
      var data=JSON.parse(res.data);
      console.log(data);
      var temp=that.data.msgList;
      //遍历接受到消息
      for(var i=0;i<data.length;i++){
        //本人消息
        if(data[i].senderId==that.data.uId){
          continue;
        }
        //其他人的消息,加入
        var m_timestamp = data[i].sendTime;
        var message = {
          msgId: data[i].msgId,
          type: data[i].type,
          senderId: data[i].senderId,
          senderAvatar: data[i].senderAvatar,
          senderNickName: data[i].senderNickName,
          isToday: false,
          sendTime: util.toData(Number(m_timestamp), 'Y-M-D h:m'),
          time: util.toData(Number(m_timestamp), 'h:m'),
          msg: data[i].msg,
          timestamp: m_timestamp,
          state: 1
        }
        console.log("新消息");
        console.log(message);
        //判断是否为今天
        if(that.isToday(m_timestamp)){
          message.isToday = true;
        }
        //追加到数组后面,滑动到末端
        temp.push(message);
        that.setData({
          msgList:temp,
          toView: temp[temp.length - 1].msgId
        })
        wx.setStorageSync(that.data.gId, that.data.msgList);
      }
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
    //以群ID存储历史消息
    wx.setStorageSync(this.data.gId, this.data.msgList);
    //关闭Socket连接
    wx.closeSocket();
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