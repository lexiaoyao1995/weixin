// pages/shop/catalogue/catalogue.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "currentTarget" : 1,
    "imageWidth": 0,
    "sidebarHeight": 0,
    // "topCategories": [
    //   {
    //     "title": "title1",
    //     "objectId": 1
    //   },
    //   {
    //     "title": "title2",
    //     "objectId": 1
    //   },
    //   {
    //     "title": "title3",
    //     "objectId": 1
    //   },
    //   {
    //     "title": "title3",
    //     "objectId": 1
    //   },
    //   {
    //     "title": "title3",
    //     "objectId": 1
    //   },
    //   {
    //     "title": "title3",
    //     "objectId": 1
    //   }
    // ],
    // "subCategories": [
    //   {
    //     "avatar": {
    //       "url": "http://lc-SgHcsYqo.cn-n1.lcfile.com/041a11ee41b517d6cd6b."
    //     },
    //     "objectId": 1,
    //     "title": "手机通讯"
    //   },
    //   {
    //     "avatar": {
    //       "url": "http://lc-SgHcsYqo.cn-n1.lcfile.com/041a11ee41b517d6cd6b."
    //     },
    //     "objectId": 1,
    //     "title": "手机通讯"
    //   },
    //   {
    //     "avatar": {
    //       "url": "http://lc-SgHcsYqo.cn-n1.lcfile.com/041a11ee41b517d6cd6b."
    //     },
    //     "objectId": 1,
    //     "title": "手机通讯"
    //   },
    //   {
    //     "avatar": {
    //       "url": "http://lc-SgHcsYqo.cn-n1.lcfile.com/041a11ee41b517d6cd6b."
    //     },
    //     "objectId": 1,
    //     "title": "手机通讯"
    //   },
    //   {
    //     "avatar": {
    //       "url": "http://lc-SgHcsYqo.cn-n1.lcfile.com/041a11ee41b517d6cd6b."
    //     },
    //     "objectId": 1,
    //     "title": "手机通讯"
    //   },
    //   {
    //     "avatar": {
    //       "url": "http://lc-SgHcsYqo.cn-n1.lcfile.com/041a11ee41b517d6cd6b."
    //     },
    //     "objectId": 1,
    //     "title": "手机通讯"
    //   },
    //   {
    //     "avatar": {
    //       "url": "http://lc-SgHcsYqo.cn-n1.lcfile.com/041a11ee41b517d6cd6b."
    //     },
    //     "objectId": 1,
    //     "title": "手机通讯"
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setImageWidth();
    this.setSideHeight();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //点击左边分类目录进入对应目录的产品列表
  tapTopCategory: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.catalogueId;
    wx.request({
      url: app.globalData.prefix_url + "/catalogue_and_goods/" + id,
      success: function (res) {
        console.log(res);
        that.setData({
          "subCategories": res.data.data,
          "currentTarget": id
        })
      }
    })
  },
  //点击图片进入详情页
  avatarTap:function(e){
    var goodId=e.currentTarget.dataset.objectId;
    wx.navigateTo({
      url: '/pages/goods/detail/detail?goodId='+goodId,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.prefix_url + "/catalogue/listAll",
      success: function (res) {
        that.setData({
          "topCategories": res.data.data
        }

        )
      }
    });

    wx.request({
      url: app.globalData.prefix_url + "/catalogue_and_goods/"+"1",
      success:function(res){
    that.setData({
      "subCategories":res.data.data
    })
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

  },
  setImageWidth: function () {
    var screenWidth = getApp().screenWidth;
    var imageWidth = (screenWidth - 130) / 3 - 5;
    this.setData({
      "imageWidth": imageWidth
    });
  },
  setSideHeight: function () {
    this.setData({
      "sidebarHeight": getApp().screenHeight
    });
  }
})