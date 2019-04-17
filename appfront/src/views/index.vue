<template>
    <div>
        <!-- <Light></Light> -->
        <div class='div'>
            <el-menu :default-active="activeIndex" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <el-menu-item index="1">主页</el-menu-item>
                <el-menu-item index="2">走马灯</el-menu-item>
                <el-menu-item index="3">书籍</el-menu-item>
                <el-menu-item index="4">图库</el-menu-item>
                <el-menu-item index="5">登陆</el-menu-item>
                <el-menu-item index="6" v-if="username == '宋雨蔚'">You know me</el-menu-item>
            </el-menu>
        </div>
        <div class='login'>
                    <span v-if="userStatus==1">你好，{{this.username}}</span>
                    <span v-else>未登录</span>
                </div>
        <div>
            <Story v-if='activeIndex==1' :userStatus='userStatus' :username='username'></Story>
            <Light v-if='activeIndex==2' :userStatus='userStatus' :username='username'></Light>
            <Library v-if='activeIndex==3' :userStatus='userStatus' :username='username'></Library>
            <Picture v-if='activeIndex==4' :userStatus='userStatus' :username='username'></Picture>
            <Login @userSignIn='userSignIn' v-if='activeIndex==5' :userStatus='userStatus'></Login>
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
export default {
	components: { Library, Light, Story, Picture, Login },

	data() {
		return {
		user: {},
		activeIndex: "1",
		bookList: [],
		username: "",
		userStatus: 0
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			this.activeIndex = key;
		},
		getUserStatus() {
			if (this.username != "" && this.username != null) {
				this.userStatus = 1;//已登录
			} else {
				this.userStatus = 0;//未登录
			}
		},
		userSignIn: function(username) {
			this.username = username;
		}
	},
	watch: {
		username: function() {
			this.getUserStatus();
		}
	},
	mounted: function() {
		var thisObj = this
		this.postData2Server('userInfo', {}, function(res){
			if (res.username != null) {
				thisObj.username = res.username
			}
		})
	}
};
</script>

<style>
.el-menu {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.div {
	display: flex;
	justify-content: center;
}

</style>