<template>
    <div style="text-align:center">
        <div class="h1div">
            <h1>但我知道，</h1>
            <h1>这一切是无比美好的，</h1>
            <h1>它不可思议，</h1>
            <h1>甚至不合情理，</h1>
            <h1>我没有想到这种感觉如此难以抗拒,</h1>
            <h1>更没有想过是你和我一同深陷其中。</h1>
        </div>
        <div style="position:abusolutely;float: right;">
            <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=461525011&auto=1&height=66"></iframe>
        </div>
        <div id="surprise" style="text-align:center">
            <div class="name" style="padding: 100px">
                <el-input v-model="input" @keyup.enter.native="sure" placeholder="请输入你的名字" style="width: 400px"></el-input>
                <el-button @click="sure">确定</el-button>
                <a v-if="flag=='true'">
                    <el-button @click="jump">baby, click me</el-button>
                </a>
            </div>
            <div style="text-align:left;padding-left:30px">

                <el-button plain @click="surprise">
                    a surprise
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            input: '',
            out: '',
            flag: 'false',
        }
    },
    methods: {
        jump () {
            this.$router.push({ name: '跳转登陆', params: { index: '520' } })
        },
        surprise () {
            const h = this.$createElement;
            this.$notify({
                title: 'I',
                message: h('i', 'hid a surprise in your computer'),
                position: 'top-left',

            });
        },
        //确定函数，判断人名
        sure () {
            if (this.input === '宋雨蔚') {
                this.open();
            }
            else if (this.input === '何源') {
                this.$message({
                    type: 'info',
                    message: '笨蛋，这是我',
                });
            }
            else {
                this.open2();
            }
        },
        //打开函数
        open () {
            this.$alert('你肯定就是我的宝贝小宋啦', '小宋', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: '小宋，我喜欢你啊'
                    });
                }
            });
            this.flag = 'true'
        },
        //打开函数2
        open2 () {
            if (this.input != '') {
                this.$message({
                    type: 'info',
                    message: '抱歉，' + this.input,
                });
            } else {
                this.$message({
                    type: 'info',
                    message: '抱歉',
                });
            }

        },
    }

}        
</script>
<style scoped>
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

.h1div {
    font-weight: bold;
    font-size: 0.5cm;
    font-family: YouYuan;
    color: #f0dad2;
    text-align: center;
}
</style>
