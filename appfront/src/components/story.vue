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
        <div class='box-in-card'>
            <el-card class="box-card" v-for="i in storyList" :key="i.pk" v-if="userName=='syw'">
                <div slot="header" class="clearfix">
                    <span>{{ i.fields.title }}</span>
                    <span style='float: right;'>{{ i.fields.add_time | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </div>
                <div class="text item">
                    <span>{{ i.fields.content }}</span>
                </div>
                <el-button style='float: right;' v-if="!i.fields.commitFlag" size="small" v-on:click='ifCommit(i.pk)'>收起</el-button>
                <el-button style='float: right;' v-if="i.fields.commitFlag" size="small" v-on:click='ifCommit(i.pk)'>评论</el-button>
                <br><br>
                <div v-if="!i.fields.commitFlag">
                  <div v-for="j in commentList" :key='j.pk'>
                      <span class='comments' v-if='j.fields.commentId==i.pk'>{{ j.fields.commentContent }}</span>
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
  props:['userStatus','userName'],
  data() {
    return {
      title: "",
      content: "",
      commentContent: [],
      commentId: "",
      storyList: [],
      commentList: [],
      addFlag: 0,
    };
  },
  methods: {
    show_storys: function(params) {
      var url = window.location.href
      this.$http.get(url + "api/show_storys").then(response => {
        var res = JSON.parse(response.bodyText);
        // console.log(res)
        if (res.error_num == 0) {
          this.storyList = res["list"];
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    add_story: function() {
      if (this.content == "") {
        this.$message.error("内容不能为空");
        return;
      }else if(this.userStatus != 1){
        this.$message.error("请登录后再提交")
        return
      }
      var url = window.location.href
      this.$http
        .get(
          url + "api/add_story?title=" +
            this.title +
            "&content=" +
            this.content
        )
        .then(response => {
          var res = JSON.parse(response.bodyText);
          if (res.error_num == 0) {
            this.show_storys();
          } else {
            this.$message.error("新增内容失败，请重试");
            console.log(res["msg"]);
          }
        });
    },
    commentOnOff: function() {
      this.addFlag = !this.addFlag;
    },
    add_comment: function(commentId) {
      if (this.commentContent == "") {
        this.$message.error("内容不能为空");
        return;
      }
      var url = window.location.href
      this.$http
        .get(
          url + "api/add_comment?commentContent=" +
            this.commentContent[commentId] +
            "&commentId=" +
            commentId
        )
        .then(response => {
          var res = JSON.parse(response.bodyText);
          if (res.error_num == 0) {
            this.commentContent = [];
            this.show_comments();
          } else {
            this.$message.error("新增内容失败，请重试");
            console.log(res["msg"]);
          }
        });
    },
    show_comments: function(params) {
      var url = window.location.href
      this.$http
        .get(url + "api/show_comments")
        .then(response => {
          var res = JSON.parse(response.bodyText);
          // console.log(res)
          if (res.error_num == 0) {
            this.commentList = res["list"];
          } else {
            this.$message.error("查询失败");
          }
        });
    },
    ifCommit: function(params) {
      this.storyList[params-1].fields.commitFlag = !this.storyList[params-1].fields.commitFlag
    }
  },
  created: function() {
    this.show_storys();
    this.show_comments();
  }
};
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