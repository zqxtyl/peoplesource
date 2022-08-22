<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :isShowLeft='false'>
        <template slot="right">
          <el-button @click="showAddDialog('0',1)">添加权限</el-button>
        </template>
      </PageTools>

      <el-table :data="permissions" ref="table" border style="width: 100%" row-key="id" default-expand-all>
        <el-table-column label="名称" width="180">
          <template v-slot='{row}'>
            <i class="el-icon-folder-opened" @click="isExpandFn(row)" style="margin-left:5px" v-if="row.hasOwnProperty('children')"></i>
            <span>{{row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot='{row}'>
            <el-button type="text" @click="showAddDialog(row.id,2)">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog :title="`${showText}权限点`" :visible="showDialog" @close="btnCancel">
      <!-- 表单 -->
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permission'
import { transListToTree } from '@/utils/index'

export default {
  data() {
    return {
      permissions: [],
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0', // 开启
      },
      showText: '添加',
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' },
        ],
      },
      showDialog: false,
    }
  },

  created() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      console.log(res)
      this.permissions = transListToTree(res, '0')
    },
    isExpandFn(row) {
      row.isExpand = !row.isExpand
      this.$refs.table.toggleRowExpansion(row, this.isExpand)
    },
    showAddDialog(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    btnCancel() {
      this.showDialog = false
    },
    btnOK() {
      this.$refs.perForm.validate(async (success) => {
        if (!success) {
          return
        }
        console.log('发送请求', this.formData)
        await addPermission(this.formData)
        this.$message.success('添加成功')
        this.showDialog = false
      })
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep.el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
