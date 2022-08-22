<template>
  <el-dialog title="角色信息" :visible="AssignRoleVisible" width="30%" @close="onClose" @open='onOpen'>
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in rolesList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:AssignRoleVisible',false)">取 消</el-button>
      <el-button type="primary" @click="assignrolesFn">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getAllRolesApi, assignPerm } from '@/api/role'
import { getUserDetailInfoApi } from '@/api/user'
export default {
  name: '',
  data() {
    return {
      checkList: [],
      rolesList: [],
    }
  },
  props: {
    AssignRoleVisible: {
      type: Boolean,
      required: true,
    },
    currentEmployeesId: {
      type: String,
    },
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onClose() {
      this.$emit('update:AssignRoleVisible', false)
    },
    async getAllRolesList() {
      const roles = await getAllRolesApi()
      this.rolesList = roles.rows
      console.log(this.rolesList)
    },
    // 监听对话框打开的时候才调用
    onOpen() {
      this.getAllRolesList()
      this.getEmployeesRoles()
    },
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetailInfoApi(this.currentEmployeesId)
      this.checkList = roleIds
    },
    async assignrolesFn() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      const res = await assignPerm({
        id: this.currentEmployeesId,
        roleIds: this.checkList,
      })
      this.$message.success('成功添加')
      this.onClose()
    },
  },
  watch: {},
}
</script>
<style lang='less' scoped>
</style>
