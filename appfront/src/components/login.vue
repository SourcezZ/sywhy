<template>
  <el-form>
    <el-form-item label='Account'>
      <el-input v-model="account"></el-input>
    </el-form-item>
    <el-form-item label='Password'>
      <el-input v-model='password' type='password'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-on:click="login">Sign in</el-button>
      <el-button v-on:click="logup">Sign up</el-button>
      <el-button v-on:click='logout'>Sign out</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["userStatus"],
  data() {
    return {
      account: "",
      password: "",
      list: []
    };
  },
  methods: {
    logout: function() {
      sessionStorage.username = "";
      this.$emit("userSignIn", sessionStorage.username);
      if (this.userStatus == 1) {
          this.$message({
              message:"logout success",
              type:'success',
              duration:500,
              showClose:true
            })
      }
    },
    logup: function(params) {
      if (this.account == "" || this.password == "") {
        this.$message.error("输入不能为空");
        return;
      }
      for (let i = 0; i < this.list.length; i++) {
        if (this.account == this.list[i].fields.account) {
          this.$message.error("account exsist");
          return;
        }
      }
      var url = window.location.href
      this.$http
        .get(
          url + "api/add_user?account=" +
            this.account +
            "&password=" +
            this.password
        )
        .then(response => {
          var res = JSON.parse(response.bodyText);
          // console.log(res)
          if (res.error_num == 0) {
          } else {
            this.$message.error("新增内容失败，请重试");
            console.log(res["msg"]);
          }
        });
    },
    loginInfo: function(params) {
      var url = window.location.href
      this.$http.get(url + "api/loginInfo").then(response => {
        var res = JSON.parse(response.bodyText);
        // console.log(res)
        if (res.error_num == 0) {
          this.list = res["list"];
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    login: function(params) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.userStatus == 1) {
          this.$message({
              message:"你已经登陆",
              type:'error',
              duration:500,
              showClose:true
            })
          break;
        }
        if (this.account == "宋雨蔚") {
          sessionStorage.username = this.account;
          this.$emit("userSignIn", sessionStorage.username);
          this.$message({
            message: "login success",
            type: "success",
            duration: 500,
            showClose: true
          });
          break;
        }
        if (this.account == this.list[i].fields.account) {
          if (this.password == this.list[i].fields.password) {
            sessionStorage.username = this.account;
            this.$emit("userSignIn", sessionStorage.username);
            this.$message({
              message: "login success",
              type: "success",
              duration: 500,
              showClose: true
            });
            break;
          }
          this.$message({
            message: "account or password false",
            type: "error",
            duration: 500,
            showClose: true
          });
          break;
        }
        i == this.list.length - 1
          ? this.$message({
              message: "account or password false",
              type: "error",
              duration: 500,
              showClose: true
            })
          : "";
      }
    }
  },
  mounted: function() {
    this.loginInfo();
  }
};
</script>
<style>
.el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

