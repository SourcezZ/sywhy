<!-- 登陆组件 -->
<template>
    <el-form :rules='loginRule' :model='userForm' ref="userForm">
        <el-form-item label='username' prop='username'>
            <el-input v-model="userForm.username" :disabled='isDisabled()'></el-input>
        </el-form-item>
        <el-form-item label='password' v-if="loginStatus==0" prop='password'>
            <el-input v-model='userForm.password' type='password'></el-input>
        </el-form-item>
        <el-form-item>
            <el-button v-on:click="login" v-if="loginStatus==0">Sign in</el-button>
            <el-button v-on:click="logup" v-if="loginStatus==0">Sign up</el-button>
            <el-button v-on:click='logout' v-if="loginStatus==1">Sign out</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    // props: ["loginStatus"],
    data() {
        return {
            loginStatus:0,
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
            if (this.loginStatus == 1) {
                return true
            }else{
                return false
            }
        },
        //注销
        logout : function() {
            this.delCookie('username')
            this.delCookie('token')
            if (this.loginStatus == 1) {
                this.loginStatus = 0
                this.message("logout success", "success")
                this.$emit("userSignIn", '')
                
                this.userForm.username = ''
                this.userForm.password = ''
            }
        },

        //注册
        logup : function(params) {
            this.$refs.userForm.validate(valid => {
                if(valid){
                    if (this.userForm.username == "" || this.userForm.password == "") {
                        this.message("输入不能为空", "error");
                        return;
                    }
                    var req = {}
                    req.username = this.userForm.username
                    req.password = this.userForm.password

                    var thisObj = this
                    this.postData2Server('add_user', req, function(res){
                        console.log(res)
                        if(res.msg == 'success'){
                            thisObj.message("logup success","success")
                        }else{
                            thisObj.message(res.msg, "error");
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
                            thisObj.setCookie('username', req['username'], 0.5)
                            thisObj.setCookie('token', res['token'], 0.5)

                            thisObj.userForm.username = req['username']
                            thisObj.loginStatus = 1
                            thisObj.message("login success", "success")
                            thisObj.$emit("userSignIn", req['username'])
                        }else{
                            thisObj.message(res.msg, "error")
                        }

                    })
                }
            })
        }
        
    },
    mounted: function() {
        var thisObj = this
		this.postData2Server('get_username', {}, function(res){
			if (res.msg == 'success') {
                thisObj.userForm.username = res.username
                thisObj.loginStatus = 1
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

