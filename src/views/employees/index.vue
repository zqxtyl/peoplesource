<template>
  <div class="dashboard-container">
    <div class="app-container" style="min-width: 1220px">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right-tag">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="exportExcel"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="showAddEmployees = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeesList">
          <el-table-column
            label="序号"
            sortable=""
            type="index"
          />
          <el-table-column
            label="姓名"
            sortable=""
            prop="username"
          />
          <el-table-column label="头像" align="center">
            <template slot-scope="{ row }" v-if="row">
              <img
                slot="reference"
                v-imgError="
                  require('@/assets/common/bigUserHeader.png')
                "
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                alt=""
                @click="showErCodeDialog1(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="工号"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatterFromMent"
          ></el-table-column>
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
          />
          <el-table-column
            label="部门"
            sortable=""
            prop="departmentName"
          />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch> </template
          ></el-table-column>
          <el-table-column
            label="操作"
            sortable=""
            fixed="right"
            width="280"
          >
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="
                  $router.push(
                    '/employees/detail/' + row.id
                  )
                "
                >查看</el-button
              >
              <el-button type="text" size="small"
                >转正</el-button
              >
              <el-button type="text" size="small"
                >调岗</el-button
              >
              <el-button type="text" size="small"
                >离职</el-button
              >
              <el-button type="text" size="small"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
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
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
    <add-empoyees
      :visible.sync="showAddEmployees"
      @add-success="getEmployeeInfo"
    ></add-empoyees>
    <el-dialog
      title="提示"
      :visible="showErCodeDialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEmployeeInfoApi,
  delEmployee,
} from '@/api/employees'
import addEmpoyees from './components/add-employees'
import employees from '@/constant/employees'
import QrCode from 'qrcode'
const { exportExcelMapPath, hireType } = employees
export default {
  data() {
    return {
      employeesList: [],
      showErCodeDialog: false,
      page: {
        page: 1, // 当前页码
        size: 10,
        total: 0, // 总数
      },
      showAddEmployees: false,
    }
  },

  created() {
    this.getEmployeeInfo()
  },

  methods: {
    async getEmployeeInfo() {
      try {
        const res = await getEmployeeInfoApi(this.page)
        this.employeesList = res.rows
        this.page.total = res.total
      } catch (err) {}
    },
    currentChange(val) {
      this.page.page = val
      this.getEmployeeInfo()
    },
    formatterFromMent(row, column, cellValue, index) {
      const findItem = employees.hireType.find(
        item => item.id == cellValue
      )
      return findItem ? findItem.value : '未知'
    },
    async deleteEmployee(id) {
      try {
        await this.$confirm(
          '是否删除该员工',
          '确认信息',
          {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消删除',
          }
        )
        await delEmployee(id)
        this.$$message.success('删除成功')
      } catch (err) {}
    },
    async exportExcel() {
      const { export_json_to_excel } = await import(
        '@/vendor/Export2Excel'
      )
      const { rows } = await getEmployeeInfoApi({
        page: 1,
        size: this.page.total,
      }) // 表头数据['手机号'，'姓名'，....]
      const header = Object.keys(exportExcelMapPath) // data数据
      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            const findItem = hireType.find(hire => {
              return (
                hire.id === item[exportExcelMapPath[h]]
              )
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data,
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
    },
    showErCodeDialog1(staffPhoto) {
      if (!staffPhoto)
        return this.$message.error('该用户还未设置头像')
      this.showErCodeDialog = true
      this.$nextTick(() => {
        QrCode.toCanvas(this.$refs.myCanvas, staffPhoto4) // 将地址转化成二维码
      })
    },
    handleClose(done) {
      this.showErCodeDialog = false
    },
  },
  components: {
    addEmpoyees,
  },
}
</script>

<style scoped lang="less"></style>
