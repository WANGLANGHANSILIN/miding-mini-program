// component/checkBoxSelect/checkBocSelect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTextItemClick:function(event){
      console.info(event);
      var item = event.currentTarget.dataset.item;
      var index = event.currentTarget.dataset.index;
      item.check = !item.check;

      this.properties.listData[index] = item;
      this.triggerEvent('SelectListener', this.properties.listData);
    }
  }
})
