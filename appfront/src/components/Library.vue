<!-- addbook组件 -->
<template>
    <div class="home">
        <el-row class="inputBook">
            <el-col :span="7">
                <el-input v-model="req.bookName" placeholder="请输入书名"></el-input>
            </el-col>
            <span style="width:20px"></span>
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
    props: ['loginStatus', 'username'],
    data () {
        return {
            userForm: {
                'username': '',
            },
            req: {
                'bookName': ''
            },
            bookList: [],
        }
    },
    methods: {
        show_books: function (params) {
            var thisObj = this
            this.postData2Server('show_books', {}, function (res) {
                thisObj.bookList = res.list
            })
        },
        add_book: function () {
            if (this.req.bookName == '') {
                this.message('内容不能为空', "error")
                return
            }
            let _req = JSON.parse(JSON.stringify(this.req))
            this.req.bookName = ''
            var thisObj = this
            this.postData2Server('add_book', _req, function (res) {
                if (res.msg == 'success') {
                    thisObj.show_books()
                } else {
                    thisObj.message(res['msg'], 'error')
                }
            })
        }
    },
    mounted: function () {
        this.show_books()
    }
}
</script>
<style scoped>
.inputBook {
    display: flex;
    justify-content: center;
}
.el-row {
    margin-bottom: 20px;
}

.el-col {
    border-radius: 20px;
}
</style>