<!--story组件-->
<template>
    <div>
        <el-row>
            <el-col :span="7">
                <!--span宽度-->
                <el-input class='input' v-model="title" placeholder="请输入标题"></el-input>
                <el-input class='input' v-model="content" type="textarea" rows="5" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col>
                <el-button type="primary" v-on:click="add_story">提交</el-button>
            </el-col>
        </el-row>
        <!-- <div class='box-in-card' v-if="username=='syw'"> -->
        <div class='box-in-card'>
            <el-card class="box-card" v-for="i in storyList" :key="i.pk">
                <div slot="header" class="clearfix">
                    <span>{{ i.fields.title }}</span>
                    <span style='float: right;'>{{ i.fields.addTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </div>
                <div class="text item">
                    <span>{{ i.fields.content }}</span>
                </div>
                <el-button style='float: right;' v-if="!i.fields.commitFlag" size="small" v-on:click='ifCommit(i.pk)'>收起</el-button>
                <el-button style='float: right;' v-if="i.fields.commitFlag" size="small" v-on:click='ifCommit(i.pk)'>评论</el-button>
                <br><br>
                <div v-if="!i.fields.commitFlag">
					<div v-for="j in commentList" :key='j.pk'>
						<div v-if='j.fields.storyId==i.pk'>
							<span class='comments'>{{ j.fields.commentContent }}</span>
							<span style='font-size:5px;float: right;' >{{ j.fields.addTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
						</div>
					</div>
					<el-input v-model='commentContent[i.pk]'></el-input>
					<el-button style='float: right;' size="small" v-on:click='add_comment(i.pk)'>确定</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
	props:['loginStatus','username'],
	data() {
		return {
			title: "",
			content: "",
			commentContent: [],
			commentId: "1",
			storyList: [],
			commentList: [],
			addFlag: 0,
		}
	},
	methods: {
		show_storys: function(params) {
			var thisObj = this
			this.postData2Server('show_storys', {}, function(res){
				if (res.msg == 'success') {
					thisObj.storyList = res["list"];
				} else {
					thisObj.message(res.msg, "error")
				}
			})
		},

		add_story: function() {
			if (this.content == "") {
				this.message('内容不能为空', "error")
				return
			}
			var req = {
				'title':this.title,
				'content':this.content
			}
			var thisObj = this
			this.postData2Server('add_story', req, function(res){
				if (res.msg == 'success') {
					thisObj.show_storys()
				} else {
					thisObj.message(res.msg, "error")
				}
			})
		},
		commentOnOff: function() {
			this.addFlag = !this.addFlag;
		},
		add_comment: function(commentId) {
			if (this.commentContent == "") {
				this.message('内容不能为空', "error")
				return
			}

			var req = {
				'commentContent' : this.commentContent[commentId],
				'storyId' : commentId
			}
			var thisObj = this
			this.postData2Server('add_comment', req, function(res){
				if (res.msg == 'success') {
					thisObj.commentContent = []
					thisObj.show_comments()
				} else {
					thisObj.message(res.msg, "error")
				}
			})
		},
		show_comments: function(params) {
			var thisObj = this
			this.postData2Server('show_comments', {}, function(res){
				if (res.msg == 'success') {
					thisObj.$nextTick(() =>{
						thisObj.commentList = res["list"]
					})
				} else {
					thisObj.message("查询失败", "error")
				}
			})
		},
		ifCommit: function(params) {
			this.storyList[params-1].fields.commitFlag = !this.storyList[params-1].fields.commitFlag
		}
	},
	created: function() {
		this.show_storys()
		this.show_comments()
	}
}
</script>
<style>
.input {
  margin: 5px 0 5px 0;
  /*上 右 下 左*/
}

.el-row {
  margin-bottom: 20px;
}

.el-input {
  margin: 5px 0 5px 0;
}

.el-button {
  margin: 5px 0 5px 5px;
}

.el-col {
  border-radius: 4px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.inline {
  display: block;
}

.el-badge {
  float: right;
  margin-top: 30px;
  width: 55px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 5px 0 5px 0;
}

.box-in-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.el-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.el-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.comments {
  width: 400px;
  height: 400px;
  font-size: 10px;
  background-color: antiquewhite;
}
</style>