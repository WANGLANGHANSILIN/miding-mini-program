// component/EarnestMoneyComponent/EarnestMoney.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    earnestMoneyList:{
      type: Array,
      value: [],
      observer:function(){
        console.log(123);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgMarginLeft:0,
    percent:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onEarnestMoneyItemClick:function(event){
      for (var i = 0; i < this.properties.earnestMoneyList.length;i++){
        if (this.properties.earnestMoneyList[i].checked)
          this.properties.earnestMoneyList[i].checked = false;
      }
      var earnestMoneyItem = event.currentTarget.dataset.earnestmoneyitem;
      var index = event.currentTarget.dataset.index;
      console.log(111,earnestMoneyItem);
      earnestMoneyItem.checked = !earnestMoneyItem.checked
      console.log(222,earnestMoneyItem);

      this.properties.earnestMoneyList[index] = earnestMoneyItem;
      var percent_ = earnestMoneyItem.extend.progress;//100*(index+1)/this.properties.earnestMoneyList.length
      console.log(percent_);
      this.setData({
        percent: percent_,
      });
      this.triggerEvent('cyjSelectTap', this.properties.earnestMoneyList);
    },
  },
  
})
