<!-- 图片上传组件 -->
<template>
  <div>
    <el-upload :before-upload="beforeUpload" :file-list="uploadList" class="upload-demo" ref="upload" :action="uploaadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="showImg" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
    <div v-for="i in imgList" :key="i.pk">
      <img :src="'static/img/' + i.fields.img_url">
    </div>
  </div>
</template>
<script>
export default {
  props:['userStatus','userName'],
  data() {
    return {
      uploaadUrl : "" ,
      imgList: [],
      success: false,
      uploadList:[],
    };
  },
  methods: {
    beforeUpload(){
      if(this.userStatus!=1){
        this.$message.error("请登录后再提交")
        return false
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
      this.success=true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    showImg: function(params, file, fileList) {
      if(this.success==true){
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        console.log(this.uploadList)
        this.$refs.upload.clearFiles()
      }
      var url = window.location.href
      if(url.includes(':8080')){
          url=url.substring(0,url.lastIndexOf(":")) + ':8000/'
      }
      if (!url.includes(':8000')) {
        url=url.substring(0,url.length-1) + ':8000/'
      }
      this.$http.get(url + "api/showImg").then(response => {
        var res = JSON.parse(response.bodyText);
        if (res.error_num == 0) {
          this.imgList = res["list"];
        } else {
          this.$message.error("查询失败");
        }
      });
      this.success=false
    }
  },
  mounted: function() {
    this.showImg();
    this.uploaadUrl = window.location.href
    if(this.uploaadUrl.includes(':8080') || this.uploaadUrl.includes(':8000')){
      this.uploaadUrl=this.uploaadUrl.substring(0,this.uploaadUrl.lastIndexOf(":")) + ':8000/api/uploadImg '
    }
    if (!this.uploaadUrl.includes(':8000')) {
      this.uploaadUrl=this.uploaadUrl.substring(0,this.uploaadUrl.length-1) + ':8000/api/uploadImg '
    }
  }
};
</script>

