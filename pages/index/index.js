// pages/shop/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner: [
    //   "http://lc-SgHcsYqo.cn-n1.lcfile.com/ac3fdeeb07b23724f786.png"],
    bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth),
    // goods: [
    //   {
    //     "avatar": "http://img11.360buyimg.com/n7/jfs/t1900/343/2546249675/321998/2e04d46e/56e220cdN3720417f.jpg",
    //     "title": "荣耀 畅玩5X 落日金 移动联通4G手机 双卡双待",
    //     "price": 999
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击轮播图跳转到详情页面
  showGoods: function (e) {
    var goodId = e.currentTarget.dataset.goodId;
    wx.navigateTo({
      url: '/pages/goods/detail/detail?goodId=' + goodId,
    })
  },

  //点击“全部分类”跳转到分类页面
  showCategories: function () {
    wx.switchTab({
      url: '/pages/catalogue/catalogue',
    })
  },
  //点击图片跳转到对应的详情页面
  showDetail:function(e){
    var goodId= e.currentTarget.dataset.goodId;
    wx.navigateTo({
      url: '/pages/goods/detail/detail?goodId='+goodId,
    })
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
      url: app.globalData.prefix_url+"/goods/listAll",
      success:function(res){
        that.setData({
          "goods": res.data.data
        }
          
        )
      }
    });
    wx.request({
      url: app.globalData.prefix_url + "/goods/getRotationChart",
      success: function (res) {
        that.setData({
          "banner": res.data.data
        }

        )
      }
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
   
  }
})