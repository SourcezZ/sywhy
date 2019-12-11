<!-- addbook组件 -->
<template>
    <div class="home">
        <el-row class="inputBook">
            <el-col :span="7">
                <el-input v-model="req.bookName" placeholder="请输入歌曲名"></el-input>
                <span class="inputSpan">注: 在这里写上你喜欢的歌曲，我会尽快为你添加到曲库~</span>
            </el-col>
            <span style="width:20px"></span>
            <el-button class="add_button" type="primary" v-on:click="add_book">新增</el-button>
        </el-row>
        <el-row>
            <el-table :data="bookList" style="width:100%" border>
                <el-table-column prop="pk" label="编号" min-width="100">
                </el-table-column>
                <el-table-column prop="fields.bookName" label="歌曲名" min-width="100">
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
    margin-bottom: 30px;
}

.el-col {
    border-radius: 20px;
}
.inputSpan {
    position: absolute;
    top: 35px;
    left: 40px;
    font-size: 10px;
    color: #909399;
    font-weight: bold;
}

.add_button{
    height: 32px;
}
</style>
