<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div>
        <el-upload
          v-loading="loading"
          action="#"
          :limit="1"
          :file-list="fileList"
          :on-change="onChange"
          :on-preview="onPreview"
          :http-request="onRequest"
          list-type="picture-card"
          class="custon-add"
          :class="fileList.length == 1 ? 'hide' : ''"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="previewImgDialog">
          <img :src="imgUrl" style="width: 100%" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDDEzTifLN9fusa1B4g27vSihPq1D8m9G6',
  SecretKey: 'ZsufAOM3SaR2MQCixvc3C4fz3qMccLny',
})
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      fileList: [],
      previewImgDialog: false,
      imgUrl: '',
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['name']),
  },
  methods: {
    onRequest({ file }) {
      this.loading = true
      console.log(file)
      cos.putObject(
        {
          Bucket:
            'tree-1313341599' /* 填入您自己的存储桶，必须字段 */,
          Region:
            'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          if (err || data.statusCode !== 200) {
            return this.$message.error(
              '亲，上传失败，请重试'
            )
          }
          this.loading = false
        }
      )
    },
    onChange(file, filelist) {
      this.filelist = filelist
    },
    onPreview(file) {
      console.log(file)
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = [
        'image/jpeg',
        'image/gif',
        'image/bmp',
      ]
      if (!types.includes(file.type)) {
        this.$message.error(
          '上传图片只能是 JPG、GIF、BMP、PNG 格式!'
        )
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    },
  },
}
</script>

<style lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.hide .el-upload--picture-card {
  display: none;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.custon-add {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
