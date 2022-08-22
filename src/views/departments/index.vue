<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools :treeNode="company" :isRoot='true' @addDepts='dialogVisible=true'></TreeTools>
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all='true'>
          <template v-slot="{data}">
            <TreeTools :treeNode='data' @addDepts='showAddDepts' @remove='getDepts' @showEdit='showEdit'></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加子部门 -->
    <AddDepts ref="adddepts" :dialogVisible.sync='dialogVisible' :currentTreeNode='currentTreeNode'></AddDepts>
  </div>
</template>

<script>
import TreeTools from './component/tree-tools.vue'
import AddDepts from './component/add-dept.vue'
import { getDeptsApi } from '@/api/department'
// import ItemVue from '@/layout/components/Sidebar/Item.vue'
export default {
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],

      defaultProps: {
        children: 'children',
        label: 'name',
      },
      company: { name: '总裁办', children: [{ name: '董事会' }] },
      dialogVisible: false, // 控制添加弹层是否显示
      currentTreeNode: {},
    }
  },
  components: { TreeTools, AddDepts },
  created() {
    this.getDepts()
  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async getDepts() {
      const res = await getDeptsApi()
      // console.log(res)
      this.treeData = this.transListToTree(res.depts, '')
    },
    transListToTree(data, pid) {
      const arr = []
      data.forEach((Item) => {
        if (Item.pid === pid) {
          const children = this.transListToTree(data, Item.id)
          if (children.length) {
            Item.children = children
          }
          arr.push(Item)
        }
      })
      return arr
    },
    showAddDepts(treeNode) {
      this.dialogVisible = true
      this.currentTreeNode = treeNode
    },
    showEdit(treeNode) {
      this.currentTreeNode = treeNode
      this.dialogVisible = true
      this.$refs.adddepts.getDeptsInfoById(treeNode.id)
    },
  },
}
</script>

<style scoped lang="less"></style>
