<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      />
    </div>
  </div>
</template>
<script>
import employees from '@/constant/employees.js'
import { importEmployee } from '@/api/employees'
const { importEmployeesMapKeyPath } = employees
export default {
  name: 'import',
  props: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = results.map(item => {
        let obj = {}
        for (let k in importEmployeesMapKeyPath) {
          obj[importEmployeesMapKeyPath[k]] = item[k]
        }
        return obj
      })
      await importEmployee(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    },
  },
  computed: {},
  watch: {},
  mounted() {},
  components: {},
}
</script>
<style scoped lang="less"></style>
