/**
 * @author sunLei
 * @time 2019/3/28
 */
const baseUrl ="https://www.billingf.xyz/carpool"
const testUrl ="http://127.0.0.1:8080"

const actualBaseUrl=testUrl
const request=(url,data='',callBack,method='GET')=>{
  var actualUrl = actualBaseUrl + url;//实际地址
  var token = wx.getStorageSync("token");//获取存储数据
  if(token===null || token===''){
    return;
  }

  console.log("发出请求:"+actualUrl);//请求日志
  console.log("请求参数:");
  console.log(data);
  
  //请求数据
  wx.request({
    url: actualUrl,
    data: data,
    method: method,
    header: {
      "Content-Type": method == "GET" ? "application/json" : "application/x-www-form-urlencoded",
      "authorization": token
    },
    success(res){
      console.log(actualUrl+"请求返回:");
      console.log(res);
      wx.hideLoading();
      callBack(res);
    },
    fail(error){
      wx.hideLoading();
      console.log(error);//错误日志
    }
  })
}
const getUserInfo=()=>{
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
            request("/user/addUserInfo", data, function (res) {})
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
  getUserInfo:getUserInfo
}