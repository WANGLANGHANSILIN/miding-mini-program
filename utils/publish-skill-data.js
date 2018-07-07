module.exports = {
  skillData: data123(),
}

function data123(){
  var obj = {
    title:'模特',
    list:[
      {
      title:'技能相册',
      key: 'jnxc',
      desc:'把你的技能秀出来，至少上传一张',
      type:'selectAlbum',
      must:{ismust:true,desc:'必填'},
      },
      {
        title: '模特类型',
        key: 'mtlx',
        desc: '',
        type: 'checkbox',
        must: { ismust: true, desc: '必填，多选' },
      },
      {
        title: '服务介绍',
        key: 'fwjs',
        desc: '请填写与你技能相关的介绍（至少10字以上）',
        type: 'textarea',
        must: { ismust: true, desc: '必填' },
      },
      {
        title: '语音介绍',
        key: 'yyjs',
        desc: '你可以录制一段60s的语音来介绍你的技能',
        type: 'voice',
        must: { ismust: false, desc: '' },
      },
      {
        title: '服务时间',
        key:'fwsj',
        desc: '',
        type: 'checkbox',
        must: { ismust: true, desc: '必填，多选' },
      },],
      serviceType:{
        on_line:{
          title:'线下服务',
          desc:'可以收到附近或同城线下服务订单',
          price:'700',
          price_des:'请输入合理的价格',
          must:{ismust:true,desc:'必填'}
        },
        off_line: { 
          title: '线下服务',
          desc: '开通即可收到线上客户咨询', 
          must: { ismust: false, desc: '必填' },
          list:[{
            type_name:'电话咨询',
            result:'不开通',
            key:'dhzx',
          },{
            type_name: '视频咨询',
            result: '不开通',
            key: 'spzx',
          }]
        },
      },
      paiDan:{
        title:'接受派单',
        isPaiDan: true,
        desc:'每天可为您分配优质订单，自动抢单轻松赚钱',
      }
  }
  return obj;
}