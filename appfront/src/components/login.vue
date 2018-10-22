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
      alert("logout success");
    },
    logup: function(params) {
      if (this.account == "" || this.password == "") {
        this.$message.error("输入不能为空")
        return
      }
      for (let i = 0; i < this.list.length; i++) {
        if (this.account == this.list[i].fields.account) {
          alert('account exsist')
          return
        }
      }
      this.$http
        .get(
          "http://127.0.0.1:8000/api/add_user?account=" +
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
      this.$http.get("http://127.0.0.1:8000/api/loginInfo").then(response => {
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
        if (this.account == this.list[i].fields.account) {
          if (this.password == this.list[i].fields.password) {
            sessionStorage.username = this.account;
            this.$emit("userSignIn", sessionStorage.username);
            alert("login success");
            break;
          }
          alert("password false");
          break;
        }
        alert("account or password false");
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

