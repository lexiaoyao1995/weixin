// pages/shop/cart/cart.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "selectedAllStatus":false,
    "total": 0,
    "carts": [
      // {
      //   "img":
      //       "http://img14.360buyimg.com/n7/jfs/t2494/324/1615617468/268135/1677b798/56cd80c5N06181c58.jpg",
      //   "name": "this",
      //   "price": 656,
      //   "num": 12,
      //   "selected": true,
      //   "id": 1,
      //   "selected": true
      // }
    ]
  },
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
    var that = this;
    wx.request({
      //获取当前openId下的商品信息
      url: app.globalData.prefix_url + "/car/listCarByOpenId",
      method: "post",
      header: { "content-type": "application/json" },
      data:{
        "openId": app.globalData.openId
      },
      success: function (res) {
      //  console.log(res);
        var cars = [];
        var data = res.data.data;
        for(var i=0;i<data.length;i++){
           var carItem =new Object();
          //methods
          carItem.img= data[i].good.img;
          carItem.name = data[i].good.name;
          carItem.price = data[i].good.price;
          carItem.num=data[i].car.num;
          carItem.id = data[i].car.id;
          carItem.goodsId = data[i].car.goodsId;
          cars.push(carItem);

        }
        that.setData({
          "carts": cars 
        })
      }
    });
    this.setData({
      "total": countTotal(this.data.carts)
    });
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
  // 数量减少按钮
  bindMinus: function (e) {
    //  console.log(e);
    var id = e.currentTarget.dataset.id;
    //console.log(id);
    var cats = this.data.carts;
    // console.log(cats);
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id == id) {
        cats[i].num--;
        if (cats[i].num< 0) cats[i].num = 0;
        break;
      }
    }
    this.setData({
      "carts": cats,
      "total": countTotal(this.data.carts)
    })
    for(var i=0;i<cats.length;i++){
      if (cats[i].id == id) {
        wx.request({
          url: app.globalData.prefix_url + '/car/addNum',
          method: "post",
          header: { "content-type": "application/json" },
          data: {
            "goodsId": cats[i].goodsId,
            "id": id,
            "num": cats[i].num,
            "remark1": app.globalData.openId
          },
          success:function(res){
            console.log(res)
          }
        })
      }
    }
  },
  // 复选框选择事件
  bindCheckbox: function (e) {
    var id = e.currentTarget.dataset.id;
    var cats = this.data.carts;
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id == id) {
        cats[i].selected = !cats[i].selected;
      }
    }
    this.setData({
      "carts": cats,
      "selectedAllStatus":isALlChecked(cats),
      "total": countTotal(this.data.carts)
    });

  },
  //数量增加按钮
  bindPlus: function (e) {
    //console.log(e);
    var id = e.currentTarget.dataset.id;
    //console.log(id);
    var cats = this.data.carts;
    // console.log(cats);
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id == id) {
        cats[i].num++;
        break;
      }
    }
    this.setData({
      "carts": cats,
      "total": countTotal(this.data.carts)
    })
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id == id) {
        wx.request({
          url: app.globalData.prefix_url + '/car/addNum',
          method: "post",
          header: { "content-type": "application/json" },
          data: {
            "goodsId": cats[i].goodsId,
            "id": id,
            "num": cats[i].num,
            "remark1": app.globalData.openId
          },
          success: function (res) {
            console.log(res)
          }
        })
      }
    }
  },
  //全选按钮
  selectAll: function () {
    var cats = this.data.carts;
    for (var i = 0; i < cats.length; i++){
      cats[i].selected=true;
    }
    
    this.setData({
      "carts": cats,
      "selectedAllStatus":isALlChecked(cats),
      "total": countTotal(this.data.carts)
    })
  }
})
//计算总价函数
function countTotal(cats) {
  var p = 0;
  for (var i = 0; i < cats.length; i++) {
    if (cats[i].selected) {
      p += cats[i].price * cats[i].num;
    }
  }
  return p;
}
//判断是否全部选中状态
function isALlChecked(cats){
  var flag = true;
  for (var i = 0; i < cats.length; i++) {
    if (!cats[i].selected) {
      flag=false;
      break;
    }
  }
  return flag;
}