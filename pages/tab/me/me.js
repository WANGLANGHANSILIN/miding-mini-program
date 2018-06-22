// pages/table/tab3/tab3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      nickName:'WangLan',
      descript:'Comp PB',
      add:'../../../img/ic_add_black.png',
      userImg: '../../../img/ic_me_on.png',
    },
    headerDataList: [{
      num: 2,
      descript: "赞"
    }, {
      num: 20,
      descript: "关注"
    }, {
      num: 168,
      descript: "粉丝"
    }],
    settingList: [
      { title: "我的收藏", icon: "../../../img/ic_arr_right_gray.png" },
      { title: "我的评价", icon: "../../../img/ic_arr_right_gray.png" },
      { title: "分享赚钱", icon: "../../../img/ic_arr_right_gray.png" },
      { title: "控制中心", icon: "../../../img/ic_arr_right_gray.png" },
      { title: "赚钱攻略", icon: "../../../img/ic_arr_right_gray.png" },
      { title: "分享赚钱", icon: "../../../img/ic_arr_right_gray.png" },
      { title: "分享赚钱", icon: "../../../img/ic_arr_right_gray.png" },
    ],
    mangerList: [
      { title: "技能管理", icon: "../../../img/ic_index_on.png" },
      { title: "需求管理", icon: "../../../img/ic_near_on.png" },
      { title: "认证中心", icon: "../../../img/ic_msg_on.png" },
      { title: "我要赚钱", icon: "../../../img/ic_me_on.png" },
    ],
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
    var obj = {
      title: item.text,
      icon: 'success',
      image: '../../../img/ic_' + sub + '_on.png',
      duration: 3000,
      mask: true,
    };
    wx.showToast(obj);
  },

  /**
   * 点击管理事件处理
   */
  onMangerListOnclick: function (event){
    console.log('onMangerListOnclick', event);
    var item = event.currentTarget.dataset.item;
    console.log('onMangerListOnclick', item);
    wx.showToast({
      title: item.title,
      icon: "success",
      image: item.icon,
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 设置点击
   */
  onSettingListOnclick:function(event){
    var item = event.currentTarget.dataset.item;
    console.log('onSettingListOnclick', item);
    wx.showToast({
      title: item.title,
      icon: "success",
      duration: 1000,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 关注点击
   */
  onHeaderDataListOnclick:function(event){
    var item = event.currentTarget.dataset.item;
    wx.showToast({
      title: item.descript+'    '+item.num,
      icon: "success",
      duration: 1000,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * Vip点击
   */
  onVipOnClick(event){
    var text = event.currentTarget.dataset.text;
    wx.showToast({
      title: text,
      icon: "success",
      duration: 1000,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onUserHeaderOnClick: function (event){
    var info = event.currentTarget.dataset.info;
    wx.showToast({
      title: info.nickName,
      icon: "success",
      image: info.userImg,
      duration: 1000,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})