// component/PublishComponent/PublishComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showProgress:{
      type:Number,
      value:1
    },
    isEnableNext:{
      type:Boolean,
      value:false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    textProgressList:['技能信息','服务方式','提交成功'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onNext:function(e){
      if (this.properties.isEnableNext)
        this.triggerEvent('onNext',123);
    }
  }
})
