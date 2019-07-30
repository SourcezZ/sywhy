<template>
    <div class="index_main" :style="'height:' + picHeight + 'px'">
        <!-- <Light></Light> -->
        <div class='div1'>
            <div style="margin:0;padding:0;overflow:hidden" >
                <iframe class="framClass" src="/static/mp3/monsters.mp3?autoplay=1"></iframe>
            </div>
            <el-menu :default-active="activeIndex" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <el-menu-item index="1">主页</el-menu-item>
                <el-menu-item index="2">走马灯</el-menu-item>
                <el-menu-item index="3">书籍</el-menu-item>
                <el-menu-item index="4">图库</el-menu-item>
                <el-menu-item index="5">登陆</el-menu-item>
                <!-- <el-menu-item index="6" v-if="username == '宋雨蔚'">You know me</el-menu-item> -->
                <!-- <el-menu-item index="7">You know me</el-menu-item> -->
            </el-menu>
            <!-- <router-link :to="{name:'首页',params:{index:'5'}}" style="font-size: 14px;color: orange;">立即注册</router-link> -->
        </div>
        <div class='login'>
            <span v-if="loginStatus==1">hello，{{this.username}}</span>
            <span v-else>未登录</span>
        </div>
        <div>
            <Story v-if='activeIndex==1' :loginStatus='loginStatus' :username='username'></Story>
            <Light v-if='activeIndex==2' :loginStatus='loginStatus' :username='username'></Light>
            <Library v-if='activeIndex==3' :loginStatus='loginStatus' :username='username'></Library>
            <Picture v-if='activeIndex==4' :loginStatus='loginStatus' :username='username'></Picture>
            <Login @userSignIn='userSignIn' v-if='activeIndex==5' :loginStatus='loginStatus'></Login>
            <!-- <ZY v-if='activeIndex==7'></ZY> -->
            <TOGETHER v-if="activeIndex==520"></TOGETHER>
        </div>
    </div>
</template>

<script>
import Library from "../components/Library";
import Story from "../components/story";
import Light from "../components/light";
import Picture from "../components/upLoad";
import Login from "../components/login";
import Store from "../store";
import ZY from "../components/zy";
import TOGETHER from "../components/together";
export default {
    components: { Library, Light, Story, Picture, Login, ZY, TOGETHER },

    data () {
        return {
            user: {},
            activeIndex: this.$route.params.index || '1',
            bookList: [],
            username: "",
            loginStatus: 0,
            picHeight:'',
        };
    },
    methods: {
        changeeee () {
            debugger
            this.activeIndex = this.$route.params.index

            this.$router.push({ name: '首页', params: { index: '5' } })
            // this.$router.push({path:'/', query: {index: '5'}})
        },
        handleSelect (key, keyPath) {
            this.activeIndex = key
        },
        getloginStatus () {
            if (this.username != "" && this.username != null) {
                this.loginStatus = 1;//已登录
            } else {
                this.loginStatus = 0;//未登录
            }
        },
        userSignIn: function (username) {
            this.username = username;
        }
    },
    watch: {
        username: function () {
            this.getloginStatus();
        }
    },
    mounted: function () {
        this.picHeight = document.body.scrollWidth
        var thisObj = this
        this.postData2Server('get_username', {}, function (res) {
            if (res.msg == 'success') {
                thisObj.username = res.username
            }
        })
    }
};
</script>

<style scoped>
.div1 .el-menu {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.div1 {
    display: flex;
    justify-content: center;
}

.index_main {
    background-image: url('/static/img/bg/bg1.jpg');
    background-repeat:repeat;
    width: 100%;
}

.framClass {
    position: fixed; 
    right: 30px;
    top: 50px; 
    display: none;
    background-color: pink;
    /* width:100%; */
    /* height:80px; */
}


</style>