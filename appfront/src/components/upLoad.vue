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
		beforeUpload(file){
            var thisObj = this
            let formDatas = new FormData()
            formDatas.append('file',file)
            formDatas.append('token',this.getCookie('token'))//token
            // for (var value of FormDatas.values()) {
            //     console.log(value);
            // }
            let that = this
            this.postData2Server('uploadImg', formDatas, function(res){
                if (res.msg == 'success') {
					thisObj.message("上传成功", "success");
				} else {
					thisObj.message("上传失败", "error");
				}
            })
		},
		submitUpload() {
            this.$refs.upload.submit()
        },
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		showImg: function(res, file, fileList) {
			if(res && res.msg == 'success'){
				this.message('操作成功', 'success')
				this.$refs.upload.clearFiles()
			}
			var thisObj = this
			this.postData2Server('showImg', {}, function(res){
                if (res.msg == 'success') {
					thisObj.imgList = res["list"];
				} else {
					thisObj.message("查询失败", "error");
				}
            })
		}
	},
	mounted: function() {
		this.showImg()
		// this.actionUrl = this.getUploadUrl('uploadImg')
		this.actionUrl = ''
	}
}
</script>

