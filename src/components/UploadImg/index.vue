<template>
  <div>
    <el-upload v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" action="#" list-type="picture-card" :http-request='onRequest' :on-remove="onRemove" :file-list='imageList' :on-preview="onPreview" :limit="1" :on-change='onChangeFn' :class="{hide:imageList.length>0}" class="custom-upload"
      :before-upload="beforeUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible="previewImgVisible" @close='onClose'>
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDVrzuc6LM8gz3sTowpTs2xdCYhgS0IL9i',
  SecretKey: 'MSJwLUO2RbXEgtrZ2FD0XquiHbfU4OTI',
})

export default {
  name: 'UploadImg',
  data() {
    return {
      imageList: [],
      previewImgVisible: false,
      imgUrl: '',
      loading: false,
    }
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onRequest({ file }) {
      this.loading = true
      console.log(file)
      cos.putObject(
        {
          Bucket: 'smallcaps-1313341571' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          // 如果err为null 表示没有错 false
          // 如果err不为null 表示有错 true
          if (err || data.statusCode !== 200) {
            console.log(err || data)
            return this.$message.error('上传图片失败')
          }
          // 拿回桶里的照片地址
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
          this.loading = false
        }
      )
      console.log('上传成功')
    },
    onChangeFn(file, fileList) {
      this.imageList = fileList
    },
    onRemove(file, fileList) {
      this.imageList = fileList
    },
    onPreview(file) {
      this.previewImgVisible = true
      this.imgUrl = file.url
    },
    onClose() {
      this.previewImgVisible = false
    },
    beforeUpload(file) {
      const types = ['image/gif', 'image/jpeg']
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!types.includes(file.type)) {
        this.$message.error(`上传头像图片只能是 ${types.join('或')}格式!`)
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return types.includes(file.type) && isLt2M
    },
  },
  watch: {},
}
</script>
<style lang='scss' >
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>