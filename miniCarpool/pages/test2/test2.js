// pages/test2/test2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[
      'https://p1.meituan.net/waimaipoi/7b61308f190057fa1c069a6a97cf5ce1348510.jpg',
      'https://p0.meituan.net/waimaipoi/39faa09c5d8182be0d8de14fa29ae969392083.jpg',
    ],
    list:[
      {
        name:'品尚清香拉面',
image:'https://p0.meituan.net/waimaipoi/53cc41bce62668e579a93be6515071b7110658.jpg',
price:45,
num:0
      },
      {
        name: '百碗香排骨米饭',
        image: 'https://p0.meituan.net/waimaipoi/9ea7900cae52faf6acd45ac92fca358230720.jpg',
        price: 50,
        num: 0
      },
      {
        name: '姐弟俩土豆粉刀削面',
        image: 'https://p0.meituan.net/waimaipoi/a17b0f1a1fb7db7bb04090fbc995f20a32768.jpg',
        price: 15,
        num: 0
      },
      {
        name: '背景麻麻辣香锅',
        image: 'https://p1.meituan.net/waimaipoi/77cc6f0f5eb33c74858304705655f926217088.jpg',
        price: 45,
        num: 0
      },
      {
        name: '北京烤鸭店',
        image: 'https://p1.meituan.net/wmproduct/bf02c743d175f47a4f7a34aefd164d2b158216.jpg',
        price: 45,
        num: 0
      },
      {
        name: '李记凉皮',
        image: 'https://p0.meituan.net/waimaipoi/1cc587667ce56de74eb06bdbefab98a528672.jpg',
        price: 45,
        num: 0
      }
    ],
    totalPrice:0,
    totalNum:0
  },
  add:function(res){
    console.log(res);
    var temp=this.data.list;
    var that=this;
    temp[res.target.id].num=temp[res.target.id].num+1;
    this.setData({
      list:temp,
      totalNum: that.data.totalNum+1,
      totalPrice: that.data.totalPrice+that.data.list[res.target.id].price
    })
  },
  sub:function(res){
    var that=this;
    var temp = this.data.list;
    if(temp[res.target.id].num>0){
      temp[res.target.id].num = temp[res.target.id].num - 1;
      this.setData({
        list: temp,
        totalNum: that.data.totalNum - 1,
        totalPrice: that.data.totalPrice - that.data.list[res.target.id].price
      })
    }
  },
  submit:function(res){
    if(this.data.totalNum<=0){
      wx.showToast({
        title: '请添加购物车!',
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '是否提交订单',
      success:function(res){
        if(res.confirm){
          wx.showToast({
            title: '提交成功',
          })
        }
      }
    })
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

  }
})