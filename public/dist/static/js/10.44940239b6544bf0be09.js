webpackJsonp([10],{EaYx:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-card",[l("el-form",{ref:"form",attrs:{model:e.from,"label-width":"80px"}},[l("el-form-item",{attrs:{label:"店铺名称",prop:"name"}},[l("el-input",{model:{value:e.from.name,callback:function(t){e.$set(e.from,"name",t)},expression:"from.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"详细地址"}},[l("el-input",{model:{value:e.from.address,callback:function(t){e.$set(e.from,"address",t)},expression:"from.address"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"联系电话"}},[l("el-input",{model:{value:e.from.phone,callback:function(t){e.$set(e.from,"phone",t)},expression:"from.phone"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"店铺简介"}},[l("el-input",{model:{value:e.from.introduce,callback:function(t){e.$set(e.from,"introduce",t)},expression:"from.introduce"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"店铺标语"}},[l("el-input",{model:{value:e.from.slogan,callback:function(t){e.$set(e.from,"slogan",t)},expression:"from.slogan"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"店铺分类"}},[l("el-cascader",{attrs:{options:e.storeOptions,"expand-trigger":"hover"},model:{value:e.defineOp,callback:function(t){e.defineOp=t},expression:"defineOp"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"店铺特点"}},[l("el-switch",{attrs:{"active-text":"品牌保证"},model:{value:e.from.is_brand,callback:function(t){e.$set(e.from,"is_brand",t)},expression:"from.is_brand"}}),e._v(" "),l("el-switch",{attrs:{"active-text":"蜂鸟专送"},model:{value:e.from.is_give,callback:function(t){e.$set(e.from,"is_give",t)},expression:"from.is_give"}}),e._v(" "),l("el-switch",{attrs:{"active-text":"新开店铺"},model:{value:e.from.is_newOpen,callback:function(t){e.$set(e.from,"is_newOpen",t)},expression:"from.is_newOpen"}}),e._v(" "),l("el-switch",{attrs:{"active-text":"外卖保"},model:{value:e.from.take_out_food,callback:function(t){e.$set(e.from,"take_out_food",t)},expression:"from.take_out_food"}}),e._v(" "),l("el-switch",{attrs:{"active-text":"准时达"},model:{value:e.from.on_time,callback:function(t){e.$set(e.from,"on_time",t)},expression:"from.on_time"}}),e._v(" "),l("el-switch",{attrs:{"active-text":"开发票"},model:{value:e.from.invoice,callback:function(t){e.$set(e.from,"invoice",t)},expression:"from.invoice"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"配送费"}},[l("el-input-number",{attrs:{min:0,max:20},model:{value:e.from.take_out_money,callback:function(t){e.$set(e.from,"take_out_money",t)},expression:"from.take_out_money"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"起送价"}},[l("el-input-number",{attrs:{min:0,max:100},model:{value:e.from.initial_delivery_price,callback:function(t){e.$set(e.from,"initial_delivery_price",t)},expression:"from.initial_delivery_price"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"起送时间"}},[l("el-time-picker",{attrs:{placeholder:"起始时间"},model:{value:e.from.initial_delivery_time,callback:function(t){e.$set(e.from,"initial_delivery_time",t)},expression:"from.initial_delivery_time"}}),e._v(" "),l("el-time-picker",{attrs:{placeholder:"结束时间"},model:{value:e.from.initial_delivery_time,callback:function(t){e.$set(e.from,"initial_delivery_time",t)},expression:"from.initial_delivery_time"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"上传店铺头像"}},[l("el-upload",{ref:"upload",attrs:{action:"",limit:1,"list-type":"picture-card","auto-upload":!1}},[l("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),l("el-form-item",{attrs:{label:"上传餐饮服务许可证"}},[l("el-upload",{ref:"upload",attrs:{action:"",limit:1,"list-type":"picture-card","auto-upload":!1}},[l("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),l("el-form-item",{attrs:{label:"上传营业执照"}},[l("el-upload",{ref:"upload",attrs:{action:"",limit:1,"list-type":"picture-card","auto-upload":!1}},[l("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),l("el-form-item",{attrs:{label:"优惠活动"}},[l("el-select",{model:{value:e.from.party.value,callback:function(t){e.$set(e.from.party,"value",t)},expression:"from.party.value"}},e._l(e.from.party.options,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-table",{attrs:{data:e.activity,align:"cneter"}},[l("el-table-column",{attrs:{prop:"icon_name",label:"活动标题"}}),e._v(" "),l("el-table-column",{attrs:{prop:"name",label:"活动名称"}}),e._v(" "),l("el-table-column",{attrs:{prop:"description",label:"活动详情"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete",plain:""},on:{click:function(l){e.deletRow(t)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.deletRow(e.row)}}},[e._v("立即创建")])],1)],1)],1)},staticRenderFns:[]};var o=l("VU/8")({data:function(){return{from:{name:null,address:null,phone:null,introduce:null,slogan:null,is_brand:!1,is_give:!1,is_newOpen:!1,take_out_food:!1,invoice:!1,on_time:!1,take_out_money:1,initial_delivery_price:20,initial_delivery_time:null,party:{value:null,options:[{label:"新店优惠",value:"选项1"}]}},storeOptions:[{label:"快餐便当",value:"快餐便当",children:[{label:"简食",value:"简食"}]}],defineOp:["快餐便当","简食"],activity:[{icon_name:"减",name:"满减优惠",description:"满30减5，满60减8"},{icon_name:"减",name:"满减优惠",description:"满30减5，满60减6"},{icon_name:"减",name:"满减优惠",description:"满30减5，满60减7"}]}},components:{},methods:{deletRow:function(e){this.activity.splice(e.$index,1)}}},i,!1,function(e){l("rI5A")},"data-v-525c0062",null);t.default=o.exports},rI5A:function(e,t){}});
//# sourceMappingURL=10.44940239b6544bf0be09.js.map