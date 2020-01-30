<!-- 走马灯组件 -->
<template>
    <div style="text-align:center">
        <el-carousel :interval="4000" type="card" height="100px">
            <el-carousel-item>
                <img class="img" src="../light/1.jpg">
            </el-carousel-item>

            <el-carousel-item>
                <img class="img" src="../light/2.jpg">
            </el-carousel-item>

            <el-carousel-item>
                <img class="img" src="../light/3.jpg">
            </el-carousel-item>
        </el-carousel>
        <el-input class="tl_input" v-model="words" placeholder="和我儿子对话"/>
        <el-button @click="chat_with_tuling">发送</el-button>
        <el-card class="tl_output">
            <div>{{ return_words }}</div>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            words: '',
            return_words: '请主动和我儿子说话',
        }
    },
    methods: {
        chat_with_tuling () {
            if (this.words == '') {
                this.message('请输入内容再发送', 'error')
                return
            }
            var req = { 'words': this.words }
            var thisObj = this
            this.postData2Server('chat_with_tuling', req, function (res) {
                if (res.msg == 'success') {
                    thisObj.return_words = res.return_words
                }
            }, true)
        }
    }

}
</script>
<style scoped>
.tl_output {
    width: 50%;
    position: relative;
    left: 25%;
    top: 20px;
}
.tl_input {
    width: 50%;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.img {
    width: 100%;
    height: auto;
    max-width: 100%;
    display: block;
}
</style>
