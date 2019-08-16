<!-- 登陆组件 -->
<template>
    <div class="container">
        <div class="logStatus">
            <el-button v-on:click="chooseLog='login'" v-if="loginStatus==0">登陆</el-button>
            <el-button v-on:click="chooseLog='logup'" v-if="loginStatus==0">注册</el-button>
        </div>
        <div style="height:50px;"></div>
        <el-form class="loginForm" :rules='loginRule' :model='userForm' ref="userForm" label-width="80px" label-position="left">
            <el-form-item label='用户名' prop='username'>
                <el-input v-if="chooseLog=='logup'" v-model="userForm.username" :disabled='isDisabled()' onkeyup="value=value.replace(/[^\w]/ig,'')"></el-input>
                <el-input v-else v-model="userForm.username" :disabled='isDisabled()'></el-input>
            </el-form-item>
            <el-form-item label='密码' v-if="loginStatus==0" prop='password'>
                <el-input v-model='userForm.password' type='password' autocomplete="new-password" @keyup.enter.native='login'></el-input>
            </el-form-item>
            <el-form-item label='邮箱' v-if="loginStatus==0 && chooseLog=='logup'" prop='email'>
                <el-input v-model='userForm.email'></el-input>
                <el-button style="position:absolute;top: 1px;left: 205px;" v-on:click="send_register_email" :disabled="!showSendValid">
                    获取验证码 {{ remainSecond }}<span v-if="remainSecond!=null">s</span>
                </el-button>
            </el-form-item>
            <el-form-item label='验证码' v-if="loginStatus==0  && chooseLog=='logup'" prop='validCode'>
                <el-input v-model='userForm.validCode'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-on:click="submitLogInfo" v-if="loginStatus==0">提交</el-button>
                <el-button v-on:click='logout' v-if="loginStatus==1">注销</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    // props: ["loginStatus"],
    data () {
        return {
            chooseLog: 'login',
            showSendValid: true,
            timer: null,
            remainSecond: null,
            loginStatus: 0,
            userForm: {
                username: '',
                password: '',
                email: '',
                validCode: '',
            },
            loginRule: {
                username: { required: true, message: '请输入用户名', trigger: 'blur' },
                password: { required: true, message: '请输入密码', trigger: 'change' },
                validCode: { required: true, message: '请输入验证码', trigger: 'change' },
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'change' },
                    { pattern: /^[\da-zA-Z\S]+@[\da-zA-Z]+.com$/, message: '邮箱格式错误', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        submitLogInfo: function () {
            if (this.chooseLog == 'login') {
                this.login()
            } else if (this.chooseLog == 'logup') {
                this.logup()
            }
        },
        isDisabled: function () {
            if (this.loginStatus == 1) {
                return true
            } else {
                return false
            }
        },
        //注销
        logout: function () {
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
        logup: function () {
            this.$refs.userForm.validate(valid => {
                if (valid) {
                    if (this.userForm.username == "" || this.userForm.password == "") {
                        this.message("输入不能为空", "error");
                        return;
                    }

                    var thisObj = this
                    this.postData2Server('add_user', this.userForm, function (res) {
                        console.log(res)
                        if (res.msg == 'success') {
                            thisObj.message("logup success", "success")
                            thisObj.chooseLog = 'login'//注册成功，转换登陆页面
                        } else {
                            thisObj.message(res.msg, "error");
                        }
                    })
                }
            })
        },

        //登陆
        login: function () {
            this.$refs.userForm.validate(valid => {
                if (valid) {
                    var req = {}
                    req.username = this.userForm.username
                    req.password = this.userForm.password

                    var thisObj = this
                    this.postData2Server('login', req, function (res) {
                        console.log(res)
                        if (res.msg == 'success') {
                            thisObj.setCookie('username', req['username'], 24)
                            thisObj.setCookie('token', res['token'], 24)

                            thisObj.userForm.username = req['username']
                            thisObj.loginStatus = 1
                            thisObj.message("login success", "success")
                            thisObj.$emit("userSignIn", req['username'])
                        } else {
                            thisObj.message(res.msg, "error")
                        }

                    })
                }
            })
        },

        send_register_email: function () {
            var thisObj = this
            this.$refs.userForm.validateField('username', (errorMsg) => {
                this.$refs.userForm.validateField('email', (errorMsg) => {
                    if (errorMsg == '') {
                        thisObj.message("sending, please wait.", "success")
                        this.postData2Server('send_register_email', this.userForm, function (res) {
                            console.log(res)
                            if (res.msg == 'success') {
                                thisObj.message("validCode send success, please check your email", "success")
                                thisObj.sendEmail()
                            } else {
                                thisObj.message(res.msg, "error")
                            }

                        })

                    }
                })
            })

        },

        sendEmail: function () {
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
        },

        // check_username(val){
        //     debugger
        //     console.log(this.userForm.username)
        // }

    },
    watch: {
        chooseLog: function (newVal, oldVal) {
            this.$refs.userForm.clearValidate()
        }
    },
    mounted: function () {
        var thisObj = this
        this.postData2Server('get_username', {}, function (res) {
            if (res.msg == 'success') {
                thisObj.userForm.username = res.username
                thisObj.loginStatus = 1
            }
        })
    }
}
</script>

<style scoped>
.container {
    position: relative;
}
.logStatus {
    float: right;
    padding-right: 100px;
}
.loginForm {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loginForm .el-input {
    width: 200px;
}
</style>

