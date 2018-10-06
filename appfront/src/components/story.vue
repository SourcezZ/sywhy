<!--story组件-->
<template>
    <div>
        <el-row>
            <el-col :span="4">
                <!--span宽度-->
                <el-input class='input' v-model="title" placeholder="请输入标题"></el-input>
                <el-input class='input' v-model="content" type="textarea" rows="5" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col>
                <el-button type="primary" v-on:click="add_story">提交</el-button>
            </el-col>
        </el-row>
        <div class='box-in-card'>
            <el-card class="box-card" v-for="i in storyList" :key="i.pk">
                <div slot="header" class="clearfix">
                    <span>{{ i.fields.title }}</span>
                </div>
                <div class="text item">
                    <span>{{ i.fields.content }}</span>
                    <span>{{ i.fields.add_time | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                    <el-badge :value="12" class="item inline" >
                        <el-button size="small">评论</el-button>
                    </el-badge>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                content: '',
                storyList: [],
            }
        },
        methods: {
            show_storys: function (params) {
                this.$http.get('http://127.0.0.1:8000/api/show_storys')
                    .then((response) => {
                        var res = JSON.parse(response.bodyText)
                        // console.log(res)
                        if (res.error_num == 0) {
                            this.storyList = res['list']
                        } else {
                            this.$message.error('查询失败')
                        }
                    })
            },
            add_story: function () {
                if (this.content == '') {
                    this.$message.error("内容不能为空")
                    return
                }
                this.$http.get('http://127.0.0.1:8000/api/add_story?title=' + this.title + '&content=' + this.content)
                    .then((response) => {
                        var res = JSON.parse(response.bodyText)
                        if (res.error_num == 0) {
                            this.show_storys()
                        } else {
                            this.$message.error('新增内容失败，请重试')
                            console.log(res['msg'])
                        }
                    })
            }
        },
        mounted: function () {
            this.show_storys()
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

    .el-badge{
        float: right;
        margin-top: 30px;
        width:66px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
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
</style>