<!-- addbook组件 -->
<template>
    <div class="home">
        <el-row display="margin-top:10px">
            <el-col :span="4">
                <el-input v-model="input" placeholder="请输入书名"></el-input>
            </el-col>
            <el-button type="primary" v-on:click="add_book">新增</el-button>
        </el-row>
        <el-row>
            <el-table :data="bookList" style="width:100%" border>
                <el-table-column prop="pk" label="编号" min-width="100">
                </el-table-column>
                <el-table-column prop="fields.book_name" label="书名" min-width="100">
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
                input: '',
                bookList: [],
            }
        },
        methods: {
            show_books: function (params) {
                var url = window.location.href
                this.$http.get(url + '/api/show_books')
                    .then((response) => {
                        var res = JSON.parse(response.bodyText)
                        // console.log(res)
                        if (res.error_num == 0) {
                            this.bookList = res['list']
                        } else {
                            this.$message.error('查询失败')
                        }
                    })
            },
            add_book: function () {
                var url = window.location.href
                this.$http.get(url + '/api/add_book?book_name=' + this.input)
                    .then((response) => {
                        var res = JSON.parse(response.bodyText)
                        if (res.error_num == 0) {
                            this.show_books()
                        } else {
                            this.$message.error('新增书籍失败，请重试')
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