// pages/table/tab2/tab2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  onComfirm: function(){
    wx.request({
      url: 'http://www.wanandroid.com/tools/mockapi/2012/getHomebannerlist',
      data:{
        user:'user123',
        psd:'123'
      },
      method:'GET',
      success: function (res) { console.log('success', res);
      wx.showToast({
        title: JSON.stringify(res),
      })},
      fail: function (error) { console.log('fail', error);},
      complete:function(){
        console.log('complete','complete');
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
  
  },

  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)

    var pagePath = item.pagePath;
    var lIndex = pagePath.lastIndexOf('/');
    var sub = pagePath.slice(lIndex + 1);
    console.log(lIndex);
    console.log(sub);
    wx.showToast({
      title: item.text,
      icon: 'success',
      image: '../../../img/ic_' + sub + '_on.png',
      duration: 3000,
      mask: true,

    })
  }
})