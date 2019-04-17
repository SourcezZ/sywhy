<!-- 登陆组件 -->
<template>
  <el-form :rules='loginRule' :model='userForm' ref="userForm">
	<el-form-item label='username' prop='username'>
	  <el-input v-model="userForm.username" :disabled='isDisabled()'></el-input>
	</el-form-item>
	<el-form-item label='password' v-if="userStatus==0" prop='password'>
	  <el-input v-model='userForm.password' type='password'></el-input>
	</el-form-item>
	<el-form-item>
	  <el-button v-on:click="login" v-if="userStatus==0">Sign in</el-button>
	  <el-button v-on:click="logup" v-if="userStatus==0">Sign up</el-button>
	  <el-button v-on:click='logout' v-if="userStatus==1">Sign out</el-button>
	</el-form-item>
  </el-form>
</template>

<script>
export default {
    props: ["userStatus"],
    data() {
        return {
            userForm:{
                username : '',
                password : ''
            },
            loginRule:{
                username : [
                    {required:true, message:'need username', trigger:'blur'},
                ],
                password : {required:true, message:'need password', trigger:'blur'},
            }
        }
    },
    methods: {
        isDisabled : function(){
            if (this.userStatus == 1) {
                return true
            }else{
                return false
            }
        },
        //注销
        logout : function() {
            sessionStorage.clear()
            this.userForm.username = ''
            if (this.userStatus == 1) {
                this.$message({message:"logout success",type:'success',duration:500,showClose:true})
                this.$emit("userSignIn", '')
                debugger
                this.$refs.userForm.resetFields()
            }
        },

        //注册
        logup : function(params) {
            this.$refs.userForm.validate(valid => {
                if(valid){
                    if (this.userForm.username == "" || this.userForm.password == "") {
                        this.$message.error("输入不能为空");
                        return;
                    }
                    var req = {}
                    req.username = this.userForm.username
                    req.password = this.userForm.password

                    var thisObj = this
                    this.postData2Server('add_user', req, function(res){
                        console.log(res)
                        if(res.msg == 'success'){
                            thisObj.$message({message: "logup success", type: "success",duration: 1000,showClose: true});
                        }else{
                            thisObj.$message({message: res.msg, type: "error",duration: 1000,showClose: true});
                        }
                    })
                }
            })
        },
        
        //登陆
        login : function () {
            this.$refs.userForm.validate(valid =>{
                if(valid){
                    var req = {}
                    req.username = this.userForm.username
                    req.password = this.userForm.password

                    var thisObj = this
                    this.postData2Server('login', req, function (res) {
                        console.log(res)
                        if (res.msg == 'success') {
                            sessionStorage.setItem('token', res['token'])
                            sessionStorage.setItem('username', req['username'])
                            thisObj.$message({message: "login success", type: "success",duration: 1000,showClose: true});
                            thisObj.$emit("userSignIn", sessionStorage.username);
                        }else{
                            thisObj.$message({message: res.msg, type: "error",duration: 1000,showClose: true});
                        }

                    })
                }
            })
        }
        
    },
    mounted: function() {
        var thisObj = this
		this.postData2Server('userInfo', {}, function(res){
			if (res.username != null) {
				thisObj.userForm.username = res.username
			}
		})
    }
}
</script>

<style>
.el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>

