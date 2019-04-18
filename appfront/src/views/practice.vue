<template>
  <div>
    <div class="div">
		<el-input class="input" v-model="todoValue" v-on:keyup.enter.native="addNew"></el-input>
		<el-form :model="formData" :rules="baseRules">
			<el-form-item prop="addProp">
			<el-input class="input" type='number' v-model.number="formData.addProp" placeholder="验证表单"></el-input>
			</el-form-item>
		</el-form>

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
			<li v-on:click='finish(item)' v-bind:title="FinishedMsg">
				<span v-bind:class="{Finished:item.isFinished}">{{item.label}}</span>
				<span>{{item.time}}</span>
			</li>
			<!-- 可绑定多个属性，此处Finished，也可加'' ， -->
		</ul>
    </h1>
    <div class="block">
      	<el-rate v-model="star"></el-rate>
    </div>
    <div>
		<HL title1="post successful" post.id="1"></HL>
		<Light></Light>
    </div>
  </div>
</template>
<script>
import Store from '../store'
import HL from '../components/sayHello'
import Light from '../components/light'
export default {
    components: { HL, Light },
    data() {
		return {
			items: Store.fetchTodoList(),
			todoValue: null,
			FinishedMsg: '待办事项',
			question: null,
			answer: 'waitting for you question',
			checkedNames: [],
			star: Store.fetchStar(),
			formData: {
				addProp: null,
			},
			baseRules: {
				addProp: [{ required: true, type: 'number', trigger: 'blur', message: '请输入数字' }]
			}
		}
    },
    watch: {
      //监听items，变化的时候把items加入到TodoList
      items: {
		handler: function (items) {
			Store.saveTodoList(items)
		},
		deep: true
      },
      //监听question，变化的时候显示answer
      question: function () {
			this.answer = 'you\'r typing'
			this.endtyping()
      },
      //监听star，变化的时候保存进Star
      star: function (star) {
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
			isFinished: false,
			time: new Date().Format("yyyy-MM-dd hh:mm:ss")
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
		width: 200px;
		margin: 5px;
	}

	.div {
		margin: 10px
	}

	input::-webkit-inner-spin-button {
		-webkit-appearance: none
	}
</style>