<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            type="primary"
            @click="addDialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="70"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="角色"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="description"
              label="描述"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button size="small" type="success"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary"
                  >编辑</el-button
                >
                <el-button size="small" type="danger"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size="pageSize"
            :page-sizes="[1, 5, 10, 20]"
            layout="sizes,prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form
            label-width="120px"
            style="margin-top: 50px"
          >
            <el-form-item label="公司名称">
              <el-input
                v-model="formData.name"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="formData.companyAddress"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="formData.mailbox"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="formData.remarks"
                type="textarea"
                :rows="3"
                disabled
                style="width: 400px"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加角色对话框 -->
    <el-dialog
      @close="dialogClose"
      title="提示"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        ref="addRoleForm"
        :model="addRoleForm"
        :rules="addRoleFormRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="addRoleForm.region"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRolesApi, addRole } from '@/api/role'
import { getCompanyInfo } from '@/api/setting'

export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      pageSize: 2,
      total: null,
      page: '',
      // 角色管理 ============
      // 新增
      addDialogVisible: false,
      addRoleForm: {
        name: '',
        region: '',
      },
      addRoleFormRules: {
        name: [
          {
            required: true,
            message: '请输入',
          },
        ],
      },
      // 公司信息 ===================
      formData: {},
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    // 获取人员数据
    async getRoles() {
      try {
        const { rows, total } = await getRolesApi({
          page: this.page,
          pagesize: this.pageSize,
        })
        this.tableData = rows
        this.total = total
      } catch (err) {
        this.$message.error('获取数据失败，请重试')
      }
    },
    // 获取公司信息
    async getCompanyInfo() {
      try {
        this.formData = await getCompanyInfo(
          this.$store.state.user.userInfo.companyId
        )
      } catch (err) {
        console.log(err)
      }
    },
    // 改变每页展示的条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    // 改变每页 页码
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    // 新增确认按钮事件
    async onAddRole() {
      try {
        await this.$refs.addRoleForm.validate()
        await addRole(this.addRoleForm)
        this.$message.success('新增成功')
        this.addDialogVisible = false
        this.getRoles()
      } catch (err) {}
    },
    // 新增dialog 取消按钮事件
    onClose() {
      this.addDialogVisible = false
    },
    // 监听新增dialog关闭 触发事件
    dialogClose() {
      this.$refs.addRoleForm.resetFields()
      this.addRoleForm.region = ''
    },
  },
}
</script>

<style scoped lang="less"></style>
