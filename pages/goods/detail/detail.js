// pages/goods/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "goodId":1,
    galleryHeight: getApp().screenWidth,
// "goods":{
//   "img":"../../../images/icon_cart.png",
//   "title":"华为手机",
//   "price":"1000","detail":"http://pic2.16pic.com/00/05/01/16pic_501154_b.jpg"
// }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodId = options.goodId;
    this.setData({
      "goodId": goodId
    });
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
    var that = this;
    var id = this.data.goodId;
    wx.request({
      url: app.globalData.prefix_url + "/goods/getGoodById/"+id,
      success: function (res) {
        console.log(res);
        that.setData({
          "goods": res.data.data
        }
        )
      }
    })
 
  },
  //点击购物车按钮跳转
  gotocart:function(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
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
  addCart:function(){
    var openId = app.globalData.openId;
    if(openId==""){
      wx.showModal({
        title: 'alert',
        content: 'please sign in',
      })
    }
    else{

    var that = this;
    // console.log(openId);

    wx.request({
      url: app.globalData.prefix_url+"/car/addGoodToCar",
      method:"post",
      header:{"content-type":"application/json"},
      data:{
        "remark1" : openId,
        "goodsId" : that.data.goodId,
        "num":1

      },
      success:function(res){
        console.log(res);
        if (res.data.data =="this good is already in car"){
          wx.showModal({
            title: '已经在购物车中',
            content: '已经在购物车中',
          })
        }
        else {
          wx.showToast({
            title: '添加成功',
          })
        }
       
      }

    })
  }

  }
})