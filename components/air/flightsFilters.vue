<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{flightdata.info.departCity}} - {{flightdata.info.destCity}}
        /
        {{flightdata.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in flightdata.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in flightdata.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in flightdata.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            :label="item.name"
            :value="item.size"
            v-for="(item,index) in sizeOptions"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <span>{{cheackAll}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  props: {
    flightdata: {
      type: Object,
      // 默认是空数组
      default: () => {}
    }
  },
  computed: {
    cheackAll() {
      const arr = this.flightdata.flights.filter(v => {
        let ischeack = true;
        if (this.airport && v.org_airport_name !== this.airport) {
          ischeack = false;
        }
        if (this.flightTimes) {
          const minhour = +this.flightTimes.split(",")[0];
          const maxhour = +this.flightTimes.split(",")[1];
          const hour = +v.dep_time.split(":")[0];
          if (minhour > hour || maxhour <= hour) {
            ischeack = false;
          }
        }
        if (this.company && v.airline_name !== this.company) {
          ischeack = false;
        }
        if (this.airSize && v.plane_size !== this.airSize) {
          ischeack = false;
        }
        return ischeack;
      });
      this.$emit("gogogo", arr);
      return "";
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      // const arr = this.flightdata.flights.filter(v => {
      //   return v.org_airport_name === value;
      // });
      // //   console.log(arr);
      // this.$emit("gogogo", arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // const minhour = +value.split(",")[0];
      // const maxhour = +value.split(",")[1];
      // //   console.log(hour);
      // const arr = this.flightdata.flights.filter(v => {
      //   const hour = +v.dep_time.split(":")[0];
      //   return minhour <= hour && maxhour > hour;
      // });
      // this.$emit("gogogo", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // const arr = this.flightdata.flights.filter(v => {
      //   return v.airline_name === value;
      // });
      // // console.log(arr);
      // this.$emit("gogogo", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      // const arr = this.flightdata.flights.filter(v => {
      //   return v.plane_size === value;
      // });
      // //   console.log(arr);
      // this.$emit("gogogo", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      (this.airport = ""), // 机场
        (this.flightTimes = ""), // 出发时间
        (this.company = ""), // 航空公司
        (this.airSize = "");
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>