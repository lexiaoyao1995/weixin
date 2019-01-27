// pages/member/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "isLogin":false,
    "avatar":"",
    "nickName":"",
    "avatar1": "/images/avatar.jpg",
    "nickName1": "您还未登录"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "isLogin":this.checkIsLogin()
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
  clickLogin:function(res){
    var that = this;
    // console.log(res);
    app.globalData.userInfo=res.detail.userInfo;
    this.setData({
      "isLogin": this.checkIsLogin(),
      "nickName": app.globalData.userInfo.nickName,
      "avatar": app.globalData.userInfo.avatarUrl
    });
     wx.login({
     success:function(res){
      //  console.log(res);
       var code = res.code;
       wx.request({
         url: app.globalData.prefix_url +"/login/addCustomer",
         method:"post",
         header:{"content-type":"application/json"},
         data:{
           "code":code,
           "nickName":app.globalData.userInfo.nickName,
           "avatar": app.globalData.userInfo.avatarUrl
         },
         success:function(res){
          //  console.log(res);
           app.globalData.openId = res.data.data.openId;
         }
       })
      
     }
    })
  },
  checkIsLogin(){
    return app.globalData.userInfo==null?false:true;
  }
})