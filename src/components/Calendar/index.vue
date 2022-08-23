<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear" @change="updateCalendar">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select v-model="currentMounth" @change="updateCalendar">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data: { day } }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      currentYear: "",
      currentMounth: "",
      years: [],
      currentDate: "",
    };
  },

  created() {
    this.inittes();
  },

  methods: {
    inittes() {
      const date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMounth = date.getMonth() + 1;
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i);
      this.currentDate = date;
    },
    isWeek(date){
        return date.getDay()==6||date.getDay()==0
    },
    updateCalendar(){
        this.currentDate=this.currentYear+'-'+this.currentMounth
    }
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none !important;
  }
}
.cell-box{
    color: green;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
