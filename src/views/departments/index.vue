<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card" v-loading='loading'>
        <!-- 用了一个行列布局 -->
        <TreeTools @add="addShow" :isRoot="true" :treeNode="company" />
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools @isEdit='showEdit' @add="addShow" @remove="loadDepts" :treeNode="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 弹层组件 -->
    <add-dept ref="addDept" @onSuccess='loadDepts' :isShow.sync="isShow" :currentDate="currentDate" />
  </div>
</template>

<script>
import TreeTools from "./components/treeTools.vue";
import { getDepts } from "@/api/departments";
import { transListToTree } from "@/utils/index";
import AddDept from "./components/addDept.vue";
export default {
  data() {
    return {
      treeData: [],
      defaultProps: {
        label: "name",
      },
      company: { name: "传智教育", manager: "负责人" },
      isShow: false,
      currentDate: {},
      loading:false
    };
  },

  created() {
    this.loadDepts();
  },

  methods: {
    async loadDepts() {
      this.loading=true
      const res = await getDepts();
      console.log(res);
      this.treeData = transListToTree(res.depts, "");
      this.loading=false
    },
    addShow(val) {
      this.isShow = true;
      this.currentDate = val;
    },
    showEdit(val){
      this.isShow=true
      this.$refs.addDept.getDeptById(val.id)
    }
  },
  components: {
    TreeTools,
    AddDept,
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
