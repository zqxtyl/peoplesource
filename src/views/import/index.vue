<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel :beforeUpload='beforeUpload' :onSuccess='onSuccess'></UploadExcel>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/filters'
import { importEmployeeApi } from '@/api/employees'
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
export default {
  data() {
    return {
      importMapKeyPath,
    }
  },

  created() {},

  methods: {
    beforeUpload({ name }) {
      if (name.endsWith('.xlsx')) {
        return true
      }
      this.$message.error('请选择正确的文件')
      return false
    },
    async onSuccess({ header, results }) {
      //   console.log(header, results)
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in item) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            // 转换
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      console.log(newArr)
      await importEmployeeApi(newArr)
      this.$message.success('导入成功')
      this.$router.back(1)
    },
  },
}
</script>

<style scoped lang="less"></style>
