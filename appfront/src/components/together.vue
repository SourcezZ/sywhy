<template>
    <div>
        <el-upload :before-upload="beforeUpload" :file-list="uploadList" class="upload-demo" ref="upload" :action="actionUrl" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="showImg" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
        <div>
            <a v-for="url in imgList" :key="url" :href="'/upload/img/us/' + url">
                <el-image class="img_class" :src="'/upload/img/us/' + url" lazy></el-image>
            </a>
        </div>
        <!-- <div v-for="i in imgList" :key="i.pk">
            <img :src="'/upload/img/us/' + i">
        </div> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            actionUrl: "",
            imgList: [],
            success: false,
            uploadList: [],
        }
    },
    methods: {
        beforeUpload (file) {
            var thisObj = this
            let formDatas = new FormData()
            formDatas.append('file', file)
            formDatas.append('token', this.getCookie('token'))//token
            this.postData2Server('uploadImgForUs', formDatas, function (res) {
                if (res.msg == 'success') {
                    thisObj.message("上传成功", "success");
                    thisObj.showImg()
                } else {
                    thisObj.message("上传失败", "error");
                }
            })
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
            var thisObj = this
            this.postData2Server('showImgForUs', {}, function (res) {
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
    }

}        
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.img {
    width: 100%;
    height: auto;
    max-width: 100%;
    display: block;
}
.img_class {
    width: 45%;
    margin: 8px;
}
</style>