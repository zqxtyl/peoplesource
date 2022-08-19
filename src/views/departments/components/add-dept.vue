<template>
  <el-dialog
    :title="showTitle"
    :visible="visible"
    width="50%"
    @click="onClose"
  >
    <el-form
      label-width="120px"
      :model="formData"
      :rules="formRules"
      ref="form"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
        /></el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSave" type="primary"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { getEmployeeSimple } from '@/api/employees'
import {
  getDepartDetail,
  updateDepartments,
  addDepartment
} from '@/api/departments'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    currentDept: {
      type: [Object, String],
      required: true,
    },
  },
  data() {
    return {
      peoples: [], //员工
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '请输入' },
          {
            validator: async (rule, value, callback) => {
              if (this.formData.id) {
                const  depts = await getEmployeeSimple()
                console.log(depts);
                const filterDepts = depts.filter(item => {
                  item.pid === this.formData.pid &&
                    item.id !== this.formData.id
                })
                const isRepeat = filterDepts.some(
                  item => item.name === value
                )
                isRepeat
                  ? callback(new Error('部门重复'))
                  : callback()
              } else {
                if (!this.currentDept.children)
                  return callback()
                const isRepeat =
                  this.currentDept.children.some(
                    item => item.name === value
                  )
                isRepeat
                  ? callback(new Error('部门重复'))
                  : callback()
              }
            },
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
          {
            validator: async (rule, value, callback) => {
              // 先要获取最新的组织架构数据
              //  检查重复规则 需要支持两种 新增模式 / 编辑模式
              const  depts  = await getEmployeeSimple()
              let isRepeat = false
              if (this.formData.id) {
                // 编辑模式  因为编辑模式下 不能算自己
                isRepeat = depts.some(
                  item =>
                    item.id !== this.formData.id &&
                    item.code === value &&
                    value
                )
              } else {
                // 新增模式
                isRepeat = depts.some(
                  item => item.code === value && value
                ) // 这里加一个 value不为空 因为我们的部门有可能没有code
              }
              isRepeat
                ? callback(
                    new Error(
                      `组织架构中已经有部门使用${value}编码`
                    )
                  )
                : callback()
            },
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getEmployeeSimple()
  },
  methods: {
    // 获取员工简单列表数据
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      }
      this.$emit('update:showDialog', false)
    },
     onSave() {
      this.$refs.form.validate(async isOK => {
        if (isOK) {
          // 要分清楚现在是编辑还是新增
          if (this.formData.id) {
            // 编辑模式  调用编辑接口
            await updateDepartments(this.formData)
          } else {
            // 新增模式
            await addDepartment({
              ...this.formData,
              pid: this.currentDept.id,
            }) // 调用新增接口 添加父部门的id
          }
          // // 表示可以提交了
          // this.$emit('addDepts') // 告诉父组件 新增数据成功 重新拉取数据
          // // update:props名称
          // this.$emit('update:showDialog', false)
        }
      })
    },
    async showDept(id) {
      this.formData = await getDepartDetail(id)
    },
    // 获取部门详情
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },
  watch: {},
  mounted() {},
  components: {},
}
</script>
<style scoped lang="less"></style>
