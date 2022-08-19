<template>
  <el-dialog
    title="提示"
    :visible="visible"
    @close="onClose"
  >
    <el-form
      :model="formData"
      :rules="rules"
      label-width="200px"
      ref="form"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 70%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 70%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 70%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item
        label="聘用形式"
        prop="formOfEmployment"
      >
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 70%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 70%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          @focus="getDepts"
          style="width: 70%"
          v-model="formData.departmentName"
          placeholder="请选择部门"
          ref="treeForm"
        >
          <el-option
            value=""
            v-loading="treeLoading"
            class="treeOption"
          >
            <el-tree
              @node-click="treeNodeClick"
              :data="depts"
              :props="treeProps"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="转正时间"
        prop="correctionTime"
      >
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 70%"
          placeholder="请选择日期"
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
import EmployeeEnum from '@/constant/employees'
import {
  getDepartments,
  getDeptsApi,
} from '@/api/departments'
import { addEmployee } from '@/api/employees'
import { fn } from '@/utils'
export default {
  name: 'add-employees',
  props: {
    visible: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  data() {
    return {
      EmployeeEnum, // 在data中定义数据
      // 表单数据
      treeData: [], // 定义数组接收树形数据
      loading: false, // 控制树的显示或者隐藏进度条
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户姓名不能为空',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位',
          },
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur',
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        formOfEmployment: [
          {
            required: true,
            message: '聘用形式不能为空',
            trigger: 'change',
          },
        ],
        workNumber: [
          {
            required: true,
            message: '工号不能为空',
            trigger: 'blur',
          },
        ],
        departmentName: [
          {
            required: true,
            message: '部门不能为空',
            trigger: 'change',
          },
        ],
        timeOfEntry: [
          {
            required: true,
            message: '入职时间',
            trigger: 'blur',
          },
        ],
      },
      depts: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
      ],
      treeProps: {
        label: 'name',
      },
      treeLoading: false,
    }
  },
  created() {},
  methods: {
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
    },
    async getDepts() {
      this.treeLoading = true
      try {
        const { depts } = await getDeptsApi()
        fn(depts, '')
        this.depts = depts
      } catch (err) {
        console.log(err)
      }
      this.treeLoading = false
    },
    treeNodeClick(row) {
      console.log(row)
      this.formData.departmentName = row.name
      this.$refs.treeForm.blur()
    },
    onSave() {
      this.$refs.form.validate(async vali => {
        if (!vali) return
        await addEmployee()
        this.$message.success('添加成功')
        this.onClose()
        this.$emit('add-success')
      })
    },
  },
  computed: {},
  watch: {},
  mounted() {},
  components: {},
}
</script>
<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover.el-select-dropdown__item {
  background-color: #fff;
  overflow: unset;
}
.treeOption {
  height: 90px;
}
</style>
