//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //  success:function(res){
    //    console.log("login success");
    //    console.log(res);
    //    var code = res.code;
    //    console.log("code is "+code);
    //   //  wx.request({
    //   //    //url:"http://localhost/swjtu/login/getSession",
    //   //    url: that.globalData.prefix_url+'/login/getSession',
    //   //    method:"post",
    //   //    data:{
    //   //      "code":code
    //   //    },
    //   //    success:function(res){
    //   //      console.log(res);
    //   //      that.globalData.openid=res.openid;
    //   //      //console.log(that.globalData.userInfo);
    //   //    }

    //   //  })
    //  }
    // })
    wx.getUserInfo({
      success:res=>{
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        that.screenWidth = res.windowWidth;
        that.screenHeight = res.windowHeight;
        that.pixelRatio = res.pixelRatio;
      }
    });
  },
  globalData: {
    userInfo: null,
    "prefix_url":"http://132.232.234.27/swjtu",
    openId:""
    
  }
})