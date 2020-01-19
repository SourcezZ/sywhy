<template>
    <div class="index_main">
        <div class='div1'>
            <el-menu :default-active="activeIndex" @select="handleSelect" background-color="#545c64" text-color="#fff"
                     active-text-color="#ffd04b" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <el-menu-item index="1">主页</el-menu-item>
                <el-menu-item index="2">解闷</el-menu-item>
                <el-menu-item index="3">曲库</el-menu-item>
                <el-menu-item index="4">图库</el-menu-item>
<!--                <el-menu-item index="5">登陆</el-menu-item>-->
                <!-- <el-menu-item index="7">You know me</el-menu-item> -->
            </el-menu>
            <!-- <router-link :to="{name:'首页',params:{index:'5'}}" style="font-size: 14px;color: orange;">立即注册</router-link> -->
        </div>
        <div class='login'>
            <el-tag type="success" v-if="loginStatus==1">hello，{{this.username}}</el-tag>
            <!--            <el-tag type="success" v-else>未登录</el-tag>-->
<!--            <el-tag type="success" v-else>~</el-tag>-->
            <el-button class="announcement_button" type="text" @click="dialogVisible = true">小公告</el-button>
<!--            <el-dialog class="announcement" title="小公告" center :visible.sync="dialogVisible" width="70%">-->
            <el-dialog title="小公告" center :visible.sync="dialogVisible" width="90%">
<!--            <mavon-editor v-html="announcement_md"-->
                <mavon-editor
                :value=announcement_md
                :subfield = false
                :defaultOpen = "'preview'"
                :toolbarsFlag = false
                :editable=false
                :scrollStyle=true
                :ishljs = true></mavon-editor>
                <!--:value="detailContent.content"：引入要转换的内容-->
                <!--:subfield = "false"：开启单栏模式-->
                <!--:defaultOpen = "'preview'"：默认展示预览区域-->
                <!--:toolbarsFlag = "false"：关闭工具栏-->
                <!--:editable="false"：不允许编辑-->
                <!--scrollStyle="true"：开启滚动条样式(暂时仅支持chrome)-->
                <!--:ishljs = "true"：开启代码高亮-->
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
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
<!--        <div id="XlchPlayer">*************************</div>-->
    </div>
</template>

<script>
    import "../../static/BadApplePlayer/scrollbar.js";
    import "../../static/BadApplePlayer/Player.js";

    document.body.style.margin = 0;
    import Library from "../components/Library";
    import Story from "../components/story";
    import Light from "../components/light";
    import Picture from "../components/upLoad";
    import Login from "../components/login";
    import Store from "../store";
    import ZY from "../components/zy";
    import TOGETHER from "../components/together";

    export default {
        components: {Library, Light, Story, Picture, Login, ZY, TOGETHER},

        data() {
            return {
                announcement_md: "",
                dialogVisible: true,//dialog
                user: {},
                activeIndex: this.$route.params.index || '1',
                bookList: [],
                username: "",
                loginStatus: 0,
                picHeight: '',
            };
        },
        methods: {
            changeeee() {
                debugger
                this.activeIndex = this.$route.params.index

                this.$router.push({name: '首页', params: {index: '5'}})
                // this.$router.push({path:'/', query: {index: '5'}})
            },
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },
            getloginStatus() {
                if (this.username != "" && this.username != null) {
                    this.loginStatus = 1;//已登录
                } else {
                    this.loginStatus = 0;//未登录
                }
            },
            userSignIn: function (username) {
                this.username = username;
            },
        },
        watch: {
            username: function () {
                this.getloginStatus();
            }
        },
        mounted: function () {
            this.picHeight = document.body.scrollHeight + window.screen.height + document.body.scrollHeight;
            var thisObj = this
            // if (this.activeIndex != '5') {
            //     this.postData2Server('get_username', {}, function (res) {
            //         if (res.msg == 'success') {
            //             thisObj.username = res.username
            //         }
            //     })
            // }
            this.axios.get("upload/md/announcement_md.md").then( response => {
                thisObj.announcement_md = response.data;
            });
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
        /* background-image: url('/static/img/bg/bg1.jpg'); */
        background-repeat: repeat;
        background-size: 50%;
        width: 100%;
        min-height: 100%;
        /*float: bottom;*/
    }

    .framClass {
        position: fixed;
        bottom: 0px;
        /* display: none; */
        background-color: pink;
        width: 100%;
        height: 200px;
        z-index: 100;
    }

    .framClass2 {
        position: fixed;
        bottom: 0px;
        /* display: none; */
        background-color: pink;
        /* width:100%; */
        /* height:200px; */
        z-index: 100;
        border-radius: 35px;
    }

    .musicButton {
        position: absolute;
        right: 50px;
        top: 150px;
    }

    .announcement div{
        margin: 5px 0 10px 0;
        text-align: center;
    }

    .announcement_button{
        margin-right: 5px;
        font-size: 15px;
        font-weight: bold;
    }

    .login {
        text-align: right;
    }

    .v-note-wrapper {
        min-height: 200px;
    }

</style>
