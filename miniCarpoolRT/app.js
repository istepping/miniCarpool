var server=require("./utils/server.js");
App({
  onLaunch: function () {
    var token=wx.getStorageSync("token");
    if(token===null || token===''){
      wx.login({
        success(res){
          wx.request({
            url: 'https://www.billingf.xyz/carpool/user/login',
            data:{
              code:res.code
            },
            success(res){
              wx.setStorageSync("token", res.data.data.token);
              wx.setStorageSync("uId", res.data.data.uId);
              wx.setStorageSync("avatar", res.data.data.avatar);
              wx.setStorageSync("nickName", res.data.data.nickName);
              server.getUserInfo();
            }
          })
        }
      })
    }   
  },
})
