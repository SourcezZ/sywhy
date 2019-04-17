<template>
  <div>
    <span>{{ new Date() | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
    <br>
    <span>{{ hello }}</span>
    <span @click="aaa(2,{nihao:2, buhao:3})">haha1</span>
    <span @click="clickToComeTrue">click to come true</span>
  </div>
</template>
<script>
  import func2 from '../function/func2'
  export default {
    data() {
      return {
        hello: new Date(),
        hehe:2
      }
    },
    watch: {
    },
    methods: {
      clickToComeTrue : function () {
        var req = {
          'username':'admin',
          'password':'admin'
        }
        this.postData2Server('login', req, function (res) {
          console.log(res)
          sessionStorage.setItem('token',res['token'])
        })

      },
      aaa : function (haha1=1, {nihao = 'nihao',buhao = 'buhao'}) {
        console.log(haha1)
        console.log(nihao)
        console.log(buhao)
      },
      aa : function(){
        console.log(/nihao/.test('nihao'))
        var funcName = (x) => x + 2
      },
    },
    mounted:function (){
    // function(){
    //     this.hello = this.hello.Format("yyyy-MM-dd hh:mm:ss qq S")
    //     this.text1()
    //     func2.sayHello1()
    //     func2.sayHello()
    // }
      // this.aa()
      console.log(/nihao/.test('nihao'))
    }
  }
</script>

<style>
</style>