//index.js
//获取应用实例
const app = getApp()

Page({

  /**
  * 页面的初始数据
  */
  data: {
    min: 0,//最少字数
    max: 200, //最多字数 
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {

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

  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //console.log(value);

    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: " "
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数
    });
  },

  info: function (e) {
    var value = e.detail.value;
    //console.log(value);
  },

  formSubmit: function (e){
    var value1 = e.detail.value.inputs; //获取问题初值
    var len1 = parseInt(value1.length);
    console.log(value1);
    var value2 = e.detail.value.info;  //获取联系方式初值
    console.log(value2);
    if (len1 <= this.data.min){
      console.log("请填完整！")
      wx.showModal({
        title: '提示',
        content: '请您提供相关反馈信息后再提交',
        showCancel: false,
        success: function (res) {
            console.log('用户点击确定')
        }
      })
    }
    else{
      console.log("已提交成功！");
      wx.navigateTo({
        url: './success/success'
      })
    }
    /*wx.request({
      method: 'POST',
      url: '' ,
      data:{
        'question': value1,
        'info':value2,
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        wx.showToast({
          title: '资料修改成功',
          duration: 2000
        })
      },
      fail: function (res) {
        console.log('cuowu' + ':' + res)
      }
    })*/
  },
    

})