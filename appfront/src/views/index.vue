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
                <el-menu-item index="6" v-if="userName == '宋雨蔚'">You know me</el-menu-item>
            </el-menu>
        </div>
        <div class='login'>
                    <span v-if="userStatus==1">你好，{{this.userName}}</span>
                    <span v-else>未登录</span>
                </div>
        <div>
            <Story v-if='activeIndex==1' :userStatus='userStatus' :userName='userName'></Story>
            <Light v-if='activeIndex==2' :userStatus='userStatus' :userName='userName'></Light>
            <Library v-if='activeIndex==3' :userStatus='userStatus' :userName='userName'></Library>
            <Picture v-if='activeIndex==4' :userStatus='userStatus' :userName='userName'></Picture>
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
      user: null,
      activeIndex: "1",
      bookList: [],
      userName: "",
      userStatus: 0
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      console.log(key, keyPath);
    },
    getUserStatus() {
      if (this.userName != "" && this.userName != null) {
        this.userStatus = 1;//已登录
      } else {
        this.userStatus = 0;//未登录
      }
    },
    userSignIn: function(userName) {
      this.userName = userName;
    }
  },
  watch: {
    userName: function() {
      this.getUserStatus();
    }
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

.login {
}
</style>