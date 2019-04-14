// pages/home/create/create.js
/**
 * @author sunLei
 * @time 2019/3/29
 */
var server=require("../../../utils/server.js");
Page({
  data: {
    isHidden:[
      true, true, true, true, true, true, true
    ],
    create_start:'',
    create_end:'',
    create_date:'选择集合日期',
    create_time:'选择集合时间',
    create_number:'请选择最多人数要求',
    create_sex:'',
    create_hasCar:'',
    create_car:'',
    create_extra:'',
    numberRange:['2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
    sexItem:["男","女","不限"],
    carItem:['出租','网约','快车','顺风','自驾','公交','地铁','火车','高铁','飞机','其他']
  },
  startChange:function(e){
    if(e.detail.value!=''){
      var temp = this.data.isHidden;
      temp[0] = false;
      this.setData({
        isHidden: temp
      })
    }else{
      var temp = this.data.isHidden;
      temp[0] = true;
      this.setData({
        isHidden: temp
      })
    }
    this.setData({
      create_start:e.detail.value
    })
  },
  endChange:function(e){
    if (e.detail.value != '') {
      var temp = this.data.isHidden;
      temp[1] = false;
      this.setData({
        isHidden: temp
      })
    } else {
      var temp = this.data.isHidden;
      temp[1] = true;
      this.setData({
        isHidden: temp
      })
    }
    this.setData({
      create_end: e.detail.value
    })
  },
  dateChange:function(e){
    if (e.detail.value != '' && this.data.create_time !='选择集合时间'){
      var temp=this.data.isHidden;
      temp[2]=false;
      this.setData({
        isHidden:temp
      })
    }
    this.setData({
      create_date: e.detail.value
    })
  },
  timeChange:function(e){
    if (e.detail.value != '' && this.data.create_date != '选择集合日期') {
      var temp = this.data.isHidden;
      temp[2] = false;
      this.setData({
        isHidden: temp
      })
    }
    this.setData({
      create_time: e.detail.value
    })
  },
  numberChange:function(e){
    if (e.detail.value != '') {
      var temp = this.data.isHidden;
      temp[3] = false;
      this.setData({
        isHidden: temp
      })
    }
    this.setData({
      create_number: this.data.numberRange[e.detail.value]
    })
  },
  sexRadioChange:function(e){
    if (e.detail.value != '') {
      var temp = this.data.isHidden;
      temp[4] = false;
      this.setData({
        isHidden: temp
      })
    }
    this.setData({
      create_sex: e.detail.value
    })
  },
  hasCarRadioChange:function(e){
    if (e.detail.value != '') {
      var temp = this.data.isHidden;
      temp[5] = false;
      this.setData({
        isHidden: temp
      })
    }
    this.setData({
      create_hasCar: e.detail.value
    })
  },
  carRadioChange:function(e){
    if (e.detail.value != '') {
      var temp = this.data.isHidden;
      temp[6] = false;
      this.setData({
        isHidden: temp
      })
    }
    this.setData({
      create_car: e.detail.value
    })
  },
  extraChange:function(e){
    console.log(e);
    this.setData({
      create_extra: e.detail.value
    })
  },
  submit:function(){
    if (this.data.create_start == '' || this.data.create_end == '' || this.data.create_date == '选择集合日期' || this.data.create_time == '选择集合时间' || this.data.create_number == '请选择最多人数要求' || this.data.create_hasCar == '' || this.create_car==''){
      wx.showModal({
        title: '提示',
        content: '请填写完整!',
        showCancel:false
      })
      return;
    }
    var data={
      startPlace:this.data.create_start,
      endPlace:this.data.create_end,
      time:this.data.create_date+" "+this.data.create_time+":00",
      maxNumber:this.data.create_number,
      genderRequirement:this.data.create_sex,
      hasCar:this.data.create_hasCar,
      carpoolMode:this.data.create_car,
      extra:this.data.create_extra
    }
    wx.showLoading({
      title: '创建中...',
    })
    console.log(data);
    server.request("/carpoolList/addCarpoolList",data,function(res){
      wx.hideLoading();
      if(res.data.statusCode=='1'){
        wx.navigateTo({
          url: '/pages/home/create/success/success',
        })
      }else{
        wx.showToast({
          title: '创建失败!',
        })
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