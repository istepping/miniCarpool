var server=require("./utils/server.js");
App({
  onLaunch: function () {
    wx.login({
      success(res){
        console.log(res);
        wx.request({
          url: 'https://www.billingf.xyz/carpool/user/login',
          data:{
            code:res.code
          },
          success(res){
            wx.setStorageSync("token", res.data.data.token);
            wx.setStorageSync("uId", res.data.data.uId);
            server.updateUserInfo();
          }
        })
      }
    })   
  },
})
