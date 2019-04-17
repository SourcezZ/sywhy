<!-- 图片上传组件 -->
<template>
  <div>
    <el-upload :before-upload="beforeUpload" :file-list="uploadList" class="upload-demo" ref="upload" :action="actionUrl" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="showImg" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
    <div v-for="i in imgList" :key="i.pk">
      <img :src="'static/img/' + i.fields.imgUrl">
    </div>
  </div>
</template>
<script>
export default {
	props:['userStatus','username'],
	data() {
		return {
			actionUrl : "" ,
			imgList: [],
			success: false,
			uploadList:[],
		}
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
			// this.postData2Server('uploadImg', this.$refs.upload.uploadFiles, function(res){
            //     if (res.error_num == 0) {
			// 		thisObj.imgList = res["list"];
			// 	} else {
			// 		thisObj.$message.error("查询失败");
			// 	}
            // })
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
			var thisObj = this
			this.postData2Server('showImg', {}, function(res){
                if (res.error_num == 0) {
					thisObj.imgList = res["list"];
				} else {
					thisObj.$message.error("查询失败");
				}
            })
			this.success=false
		}
	},
	mounted: function() {
		this.showImg()
		this.actionUrl = this.getUploadUrl('uploadImg')
	}
}
</script>

