/**
 * @author sunLei
 * @time 2019/3/28
 */
const baseUrl ="https://www.billingf.xyz/carpool"
const testUrl = "http://127.0.0.1:8080"
const actualBaseUrl=baseUrl;
const request=(url,data='',callBack,method='GET')=>{
  var actualUrl = actualBaseUrl + url;
  var token = wx.getStorageSync("token");
  if(token===null || token===''){
    return;
  }
  wx.request({
    url: actualUrl,
    data: data,
    method: method,
    header: {
      "Content-Type": method == "GET" ? "application/json" : "application/x-www-form-urlencoded",
      "authorization": token
    },
    success(res){
      wx.hideLoading();
      callBack(res);
    },
    fail(error){
      wx.hideLoading();
    }
  })
}
const updateUserInfo=()=>{
  wx.getSetting({
    success: function (res) {
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({
          success: function (res) {
            var data = {
              avatarUrl: res.userInfo.avatarUrl,
              uCity: res.userInfo.city,
              country: res.userInfo.country,
              gender: res.userInfo.gender,
              language: res.userInfo.language,
              nickName: res.userInfo.nickName,
              province: res.userInfo.province
            }
            console.log("跟新信息到服务器")
            //存储服务器
            request("/user/addUserInfo", data, function (res) {
              console.log(res);
            })
            //同时存储本地
            wx.setStorageSync("avatar", data.avatarUrl);
            wx.setStorageSync("nickName", data.nickName);
          }
        })
      } else {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    }
  })
}
module.exports = {
  request:request,
  updateUserInfo:updateUserInfo
}