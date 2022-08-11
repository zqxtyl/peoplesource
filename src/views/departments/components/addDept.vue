<template>
  <el-dialog :title="newTitle" @close="onClose" :visible="isShow" width="50%">
    <el-form ref="from" label-width="100px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="输入部门编码"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择部门负责人"
        >
          <el-option
            :label="item.username"
            v-for="item in List"
            :key="item.id"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDepts, addDepartment, getDeptById ,updateDepartment} from "@/api/departments";
import { getEmployeesApi } from "@/api/employees";
export default {
  data() {
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDepts();
        const filtersDepts = depts.filter(
          (item) => item.pid === this.formData.pid && item.id !== value
        );
        const isRepeat = filtersDepts.some((item) => item.name == value);
        isRepeat ? callback(new Error("部门重复")) : callback();
      } else {
        if (!this.currentDate.children.length == 0) return callback();
        const isRepeat = this.currentDate.children.some(
          (item) => item.name === value
        );
        isRepeat ? callback(new Error("部门重复")) : callback();
      }
    };
    const checkDeptCode = async (rule, value, cb) => {
      const { depts } = await getDepts();
      let isRepeat;
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value);
      } else {
        isRepeat = depts.some((item) => item.code === value);
      }

      isRepeat ? cb(new Error("部门编码重复")) : cb();
    };
    return {
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      rules: {
        name: [
          { required: true, trigger: "blur", message: "格式不正确" },
          { validator: checkDeptName, trigger: "blur" },
        ],
        code: [
          { required: true, trigger: "blur", message: "格式不正确" },
          { validator: checkDeptCode, trigger: "blur" },
        ],
        manager: [{ required: true, trigger: "change", message: "格式不正确" }],
        introduce: [{ required: true, trigger: "blur", message: "格式不正确" }],
      },
      List: [],
    };
  },

  created() {
    this.getEmployeesApi();
  },

  methods: {
    async getEmployeesApi() {
      const res = await getEmployeesApi();
      // console.log(res);
      this.List = res;
    },
    onClose() {
      this.$emit("update:isShow", false);
      this.$refs.from.resetFields();
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
    },
    async onSave() {
      if (this.formData.id) {
        //编辑
        await updateDepartment(this.formData)
        this.$message.success('更新成功')
        this.onClose()
        this.$emit('onSuccess')
      } else {
        await this.$refs.from.validate();
        this.formData.pid = this.currentDate.id;
        await addDepartment(this.formData);
        this.$message.success("添加成功");
        this.$emit("onSuccess");
        this.$emit("update:isShow", false);
        this.formData = {
          name: "",
          code: "",
          manager: "",
          introduce: "",
        };
      }
    },
    async getDeptById(val) {
      this.formData = await getDeptById(val);
    },
  },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    currentDate: {
      type: Object,
      required: true,
    },
  },
  computed: {
    newTitle() {
      return this.formData.id ? "编辑" : "新增";
    },
  },
};
</script>

<style scoped></style>
