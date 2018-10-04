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
        <el-row>
            <el-table :data="storyList" style="width:100%">
                <el-table-column prop="pk" label="编号" min-width="100">
                </el-table-column>
                <el-table-column prop="fields.title" label="标题" min-width="100">
                </el-table-column>
                <el-table-column prop="fields.content" label="内容" min-width="100">
                </el-table-column>
                <el-table-column label="添加时间" min-width="100">
                    <template slot-scope="scope">{{ scope.row.fields.add_time | dataFormat('yyyy-MM-dd hh:mm:ss') }}</template>
                </el-table-column>
            </el-table>
        </el-row>
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
                    alert('内容不能为空')
                    return
                }
                this.$http.get('http://127.0.0.1:8000/api/add_book?title=' + this.title + '&content=' + this.content)
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
    .el-input{
        margin: 5px 0 5px 0;
    }
    .el-button{
        margin: 5px 0 5px 5px;
    }
    .el-col {
        border-radius: 4px;
    }
</style>