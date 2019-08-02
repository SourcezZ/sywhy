<!-- 图片上传组件 -->
<template>
    <div>
        <el-upload :before-upload="beforeUpload" :file-list="uploadList" class="upload-demo" ref="upload" action="#" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="showImg" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
        <!-- <div v-for="i in imgList" :key="i.pk">
            <a :href="'/upload/img/' + i.fields.imgUrl">
                <el-image :src="'/upload/img/' + i.fields.imgUrl"></el-image>
            </a>
        </div> -->
        <div class="demo-image__lazy">
            <a class="img_a" v-for="i in imgList" :key="i.pk" :href="'/upload/img/' + i.fields.imgUrl" target="_Blank">
                <el-image class="img_class" :src="'/upload/convert_img/' + i.fields.imgUrl" lazy></el-image>
                <span class="time_class">{{ i.fields.addTime | dataFormat('yyyy-MM-dd hh:mm')}}</span>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    // props:['loginStatus','username'],
    data () {
        return {
            loginStatus: '',
            actionUrl: "",
            imgList: [],
            success: false,
            uploadList: [],
            userForm: {
                'username': ''
            },
            filess: '/static/img/1.2e40016.jpg',
        }
    },
    methods: {
        beforeUpload (file) {
            let isJPG = (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/gif')
            let is500K = file.size / 1024 < 500

            if (!isJPG){
                this.message("上传图片只支持jpg、jpeg、png或gif格式", "error");
                return false
            } else if (!is500K){
                this.$confirm('上传图片大小超过500K,上传可能花费较长时间,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.message("上传图片大小超过500K，请耐心等待上传成功", "success");
                }).catch(() => {
                    this.message("已取消上传", "info");
                    return false
                })
            }
            var thisObj = this
            let formDatas = new FormData()
            formDatas.append('file', file)
            formDatas.append('token', this.getCookie('token'))//token
            // for (var value of FormDatas.values()) {
            //     console.log(value);
            // }
            this.postData2Server('uploadImg', formDatas, function (res) {
                if (res.msg == 'success') {
                    thisObj.message("上传成功", "success");
                    thisObj.showImg()
                } else {
                    thisObj.message("上传失败", "error");
                }
            })
            return false
        },
        submitUpload () {
            this.$refs.upload.submit()
        },
        handleRemove (file, fileList) {
            console.log(file, fileList);
        },
        handlePreview (file) {
            console.log(file);
        },
        showImg: function (res, file, fileList) {
            if (res && res.msg == 'success') {
                this.message('操作成功', 'success')
                this.$refs.upload.clearFiles()
            }
            var thisObj = this
            this.postData2Server('showImg', {}, function (res) {
                if (res.msg == 'success') {
                    thisObj.imgList = res["list"];
                } else {
                    thisObj.message("查询失败", "error");
                }
            })
        }
    },
    mounted: function () {
        this.showImg()
        // this.actionUrl = this.getUploadUrl('uploadImg')
        this.actionUrl = ''
    }
}
</script>
<style>
.img_a{
    position: relative;
    width: 100%;
    text-decoration:none;
}

.img_a:link {color:#2E84FF;}
.img_a:visited {color:#2E84FF;}

.img_class {
    width: 45%;
    margin: 7px 0 25px 8px;
}
.time_class{
    position: absolute;
    top: 110%;
    left: 11%;
    width: 100%;
}
</style>

