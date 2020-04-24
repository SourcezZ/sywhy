<!-- 走马灯组件 -->
<template>
    <div class="container">
<!--        <el-carousel :interval="4000" type="card">-->
<!--            <el-carousel-item>-->
<!--                <img class="img" src="../light/1.jpg">-->
<!--            </el-carousel-item>-->

<!--            <el-carousel-item>-->
<!--                <img class="img" src="../light/2.jpg">-->
<!--            </el-carousel-item>-->

<!--            <el-carousel-item>-->
<!--                <img class="img" src="../light/3.jpg">-->
<!--            </el-carousel-item>-->
<!--            <el-carousel-item>-->
<!--                <img class="img" src="https://api.r10086.com:8443/动漫综合2.php">-->
<!--            </el-carousel-item>-->
<!--        </el-carousel>-->
        <el-image class="el_img" :src="'https://api.r10086.com:8443/动漫综合2.php'" lazy></el-image>
        <br/>
        <br/>
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

    .container {
        text-align: center;
    }

</style>
<style>
    @media only screen and (min-width: 1200px) {
        .el_img .el-image__inner {
            width: 50%;
            height: auto;
            border-radius: 10px;
        }
    }

    @media only screen and (max-width: 1200px) {
        .el_img .el-image__inner {
            width: 75%;
            border-radius: 10px;
        }
    }
</style>
