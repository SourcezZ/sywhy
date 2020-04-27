<!-- 走马灯组件 -->
<template>
    <div class="container">
<!--        <el-carousel :interval="4000" type="card">-->
<!--            <el-carousel-item>-->
<!--                <img class="img" src="../light/1.jpg">-->
<!--            </el-carousel-item>-->

<!--            <el-carousel-item>-->
<!--                <img class="img" src="../light/2.jpg">-->
<!--            </el-carousel-item>-->

<!--            <el-carousel-item>-->
<!--                <img class="img" src="../light/3.jpg">-->
<!--            </el-carousel-item>-->
<!--            <el-carousel-item>-->
<!--                <img class="img" src="https://api.r10086.com:8443/动漫综合2.php">-->
<!--            </el-carousel-item>-->
<!--        </el-carousel>-->
<!--        <img class="img" :src="img_url" id="img" alt=""/>-->
        <img class="img" src="" id="img" alt=""/>
        <div slot="placeholder" class="image-slot" v-if="show_desc">
            我这里有一张图片，你可以等我再加载一会儿0.0<span class="dot">...</span>
        </div>
        <div>
            <el-button slot="placeholder" size="large" :disabled="changing" class="image-slot" v-if="!show_desc" @click="get_img_api(true)">
                {{changing?"更换中":"换一张"}}<span style="position: absolute" v-if="changing">{{point}}</span>
            </el-button>
        </div>
        <br/>
        <br/>
        <el-input class="tl_input" v-model="words" placeholder="和我儿子对话"/>
        <el-button @click="chat_with_tuling">发送</el-button>
        <el-card class="tl_output">
            <div>{{ return_words }}</div>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            show_desc: true,
            words: '',
            return_words: '请主动和我儿子说话',
            img_url:"https://api.r10086.com:8443/动漫综合2.php",
            changing: false,
            point:'.'
        }
    },
    methods: {
        read(){
            // 图片文件转换为base64
            let dataUrl = sessionStorage.getItem("img_data_url")
            let image = document.querySelector("#img")
            if (dataUrl == null){
                this.getBase64Image((dataUrl)=>{
                    // image.src = dataUrl
                    image.src = dataUrl
                    this.show_desc = false
                    try {
                        sessionStorage.setItem("img_data_url", dataURL)
                    }catch (e) {
                        console.log("sessionStorage large")
                    }
                })
            }else{
                // image.src = dataUrl
                image.src = dataUrl
                this.show_desc = false
                try {
                    sessionStorage.setItem("img_data_url", dataURL)
                }catch (e) {
                    console.log("sessionStorage large")
                }
            }
        },

        /**
         * 图像转Base64
         */
        getBase64Image(callback) {
            let image = new Image()
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = this.img_url
            let canvas = document.createElement("canvas")
            var ctx = canvas.getContext("2d");


            // 将canvas的透明背景设置成白色
            // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // for(var i = 0; i < imageData.data.length; i += 4) {
            //     // 当该像素是透明的，则设置成白色
            //     if(imageData.data[i + 3] == 0) {
            //         imageData.data[i] = 255;
            //         imageData.data[i + 1] = 255;
            //         imageData.data[i + 2] = 255;
            //         imageData.data[i + 3] = 255;
            //     }
            // }
            // ctx.putImageData(imageData, 0, 0);

            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0, image.width, image.height);
                var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();
                var dataURL = canvas.toDataURL("image/" + ext);
                callback.call(this, dataURL)
            };
        },

        /**
         *Base64字符串转二进制
         */
        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(',')
            var mime = arr[0].match(/:(.*?);/)[1]
            var bstr = atob(arr[1])
            var n = bstr.length
            var u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new Blob([u8arr], {
                type: mime
            });
        },
        chat_with_tuling () {
            if (this.words == '') {
                this.message('请输入内容再发送', 'error')
                return
            }
            var req = { 'words': this.words }
            var thisObj = this
            this.postData2Server('chat_with_tuling', req, function (res) {
                if (res.msg == 'success') {
                    thisObj.return_words = res.return_words
                }
            }, true)
        },
        get_img_api (isChange){
            let thisObj = this
            let data_url = sessionStorage.getItem("data_url")
            let img = document.querySelector("#img")
            if (data_url != null && !isChange){
                img.src = data_url
                thisObj.show_desc = false
                return
            }
            if (isChange){
                this.changing = true
                this.point = '.'
            }
            this.postData2Server('get_img_api', {}, (res)=>{
                img.src = "data:" + res.content_type + ";base64," + res.img
                thisObj.show_desc = false
                thisObj.changing = false
                try {
                    sessionStorage.setItem("data_url", img.src)
                }catch (e) {
                    console.log("save data_url error : " + e)
                }
            }, true)
        }

    },
    mounted() {
        this.get_img_api(false)
        let thisObj = this
        setInterval(()=>{
            if (thisObj.point != '.....'){
                thisObj.point += '.'
            }else {
                thisObj.point = '.'
            }
        },300)
    }

}
</script>

<style scoped>
    .tl_output {
        width: 50%;
        position: relative;
        left: 25%;
        top: 20px;
    }
    .tl_input {
        width: 50%;
    }

    .container {
        text-align: center;
    }

    @media only screen and (min-width: 1200px) {
        .img {
            max-width: 50%;
            max-height: 100%;
            border-radius: 10px;
        }
    }
    @media only screen and (max-width: 1200px) {
        .img {
            max-width: 75%;
            border-radius: 10px;
        }
    }

</style>
<style>
    @media only screen and (min-width: 1200px) {
        .el_img .el-image__inner {
            min-width: 50%;
            min-height: 100%;
            border-radius: 10px;
        }
    }

    @media only screen and (max-width: 1200px) {
        .el_img .el-image__inner {
            min-width: 75%;
            border-radius: 10px;
        }
    }
</style>
