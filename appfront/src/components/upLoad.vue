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
	// props:['loginStatus','username'],
	data() {
		return {
			loginStatus :'',
			actionUrl : "" ,
			imgList: [],
			success: false,
			uploadList:[],
			userForm:{
				'username':''
			}
		}
	},
	methods: {
		beforeUpload(){
			if(this.loginStatus ==0 ){
				this.$message({message: '请登录后再提交', type: "error",duration: 1000,showClose: true})
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

		this.userForm.username = this.getCookie('username')
        if(this.userForm.username == null){
            this.loginStatus = 0
        }else{
            this.loginStatus = 1
        }
	}
}
</script>

