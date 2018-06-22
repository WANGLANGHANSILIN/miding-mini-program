// pages/yueta.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    earnestMoney: [{ "text": "30元" }, { "text": "50元" }, { "text": "200元" }, { "text": "500元" }, { "text": "1000元" }, { "text": "80元" }, { "text": "100元" }, { "text": "10元" },],
    yueTaData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('log--onLoad', options);
    var _this = this;
    wx.getLocation({
      success: function(res) {
        var currentLocal = res.latitude + ',' + res.longitude;
        Object.assign(options, { location: currentLocal });// 合并对象
        
        wx.request({
          url: app.globalData.baseUrl + 'friends/need/getCategoryNeedAttr.do?',
          method: 'GET',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: options,
          success: function (result) {
            var res = result.data;
            if(res.ret === '000')
              _this.setData({yueTaData:res.data});

            console.log('log--onLoad', _this.data.yueTaData);
          }
        })
      },
    })
    
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

  cyjSelectTap:function(e){
    console.log(e);
    this.setData({ earnestMoney:e.detail});
  },

  onBack:function(){
    wx.navigateBack({
      delta: 1
    })
    console.log('onBack');
  },

  onSelectSkill: function () {
    console.log('onSelectSkill');
  },

  onSelectTime: function () {
    console.log('onSelectTime');
  },

  onPublish:function(){
    console.log('onPublish');
  }
})
