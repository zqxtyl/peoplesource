<template>
   <div class="dashboard-container">
    <div class="app-container">
      <!-- 查询 -->
	  <div class="search">
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
          <el-form-item label="订单编号" class="searchInput">
            <el-input
            v-model="searchInfo.order"
              placeholder="请输入订单编号"
            ></el-input>
          </el-form-item>
          <el-form-item class="time" label="选择日期">
         <div class="block">
           <span class="demonstration"></span>
          <el-date-picker
           v-model="searchInfo.value1"
           type="datetimerange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
          </el-date-picker>
         </div>
            </el-time-select>
          </el-form-item>
          <el-button @click="search" class="searchBtn" type="primary" icon="el-icon-search">查询</el-button>
        </el-form>
      </div>
    <!-- 表格 -->
    <el-table
      :data="
        orderList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
    >
      <el-table-column
     label="序号" type="index" :index="hIndex"
      width="70">
    </el-table-column>
    <el-table-column
      property="orderNo"
      label="订单编号"
      width="220">
    </el-table-column>
    <el-table-column
      property="skuName"
      label="商品名称"
        width="150">
    </el-table-column>
      <el-table-column
      property="price"
      label="订单金额（元）" 
      width="150">
    </el-table-column>
      <el-table-column

      property="innerCode"
      label="设备编号"
       width="170">
    </el-table-column>
      <el-table-column

      property="payStatus"
      label="订单状态" 
      width="150">
    </el-table-column >
      <el-table-column
      property="createTime"
      label="订单日期" 
      width="170">
    </el-table-column>
    <el-table-column
      label="操作"
      width="70">
        <el-button
          @click=""
          type="text"
          size="small">
          查看详情
        </el-button>
    </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block1" style="margin-top: 15px">
      <div class="total">
        <span>共{{totalCount}}条记录，第{{currentPage}}/{{totalPage}}页</span>
      </div>
      <el-pagination
        v-show="false"
        align="center"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="orderList.length"
      >       
      </el-pagination>
     <div >
        <el-button @click="previousPage">上一页</el-button>
        <el-button @click="nxetPage">下一页</el-button>
     </div>
    </div>
	</div>
  </div>
</template>

<script>
import { getOrderList } from "@/api/table.js";

export default {
  data() {
    return {
      orderList: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      searchInfo: {
        order: "",
        value1: "",
      },
      //总的页码
      totalCount: "",
      totalPage: "",
    };
  },
  created() {
    this.getOrderList1();
  },
  computed: {},
  methods: {
    async getOrderList1() {
      const obj = {
        pageIndex: this.currentPage,
        pageSize: 10,
        orderNo: "",
        startDate: "",
        endDate: "",
      };
      const { data } = await getOrderList(obj);
      const { totalCount, totalPage } = data;
      (this.totalCount = totalCount), (this.totalPage = totalPage);
      this.orderList.push(...data.currentPageRecords);
    },
    hIndex(index) {
      return index + 1;
    },
    // 上一页
    previousPage() {
      if (this.currentPage == 1) {
        return;
      }
      this.currentPage--;
    },
    // 下一页
    nxetPage() {
      console.log(1);
      this.currentPage++, this.getOrderList1();
    },
    // 查询
    async search() {
      console.log(this.searchInfo.order);
      const obj = {
        pageIndex: this.currentPage,
        pageSize: 10,
        orderNo: this.searchInfo.order,
        startDate: "",
        endDate: "",
      };
      const { data } = await getOrderList(obj);
      this.orderList = data.currentPageRecords;
      console.log(res);
    },
  },
};
</script>


<style scoped lang="less">
.block1 {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 32px 16px;
  width: 1150px;
  .total {
    display: inline-block;
    font-size: 15px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    color: #dbdfe5 !important;
  }
}
.dashboard-container {
  background-color: #f8fafd;
  width: 100%;
  height: 914px;
}
.searchInput {
  margin-top: 15px;
}
.search {
  width: 100%;
  height: 64px;
  background-color: #fff !important;
  display: flex;
  margin-bottom: 20px;
  .demo-form-inline {
    /deep/.order {
      margin-left: 10px;
      line-height: 35px;
      height: 36px;
      margin-top: 15px;

      label {
        text-align: right;
        font-size: 14px;
        color: #606266;
        font-weight: 400;
      }
    }
    .time {
      height: 40px;
      margin-top: 15px;
      label {
        text-align: right;
        font-size: 14px;
        color: #606266;
        font-weight: 400 !important;
      }
    }
    .searchBtn {
      margin-top: 16px;
      width: 80px;
      height: 36px;
      padding: 0;
      background-color: #5f84ff;
      border: none;
    }
  }
}
</style>
