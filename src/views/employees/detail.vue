<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="account">

            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="formData.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="user">
            <UserInfo></UserInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="info" />
            <JobInfo></JobInfo>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import { getUserDetailInfoApi, saveUserDetailInfoApi } from '@/api/user'
import Cookies from 'js-cookie'
export default {
  name: '',
  data() {
    return {
      activeName: Cookies.get('activeNameTab') || 'account',
      formData: {
        username: '',
        password: '',
      },
    }
  },
  components: { UserInfo, JobInfo },
  computed: {},
  created() {
    this.getUserDetailInfo()
  },
  mounted() {},
  methods: {
    async getUserDetailInfo() {
      const data = await getUserDetailInfoApi(this.$route.params.id)
      // console.log(data)
      this.formData = data
    },
    async onSave() {
      await saveUserDetailInfoApi(this.formData)
      this.$message.success('更新成功')
    },
    handleClick(val) {
      Cookies.set('activeNameTab', this.activeName)
    },
  },
  watch: {},
}
</script>
<style lang='less' scoped>
</style>