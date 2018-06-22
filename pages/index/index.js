//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World--------------',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    temp:1.6,
    rotate:100,
  },
  //事件处理函数
  bindViewTap: function() {
    console.log("bindViewTap...");
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  longPre: function(){
    console.log('longpre...');
  },
  touchSta: function () {
    console.log('touchSta...');
  },
  touchMove(){
    console.info("touchMove...");
  },
  skipTab(){
    wx.navigateTo({
      url: '../table/table'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(this.drawAcr,1000);
    var context = wx.createCanvasContext('loading');
    var _this = this;
    // setInterval(function(){
    //   console.log(_this.data.rotate);
    //   context.rotate(_this.data.rotate * Math.PI / 180);
    //   context.draw();
    //   _this.data.rotate+=10;
    // },4000)
  },
  drawAcr: function (){
    this.data.temp+=0.1;
    var t = this.data.temp + 0;
    console.log('----',t);
    console.log(t);
    var context = wx.createCanvasContext('loading');
    context.arc(55, 55, 50, 0, 2 * Math.PI);
    context.setStrokeStyle('rgba(0,0,255,0.3)');
    context.setLineWidth(15);
    context.stroke();
    context.rotate(270 * Math.PI / 180);

    context.beginPath();
    context.arc(55, 55, 50, t * Math.PI, 2 * Math.PI);
    context.setStrokeStyle('rgba(0,0,255,0.6)');
    context.setLineWidth(15);
    context.stroke()


    // context.rotate(30 * Math.PI / 180);
    context.draw();
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)

    var pagePath = item.pagePath;
    var lIndex = pagePath.lastIndexOf('/');
    var sub = pagePath.slice(lIndex+1);
    console.log(lIndex);
    console.log(sub);
    wx.showToast({
      title: item.text,
      icon:'success',
      image: '../../img/ic_' + sub+'_on.png',
      duration:3000,
      mask:true,
      
    })
  }
})
