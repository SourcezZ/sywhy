webpackJsonp([2],{"0DQm":function(t,e){},t7X3:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"index_main",staticStyle:{"text-align":"center"}},[t._m(0),t._v(" "),t._m(1),t._v(" "),i("div",{staticStyle:{"text-align":"center"},attrs:{id:"surprise"}},[i("div",{staticClass:"name",staticStyle:{padding:"100px"}},[i("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入你的名字"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.sure(e):null}},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),t._v(" "),i("el-button",{on:{click:t.sure}},[t._v("确定")]),t._v(" "),"true"==t.flag?i("a",[i("el-button",{on:{click:t.jump}},[t._v("baby, click me")])],1):t._e()],1),t._v(" "),i("div",{staticStyle:{"text-align":"left","padding-left":"30px"}},[i("el-button",{attrs:{plain:""},on:{click:t.surprise}},[t._v("\n                a surprise\n            ")])],1)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"h1div"},[i("h1",[t._v("但我知道，")]),t._v(" "),i("h1",[t._v("这一切是无比美好的，")]),t._v(" "),i("h1",[t._v("它不可思议，")]),t._v(" "),i("h1",[t._v("甚至不合情理，")]),t._v(" "),i("h1",[t._v("我没有想到这种感觉如此难以抗拒,")]),t._v(" "),i("h1",[t._v("更没有想过是你和我一同深陷其中。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("iframe",{attrs:{frameborder:"no",border:"0",marginwidth:"0",marginheight:"0",width:"330",height:"86",src:"//music.163.com/outchain/player?type=2&id=461525011&auto=1&height=66"}})])}]};var s=i("VU/8")({data:function(){return{input:"",out:"",flag:"false"}},methods:{jump:function(){this.$router.push({name:"跳转登陆",params:{index:"520"}})},surprise:function(){var t=this.$createElement;this.$notify({title:"I",message:t("i","hid a surprise in your computer"),position:"top-left"})},sure:function(){"宋雨蔚"===this.input?this.open():"何源"===this.input?this.$message({type:"info",message:"笨蛋，这是我"}):this.open2()},open:function(){var t=this;this.$alert("你肯定就是我的宝贝小宋啦","小宋",{confirmButtonText:"确定",callback:function(e){t.$message({type:"info",message:"小宋，我喜欢你啊"})}}),this.flag="true"},open2:function(){""!=this.input?this.$message({type:"info",message:"抱歉，"+this.input}):this.$message({type:"info",message:"抱歉"})}}},n,!1,function(t){i("0DQm")},"data-v-32b71852",null);e.default=s.exports}});