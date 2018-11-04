<template>
  <div>
    <el-upload class="upload-demo" ref="upload" :action="uploaadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="showImg" :auto-upload="false">
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
  data() {
    return {
      uploaadUrl : window.location.href + 'api/uploadImg' ,
      imgList: [],
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    showImg: function(params) {
      var url = window.location.href
      this.$http.get(url + "api/showImg").then(response => {
        var res = JSON.parse(response.bodyText);
        // console.log(res)
        if (res.error_num == 0) {
          this.imgList = res["list"];
        } else {
          this.$message.error("查询失败");
        }
      });
    }
  },
  mounted: function() {
    this.showImg();
  }
};
</script>

