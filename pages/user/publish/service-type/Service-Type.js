// pages/user/publish/service-type/Service-Type.js
var skillData = require('../../../../utils/publish-skill-data.js').skillData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeData: skillData.serviceType,
    paidan: skillData.paiDan,
    currentKey:'dhzx',
    type_array: [
      {
      type_index: 0,
      title: '不开通',
      }, 
      {
      type_index: 1,
      title: '免费',
      }, 
      {
        type_index: 2,
        title: '0.1元/分钟',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: skillData.title+'服务方式',
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

  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.currentTarget.dataset);
    this.setData({ type_index: e.detail.value, currentKey: e.currentTarget.dataset.key});
  }

})