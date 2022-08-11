<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px; width:100%">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown >
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add" @click.native="$emit('add',treeNode)">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit" @click.native="$emit('isEdit',treeNode)">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del" @click.native="onRemove">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- 右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
import {deleteDepts} from '@/api/departments'
export default {
  data() {
    return {};
  },

  created() {},

  methods: {
   async onRemove(){
      try {
        await this.$confirm('确定删除吗？','提示',{
          confirmButtonText:'删除',
          cancelButtonClass:'取消',
          type:'warning'
        })
        await deleteDepts(this.treeNode.id)
        this.$message.success('删除成功')
        this.$emit('remove')
      } catch (error) {
        console.log(error);
      }
    }
  },
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
