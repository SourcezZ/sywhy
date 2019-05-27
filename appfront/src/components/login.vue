<!-- 登陆组件 -->
<template>
        <el-form class="loginForm" :rules='loginRule' :model='userForm' ref="userForm" label-width="80px" label-position="left">
            <el-form-item label='用户名' prop='username'>
                <el-input v-model="userForm.username" :disabled='isDisabled()'></el-input>
            </el-form-item>
            <el-form-item label='密码' v-if="loginStatus==0" prop='password'>
                <el-input v-model='userForm.password' type='password' @keyup.enter.native='login'></el-input>
            </el-form-item>
            <el-form-item label='邮箱' v-if="loginStatus==0" prop='email' >
                <el-input v-model='userForm.email' ></el-input> <el-button style="position:absolute;top: 1px;left: 205px;" v-on:click="send_register_email" :disabled="!showSendValid">获取验证码 {{ remainSecond }} </el-button>
            </el-form-item>
            <el-form-item label='验证码' v-if="loginStatus==0" prop='validCode'>
                <el-input v-model='userForm.validCode'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-on:click="login" v-if="loginStatus==0">登陆</el-button>
                <el-button v-on:click="logup" v-if="loginStatus==0">注册</el-button>
                <el-button v-on:click='logout' v-if="loginStatus==1">注销</el-button>
            </el-form-item>
        </el-form>
</template>

<script>
export default {
    // props: ["loginStatus"],
    data() {
        return {
            showSendValid:true,
            timer:null,
            remainSecond:null,
            loginStatus:0,
            userForm:{
                username : '',
                password : '',
                email : '',
                validCode: '',
            },
            loginRule:{
                username : {required:true, message:'请输入用户名', trigger:'change'},
                password : {required:true, message:'请输入密码', trigger:'change'},
                validCode : {required:true, message:'请输入验证码', trigger:'change'},
                email : [
                    {required:true, message:'请输入邮箱', trigger:'change'},
                    {pattern:/^[\da-zA-Z\S]+@[\da-zA-Z]+.com$/, message:'邮箱格式错误', trigger:'blur'}
                ],
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

                    var thisObj = this
                    this.postData2Server('add_user', this.userForm, function(res){
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
        },

        send_register_email : function () {
            var thisObj = this
            this.$refs.userForm.validateField('username', (errorMsg) => {
                this.$refs.userForm.validateField('email', (errorMsg) => {
                    if (errorMsg == ''){
                        this.postData2Server('send_register_email', this.userForm, function (res) {
                            console.log(res)
                            if (res.msg == 'success') {
                                thisObj.message("validCode send success, please check your email", "success")
                                thisObj.sendEmail()
                            }else{
                                thisObj.message(res.msg, "error")
                            }

                        })
                        
                    }
                })
            })
            
        },

        sendEmail : function () {
            const TIME_COUNT = 60;
            this.showSendValid = false
            if (!this.timer) {
                this.remainSecond = TIME_COUNT;
                this.timer = setInterval(() => {
                    if (this.remainSecond > 0 && this.remainSecond <= TIME_COUNT) {
                        this.remainSecond--
                    } else {
                        clearInterval(this.timer)
                        this.timer = null
                        this.remainSecond = null
                        this.showSendValid = true
                    }
                }, 1000)
            }
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

<style scoped>
.loginForm{
    display: flex; 
    flex-direction: column; 
    align-items: center; 
}

.loginForm 
    .el-input {
        width: 200px;
    }
</style>

