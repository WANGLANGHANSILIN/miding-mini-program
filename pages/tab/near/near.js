// pages/table/tab1/tab1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentLocal: '12',
    nearData:'',
    isLoadMore:false,
    currentPage:1,

    dianzan:'../../../img/ic_like_icon.png',
    collect:'../../../img/ic_collection_icon.png',
  },

  /**
   * 生命周期函数--监听页面加载
   * ///friends/user/searchDynamicListPage.do?location=23.139533%2C113.280682&pageSize=20&pageNum=1
   */
  onLoad: function (options) {
    var _this = this;
    this.getLocation(function (result) {
      var res;
      console.log('onLoad', _this.data.nearData);
      if (_this.data.nearData) {
        res = result.recordList.concat(_this.data.nearData);
      }
      else
        res = result.recordList;
      _this.setData({
        nearData: res,
        currentPage: result.currentPage,
      });
    });
  },
  

 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady', this.data.currentLocal);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow', this.data.currentLocal);
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide', this.data.currentLocal);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload', this.currentLocal);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.currentPage = 1;
    console.info('onPullDownRefresh   ' + this.data.currentPage);
    var _this = this;
    this.getLocation(function(result){
      _this.setData({
        nearData: result.recordList,
        currentPage: result.currentPage,
      });
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.info('onReachBottom     ' + this.data.currentPage + "    " + this.data.isLoadMore);
    var temp = this.data.currentPage+1;
    this.setData({
      isLoadMore: true,
      currentPage: temp,
    });
    console.info('onReachBottom-----' + this.data.currentPage + "    " + this.data.isLoadMore);
    var _this = this;
    setTimeout(function(){
      _this.getLocation(function (result) {
        var res;
        if (_this.data.nearData) {
          res = _this.data.nearData.concat(result.recordList);
        } else
          res = result.recordList;
        _this.setData({
          nearData: res,
          currentPage: result.currentPage,
          isLoadMore: false,
        });
      });
    },500);
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
  },

  requestNearData(callback) {
    var _this = this;
    console.log('requestNearData', this.data.currentLocal);

    console.log(app);
    wx.request({
      url: app.globalData.baseUrl+'friends/user/searchDynamicListPage.do?',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { location: this.data.currentLocal, pageSize: 25, pageNum: this.data.currentPage },//23.139533,113.280682
      success: function (res) {
        // console.log('success', res);
        if (res.data.ret == 0) {
          var size = res.data.data.pageSize;
          for(var i=0;i<size; i++){
            var record = res.data.data.recordList[i];
            if (record.objdata){
              var split = record.objdata.picture.split(',');
              if (split.length > 3) {
                split.splice(3, split.length - 3);
              }
              record.objdata.picture = split;
            }
          }
          callback(res.data.data);
          // _this.setData({ nearData: res.data.data});
          console.log('success', _this.data.nearData);
        }
      },
      fail: function (error) { console.log('fail', error); },
      complete: function () {
        console.log('complete', 'complete');
      }
    })
  },

  getLocation(callback) {
    var _this = this;
    wx.getLocation({
      success: function (res) {
        _this.setData({ currentLocal: res.latitude + ',' + res.longitude });
        _this.requestNearData(callback);
      },
    })
  },
  previewImage:function(event){
    console.log(event);
    var imgUrls = event.currentTarget.dataset.imgurls;
    var currentImgurl = event.currentTarget.dataset.currentimgurl;
    console.log(currentImgurl, imgUrls);
    wx.previewImage({
      urls: imgUrls,
      current: currentImgurl,
    });
    wx.getImageInfo({
      src: currentImgurl,
      success: function(res){
        console.log(res);
      }
    })

    
  },
  onYueTa: function (event){
    var item = event.currentTarget.dataset.item;
    console.log(item.categoryid,item.userid)
    wx.navigateTo({
      url: '../../yueta/yueta?categoryid=' + item.categoryid + "&userids="+item.userid,
    })
  },

  onDianZan: function (event){
    var index = event.currentTarget.dataset.index;
    var item = this.data.nearData[index]
    if(item.has_dianzan)
      item.dianzannum--;
    else
      item.dianzannum++;
    item.has_dianzan = !item.has_dianzan;
    this.setData({
      nearData: this.data.nearData,
    });
  },

  onCollect: function (event) {
    var index = event.currentTarget.dataset.index;
    var item = this.data.nearData[index]
    if (item.has_collect)
      item.fensinum--;
    else
      item.fensinum++;
    item.has_collect = !item.has_collect;
    this.setData({
      nearData: this.data.nearData,
    });
  }
})