<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="card-container" 
      v-loading='loading'
      >
        <!-- 头部 -->
        <treeTools :treeNode="company" />
        <el-tree
          @add="showAddDpet"
          :isRoot="false"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
        >
          <template v-slot="{ data }">
            <treeTools
              @add="showAddDpet"
              :treeNode="data"
              @remove="getDepts"
              @edit="editDepts" 
              
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <add-dept
      ref="addDept"
      :visible.sync="dialogVisible"
      :currentDept="currentDept"
    />
  </div>
</template>
<script>
import treeTools from './components/tree-tools'
import AddDept from './components/add-dept'
import { getDeptsApi } from '@/api/departments'
import { fn } from '@/utils'
export default {
  data() {
    return {
      defaultProps: {
        label: 'name',
      },
      treeData: [
        {
          name: '总裁办',
          children: [{ name: '董事会' }],
        },
        { name: '行政部' },
        { name: '人事部' },
      ],
      company: { name: '总裁办', manager: '负责人' },
      dialogVisible: false,
      currentDept: '',
      currentNode:'',
      loading:false,
    }
  },
  created() {
    this.getDepts()
  },
  methods: {
    async getDepts() {
      this.loading = true
      const res = await getDeptsApi()
      console.log(res)
      this.treeData = fn(res.depts, '')
      this.loading = false
    },
    showAddDpet(val) {
      this.currentDept = val
      console.log(this.currentDept)
      this.dialogVisible = true
    },
    editDepts(node) {
     console.log(node);
     this.dialogVisible = true
     this.$refs.addDept.showDept(node.id)
    //  this.currentNode = node // 赋值操作的节点
    }
  },
  components: {
    treeTools,
    AddDept,
  },
}
</script>

<style scoped lang="less"></style>
