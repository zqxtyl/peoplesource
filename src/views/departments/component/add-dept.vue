<template>
  <el-dialog :title="formTitle" :visible="dialogVisible" width="50%" @close="onClose">
    <el-form ref="form" :model="formData" label-width="80px" :rules="formRules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入部门编码"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择部门负责人" style="width:100%">
          <el-option v-for="item in employeesSimpleList" :key="item.id" :value="item.username" :label='item.uername'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input type="textarea" v-model="formData.introduce" placeholder="1-300个字符"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  getDeptsApi,
  getDeptsInfoByIdApi,
  putEditDeptsInfoByIdApi,
} from '@/api/department'
import { getEmployeesSimpleApi, getAddDepartmentApi } from '@/api/employees'
export default {
  name: '',
  data() {
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur',
          },
          {
            trigger: 'blur',
            validator: async (rule, value, callback) => {
              const { depts } = await getDeptsApi()
              console.log(value, 'value')
              console.log(this.currentTreeNode)
              if (this.formData.id) {
                // 当前在编辑的条件下，此时不能跟他同级其他的重复

                const filterDepts = depts.filter((item) => {
                  return (
                    item.pid === this.formData.pid &&
                    item.id !== this.formData.id
                  )
                })
                const isRepeat = filterDepts.some((item) => {
                  return item.name === value
                })
                isRepeat ? callback(new Error('部门重复')) : callback()
              } else {
                // 此时在添加的状态下  要跟他的子级里面所有的depts比较  看是否有重复
                if (this.currentTreeNode.children) {
                  const isRepeat = this.currentTreeNode.children.some(
                    (item) => {
                      return item.name === value
                    }
                  )
                  isRepeat ? callback(new Error('部门重复')) : callback()
                } else {
                  callback(console.log('success'))
                }
              }
            },
          },
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur',
          },
          {
            trigger: 'blur',
            validator: async (rule, value, callback) => {
              const { depts } = await getDeptsApi()
              let isRepeat
              if (this.formData.id) {
                // 此时在编辑的状态下 修改编码时 除去自己的code 不能跟其他的重复
                isRepeat = depts
                  .filter((item) => {
                    return item.id !== this.formData.id
                  })
                  .some((item) => {
                    return item.code === value
                  })
              } else {
                // 此时在添加的状态下 不能跟其他所有的重复
                isRepeat = depts.some((item) => {
                  return item.code === value
                })
              }
              isRepeat ? callback(new Error('部门编码')) : callback()
            },
          },
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符',
            trigger: 'blur',
          },
        ],
      },
      employeesSimpleList: [],
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    currentTreeNode: {
      type: Object,
      required: true,
    },
  },
  components: {},
  computed: {
    formTitle() {
      return !!this.formData.id ? '编辑部门' : '添加部门'
    },
  },
  created() {
    this.getEmployeesSimple()
  },
  mounted() {},
  methods: {
    onClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.form.resetField()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      }
    },
    async getEmployeesSimple() {
      const res = await getEmployeesSimpleApi()
      //  console.log(res)
      this.employeesSimpleList = res
    },
    async onSave() {
      if (this.formData.id) {
        try {
          await putEditDeptsInfoByIdApi(this.formData.id, this.formData)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('remove')
        } catch (error) {
          this.$message.error('编辑失败,稍后再试')
        }
      } else {
        this.$refs.form.validate()
        this.formData.pid = this.currentTreeNode.id
        try {
          await getAddDepartmentApi(this.formData)
          this.$message.success('添加成功')
          this.$emit('update:dialogVisible', false)
        } catch (error) {
          this.$message.error('添加失败')
        }
      }
    },
    // 编辑时现实的弹出层 在此里面数据要回显
    async getDeptsInfoById(id) {
      const res = await getDeptsInfoByIdApi(id)
      this.formData = res
    },
  },
  watch: {},
}
</script>
<style  scoped>
</style>