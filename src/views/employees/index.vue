<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            v-isHas='point.employees.import'
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="addEmployees"
          v-if="isHas(point.employees.import)"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="emloyeesList">
          <el-table-column label="序号" type="index" sortable="" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/smallcaps.jpg')"
                :style="{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                }"
                :src="row.staffPhoto"
                alt=""
                @click="showQRcode(row.staffPhoto)"
              />
            </template>
          </el-table-column>

          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            :formatter="formatterOfEmployment"
            sortable=""
          />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="AssignRoleFn(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="removeEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pages.size"
            @current-change="changePage"
          />
        </el-row>

        <!-- 头像二维码 -->
        <AddEmployees
          :addEmployeesVisible.sync="addEmployeesVisible"
          @add-success="getEmployeesList"
        ></AddEmployees>
        <el-dialog
          title="头像二维码"
          :visible="showQRcodeDialog"
          @close="showQRcodeDialog = false"
        >
          <canvas id="canvas"></canvas>
        </el-dialog>

        <!-- 分配角色 -->
        <AssignRole
          :AssignRoleVisible.sync="AssignRoleVisible"
          :currentEmployeesId="currentEmployeesId"
        ></AssignRole>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeesListApi, getDeleteEmployeesApi } from "@/api/employees";
import AddEmployees from "./components/AddEmployees.vue";
import AssignRole from "./components/assign-role.vue";
import employees from "../../constant/employees";
import QRCode from "qrcode";
// import MixinPermission from "@/mixins/permission";
import MixinPermission from '@/mixins/permission'
const { exportExcelMapPath, hireType } = employees;
export default {
  mixins: [MixinPermission],
  data() {
    return {
      hireType,
      exportExcelMapPath,
      emloyeesList: [],
      pages: {
        page: 1,
        size: 10,
      },
      total: 0,
      addEmployeesVisible: false,
      showQRcodeDialog: false,
      AssignRoleVisible: false,
      currentEmployeesId: "",
    };
  },
  

  components: { AddEmployees, AssignRole },
  created() {
    this.getEmployeesList();
  },

  methods: {
    AssignRoleFn(id) {
      this.AssignRoleVisible = true;
      this.currentEmployeesId = id;
    },
    showQRcode(staffPhoto) {
      if (!staffPhoto) {
        return this.$message.error("此用户没有上传照片");
      }
      this.showQRcodeDialog = true;
      this.$nextTick(() => {
        const canvas = document.getElementById("canvas");
        QRCode.toCanvas(canvas, staffPhoto);
      });
    },
    async getEmployeesList() {
      const { rows, total } = await getEmployeesListApi(this.pages);
      this.emloyeesList = rows;
      this.total = total;
    },
    changePage(page) {
      this.pages.page = page;
      this.getEmployeesList();
    },
    formatterOfEmployment(row, column, cellValue, index) {
      const formatter = hireType.find((item) => {
        return item.id === cellValue;
      });
      return formatter ? formatter.value : "未知";
    },
    async removeEmployee(id) {
      await this.$confirm("确认删除吗");
      await getDeleteEmployeesApi(id);
      this.$message.success("删除成功");
    },
    addEmployees() {
      this.addEmployeesVisible = true;
    },
    async exportExcel() {
      const { rows, total } = await getEmployeesListApi({
        page: 1,
        size: this.total,
      });

      const header = Object.keys(exportExcelMapPath);
      // data数据
      const data = rows.map((item) => {
        return header.map((value) => {
          if (value === "聘用形式") {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[value]];
            });
            return findItem ? findItem.value : "未知";
          } else {
            return item[exportExcelMapPath[value]];
          }
        });
      });

      await import("@/vendor/Export2Excel").then((excel) => {
        excel.export_json_to_excel({
          header, //表头 必填
          data, //具体数据 必填
          filename: "员工列表", //非必填
          autoWidth: true, //非必填
          bookType: "xlsx", //非必填
        });
      });
    },
  },
};
</script>

<style scoped lang="less"></style>
