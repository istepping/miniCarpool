const baseUrl ="https://www.billingf.xyz/carpool"
const testUrl ="http://127.0.0.1:8080"

const actualBaseUrl=testUrl
const request=(url,data='',callBack,method='GET')=>{
  var actualUrl = actualBaseUrl + url;//实际地址
  var token = wx.getStorageSync("token");//获取存储数据
  if(token===null || token===''){
    return;
  }

  console.log("发出请求:"+actualBaseUrl);//请求日志
  console.log("请求参数:");
  console.log(data);
  
  //请求数据
  wx.request({
    url: actualBaseUrl,
    data: data,
    method: method,
    header: {
      "Content-Type": method == "GET" ? "application/json" : "application/x-www-form-urlencoded",
      "authorization": token
    },
    success(res){
      callBack(res);
    },
    fail(error){
      console.log(error);//错误日志
    }
  })
}
module.exports = {
  request:request
}