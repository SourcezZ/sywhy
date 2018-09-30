<template>
  <!-- <router-view></router-view> -->
  <div>
    <div class="div">
      <el-input class="input" v-model="todoValue" v-on:keyup.enter.native="addNew"></el-input>
      <el-button v-on:click="addNew">addNew</el-button>
      <el-button @click="delete1">delete</el-button>
      <el-button @click="text1">global</el-button>
      <el-button v-on:click="greet">click me!</el-button>
    </div>
    <div class="div">
      <el-input class="input" v-model='question'></el-input>
      <span>{{answer}}</span>
    </div>
    <div class="div">
      <input type="checkbox" id="jack" value="Jack1" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
    </div>
    <br>
    <span>Checked names: {{ checkedNames }}</span>
    <!-- <todo-item></todo-item> -->
    <h1 v-for="(item,index) in items">
      <ul>
        <li v-text="item.label" v-on:click='finish(item)' v-bind:class="{Finished:item.isFinished}" v-bind:title="FinishedMsg"></li>
        <!-- 可绑定多个属性，此处Finished，也可加'' ， -->
      </ul>
    </h1>
    <div class="block">
      <el-rate v-model="star" change="alert('hello')"></el-rate>
    </div>
  </div>
</template>

<script>
  import Store from './store'
  export default {
    data() {
      return {
        items: Store.fetchTodoList(),
        todoValue: null,
        FinishedMsg: '待办事项',
        question: null,
        answer: 'waitting for you question',
        checkedNames: [],
        star: Store.fetchStar(),
      }
    },
    watch: {
      items: {
        handler: function (items) {
          Store.saveTodoList(items)
        },
        deep: true
      },
      question: function () {
        this.answer = 'you\'r typing'
        this.endtyping()
      },
      star : function(star){
        Store.saveStar(star)
      }
    },
    methods: {
      addNew: function () {
        if (this.todoValue == '') {
          alert("事项不能为空")
          return
        }
        this.items.push({
          label: this.todoValue,
          time: Date(),
          isFinished: false
        })
        this.todoValue = ''
      },
      delete1: function () {
        this.items.pop()
      },
      finish: function (item) {
        item.isFinished = !item.isFinished
      },
      endtyping: function () {
        if (this.question.indexOf('?') !== -1) {
          this.answer = 'I\'m thinking'
          this.sleep(5000).then(() => {
            this.answer = 'you\'r handsome '
          })
        }
      },
      sleep: function (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
    }
  }
</script>

<style>
  .Finished {
    text-decoration: underline
  }

  .input {
    width: 200px
  }
  .div{
    margin: 10px
  }
</style>