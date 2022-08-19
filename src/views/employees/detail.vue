<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane label="登录账户设置" name="first">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
              :model="formData"
            >
              <el-form-item label="姓名:">
                <el-input
                  style="width: 300px"
                  v-model="formData.username"
                />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="saveUser"
                  >更新</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <userInfo1 />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <jobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { userInfo } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import userInfo1 from './components/user-info'
import Cookies from 'js-cookie'
import jobInfo from './components/job-info'
export default {
  name: 'detail',
  props: {},
  data() {
    return {
      activeName: Cookies.get('active') || 'first',
      formData: {},
    }
  },
  created() {
    this.loadFormData()
  },
  methods: {
    async loadFormData() {
      const res = await userInfo(this.$route.params.id)
      console.log(res)
      this.formData = res
    },
    async saveUser() {
      try {
        // 校验
        await saveUserDetailById(this.formData) // 将新密码的值替换原密码的值
        this.$message.success('保存成功')
      } catch (error) {
        console.log(error)
      }
    },
    handleClick() {
      Cookies.set('active', this.activeName)
    },
  },
  computed: {},
  watch: {},
  mounted() {},
  components: { userInfo1, jobInfo },
}
</script>
<style scoped lang="less"></style>
