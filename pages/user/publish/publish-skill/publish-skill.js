// pages/user/publish/publish-skill/publish-skill.js
var tata = require("../../../../utils/publish-skill-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skillData: tata.skillData,
    modelList:
    [
      { title: '平面模特', check: false, },
      { title: '车展模特', check: true, },
      { title: '内衣模特', check: false, },
      { title: '礼仪模特', check: false, },
      { title: '私房模特', check: true, },
      { title: '时装模特', check: true, },
      { title: '淘宝模特', check: false, },
      { title: '手模', check: true, },
      { title: '脚模', check: false, },
      { title: '腿模', check: true, },
      { title: '胸模', check: true, },


      
    ],
    timeList: [
      { title: '全天', check: true,},
      { title: '节假日', check: false, },
      { title: '偶尔', check: true, },
      { title: '白天', check: false, },
      { title: '晚上', check: true, },
    ],
    dialogRecord:{
      ishow:false,
      isPress:false,
      isPlay:false,
      isRecordFinish: false,
    },
    timer:null,
    timerCount:0,
    timerCountT:0,
    setUp:1,
    inputLength:0,
    selectPhotos:[],
    tempFilePath:'',
    setUpTemp:0,
    setUpTempTTT:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < this.data.skillData.list.length;i++){
      if (this.data.skillData.list[i].must.ismust)
        this.data.setUpTemp++;
    }
    this.data.setUpTempTTT+=2;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(tata.skillData);
    wx.setNavigationBarTitle({
      title: '发布' + this.data.skillData.title+'技能',
    })

    wx.authorize({ scope: "scope.record" })

    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError((e)=> {
      // 录音失败的回调处理
      console.log('recorderManager onError',e);
    });
    this.recorderManager.onStop((res)=> {
      // 停止录音之后，把录取到的音频放在res.tempFilePath
      console.log('recorderManager onStop');
      this.setData({
        tempFilePath: res.tempFilePath
      })
      console.log(res.tempFilePath)
    });

    this.audioContext = wx.createInnerAudioContext();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({
      success:function(res){
      console.log(res);
      },
    });
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

  onNext:function(e){
    console.log('onNext ' + e.detail);
    // this.setData({ setUp: ++this.data.setUp });
    wx.navigateTo({
      url: '../service-type/Service-Type',
    })
  },

  onTextSelect:function(event){
    var dataset = event.currentTarget.dataset;
    console.log(event);
    var key = dataset.key;
    console.log(key);
    var deatil = event.detail;
    if(key === 'mtlx'){
      this.setData({ modelList: deatil});
      for (var i = 0; i < this.data.modelList.length;i++){
        if (this.data.modelList[i].check)
          this.setData({ setUpTempTTT: ++this.data.setUpTempTTT});
      }
      
    } else if (key === 'fwsj') {
      this.setData({ timeList: deatil });
      for (var i = 0; i < this.data.timeList.length; i++) {
        if (this.data.timeList[i].check)
          this.setData({ setUpTempTTT: ++this.data.setUpTempTTT });
      }
    }
  },
  // 点击弹出录音对话框
  onShowRecordingDialog:function(){
    console.log(this.data);
    var recItem = this.data.dialogRecord;
    if(!recItem.ishow){
      recItem.ishow = !recItem.ishow;
      this.setData({ dialogRecord:recItem});
    }
  },
  // 关闭录音对话框
  onCloseRecordingDialog:function(){
    var recItem = this.data.dialogRecord;
    recItem.ishow = false;
    recItem.isPress = false;
    recItem.isRecordFinish = false;
    this.setData({ dialogRecord: recItem});
  },
  // 长按录音
  onStartRecording: function () {
    console.log('onStartRecording');
    var that = this;
    var recItem = this.data.dialogRecord;
    if (!recItem.isPress) {
      recItem.isPress = !recItem.isPress;
      this.setData({ dialogRecord: recItem});
      this.countFun();
      this.data.timer = setInterval(this.countFun,1000);
      // wx.startRecord({
      //   success:function(res){
      //     console.log(res.tempFilePath);
      //     that.setData({ tempFilePath: res.tempFilePath});
      //   }
      // })
      this.recorderManager.start({
        format: 'amr'
      });
    }
  },
  // 松开停止录音
  onStopRecording:function(){
    console.log('onStopRecording  ' + this.data.timerCount);
    this.recorderManager.stop();
    var recItem = this.data.dialogRecord;
    recItem.ishow = true;
    recItem.isPress = false;
    this.data.timerCountT = this.data.timerCount
    clearInterval(this.data.timer);
    this.data.timer = null;
    this.data.timerCount = 0;
    if (this.data.timerCountT < 3)
    {
      recItem.isRecordFinish = false;
      wx.showToast({
        title: '录音不能低于3s',
      });
    }else{
      recItem.isRecordFinish = true;
    }
    this.setData({ dialogRecord: recItem, timerCount: this.data.timerCount });
    if (recItem.isRecordFinish){
      this.setData({ setUpTempTTT: ++this.data.setUpTempTTT});
    }
  },

  // 计数器
  countFun: function () {
    this.data.timerCount++;
    this.setData({ timerCount: this.data.timerCount });
    if (this.data.timerCount > 60)
      this.onStopRecording();
  },

  //重新录制
  onResetRecord: function () {
    var recItem = this.data.dialogRecord;
    recItem.isRecordFinish = false;
    this.setData({ dialogRecord: recItem });
  },
  // 播放、暂停
  onPlayOrPause: function () {
    this.audioContext .src = this.data.tempFilePath;
    var recItem = this.data.dialogRecord;
    console.log(this.audioContext .src, recItem.isPlay);
    if (recItem.isPlay){
      this.audioContext .pause();
      this.audioContext .onPause(()=>{
        console.log('暂停播放')
        recItem.isPlay = false;
        this.setData({ dialogRecord: recItem });
      });
    }else{
      this.audioContext .play();
      this.audioContext .onPlay(() => {
        console.log('开始播放')
        recItem.isPlay = true;
        this.setData({ dialogRecord: recItem });
      })
    }
    this.audioContext .onEnded(() => {
      console.log('播放结束')
      recItem.isPlay = false;
      this.setData({ dialogRecord: recItem });
    })

    this.audioContext .onError((e)=>{
      console.log('播放出错',e)
    });
  },
  // 录制完成
  onRecordFinish:function(){
    this.onCloseRecordingDialog();
  },

  // 输入监听
  onTextInputLisener:function(event){
    var length = event.detail.value.length;
    this.setData({ inputLength: length});
    if (this.data.inputLength)
      this.setData({ setUpTempTTT: ++this.data.setUpTempTTT });
  },
  onSelctPhoto: function (event){
    var that = this;
    var index = event.currentTarget.dataset.index;
    wx.chooseImage({
      count:1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res);
        that.data.selectPhotos[index] = res.tempFilePaths[0];
        var photos = that.data.selectPhotos;
        that.setData({ selectPhotos: photos});

        if (that.data.selectPhotos)
          that.setData({ setUpTempTTT: ++that.data.setUpTempTTT });
      },
    })
  }
})