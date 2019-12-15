<!--story组件-->
<template>
    <div>
        <el-row>
            <el-col>
                <!--span宽度-->
                <!-- <el-input class='input' v-model="title" placeholder="请输入标题"></el-input> -->
                <el-input class='wordsInput' v-model="content" type="textarea" rows="5" placeholder="请输入你的话"></el-input>
            </el-col>
            <el-col>
                <el-button type="primary" v-on:click="add_story">提交</el-button>
            </el-col>
        </el-row>
        <!-- <div class='box-in-card' v-if="username=='syw'"> -->
        <div class='box_in_card' v-loading="loading">
            <el-card class="box-card" v-for="(i, index) in storyList" :key="i.pk">
                <!-- <div slot="header" class="clearfix">
                    <span>{{ i.fields.title }}</span>
                    <span style='float: right;'>{{ i.fields.addTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </div> -->
                <div class="text item">
                    <span>{{ i.fields.content }}</span>
                    <span style='float: right;'>{{ i.fields.addTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </div>
                <el-button style='float: right;' v-if="i.fields.commitFlag == 1" size="small"
                           v-on:click='ifCommit(index)'>收起
                </el-button>
                <el-button style='float: right;' v-if="i.fields.commitFlag == 0" size="small"
                           v-on:click='ifCommit(index)'>评论
                </el-button>
                <br><br>
                <hr v-if="i.fields.commitFlag == 1">
                <div v-if="i.fields.commitFlag == 1">
                    <div v-for="j in commentList" :key='j.pk'>
                        <div v-if='j.fields.storyId==i.pk'>
                            <span class='comments'>{{ j.fields.commentContent }}</span>
                            <br/>
                            <span class="comments_time">{{ j.fields.addTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                        </div>
                        <br v-if='j.fields.storyId==i.pk'>
                        <br v-if='j.fields.storyId==i.pk'>
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
        props: ['loginStatus', 'username'],
        data() {
            return {
                loading: true,
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
            show_storys: function (params) {
                var thisObj = this
                this.postData2Server('show_storys', {}, function (res) {
                    if (res.msg == 'success') {
                        thisObj.loading = false
                        thisObj.storyList = res["list"];
                    } else {
                        thisObj.message(res.msg, "error")
                    }
                })
            },

            add_story: function () {
                if (this.content == "") {
                    this.message('内容不能为空', "error")
                    return
                }
                var req = {
                    'title': this.title,
                    'content': this.content
                }
                this.content = ''
                var thisObj = this
                this.postData2Server('add_story', req, function (res) {
                    if (res.msg == 'success') {
                        thisObj.message("提交成功", "success")
                        thisObj.show_storys()
                    } else {
                        thisObj.message(res.msg, "error")
                    }
                })
            },
            commentOnOff: function () {
                this.addFlag = !this.addFlag;
            },
            add_comment: function (commentId) {
                if (this.commentContent == "") {
                    this.message('内容不能为空', "error")
                    return
                }

                var req = {
                    'commentContent': this.commentContent[commentId],
                    'storyId': commentId
                }
                this.commentContent = ""
                var thisObj = this
                this.postData2Server('add_comment', req, function (res) {
                    if (res.msg == 'success') {
                        thisObj.commentContent = []
                        thisObj.show_comments()
                    } else {
                        thisObj.message(res.msg, "error")
                    }
                })
            },
            show_comments: function (params) {
                var thisObj = this
                this.postData2Server('show_comments', {}, function (res) {
                    if (res.msg == 'success') {
                        thisObj.$nextTick(() => {
                            thisObj.commentList = res["list"]
                        })
                    } else {
                        thisObj.message("查询失败", "error")
                    }
                })
            },
            ifCommit: function (params) {
                if (this.storyList[params].fields.commitFlag == 0) {
                    this.storyList[params].fields.commitFlag = 1
                } else {
                    this.storyList[params].fields.commitFlag = 0
                }
            }
        },
        created: function () {
            this.show_storys()
            this.show_comments()
        }
    }
</script>
<style scoped>
    .wordsInput {
        margin: 5px 0 5px 0;
        width: 65%;
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
        font-size: 16px;
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
        width: 100%;
        margin: 5px 0 15px 0;
    }

    .box_in_card {
        width: 75%;
        margin: auto;
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
        font-size: 10px;
    }

    .comments_time {
        font-size: 5px;
        float: right;
    }
</style>
