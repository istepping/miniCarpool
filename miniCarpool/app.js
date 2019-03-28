var server=require("./utils/server.js");
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //判断登陆授权信息
    var token=wx.getStorageSync("token");
    if(token===null || token===''){
      console.log("未登录")
      wx.login({
        success(res){
          wx.request({
            url: 'https://www.billingf.xyz/carpool/user/login',
            data:{
              code:res.code
            },
            success(res){
              console.log("登陆成功");
              wx.setStorageSync("token", res.data.data.token);
              //判断个人信息授权
              server.getUserInfo();
            }
          })
        }
      })
    }   
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
