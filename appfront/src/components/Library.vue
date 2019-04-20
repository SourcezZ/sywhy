<!-- addbook组件 -->
<template>
    <div class="home">
        <el-row display="margin-top:10px">
            <el-col :span="4">
                <el-input v-model="req.bookName" placeholder="请输入书名"></el-input>
            </el-col>
            <el-button type="primary" v-on:click="add_book">新增</el-button>
        </el-row>
        <el-row>
            <el-table :data="bookList" style="width:100%" border>
                <el-table-column prop="pk" label="编号" min-width="100">
                </el-table-column>
                <el-table-column prop="fields.bookName" label="书名" min-width="100">
                </el-table-column>
                <el-table-column label="添加时间" min-width="100">
                    <template slot-scope="scope">{{ scope.row.fields.addTime | dataFormat('yyyy-MM-dd hh:mm:ss') }}</template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
    export default {
        props:['loginStatus','username'],
        data() {
            return {
                userForm:{
                    'username':'',
                },
                req:{
                    'bookName':''
                },
                bookList: [],
            }
        },
        methods: {
            show_books: function (params) {
                var thisObj = this
                this.postData2Server('show_books', {}, function(res){
                    thisObj.bookList = res.list
                })
            },
            add_book: function () {
                if(this.loginStatus == 0){
                    this.$message({message: '请登录后再提交', type: "error",duration: 1000,showClose: true})
                    return
                }
                var thisObj = this
                this.postData2Server('add_book', this.req, function(res){
                    if (res.msg == 'success') {
                        thisObj.show_books()
                    } else {
                        thisObj.$message.error('新增书籍失败，请重试')
                        console.log(res['msg'])
                    }
                })
            }
        },
        mounted: function () {
            this.show_books()
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

    .el-col {
        border-radius: 20px;
    }

</style>