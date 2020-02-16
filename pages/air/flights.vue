<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :flightdata="flightdata" @gogogo="gogogo"></FlightsFilters>

        <!-- 航班头部布局 -->
        <FlightsListHead></FlightsListHead>

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in List" :key="index" :data="item"></FlightsItem>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <FlightsAside></FlightsAside>
      <!-- 侧边栏组件 -->
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  data() {
    return {
      flightdata: {
        info: {},
        options: {},
        flights: []
      },
      dataList: [],
      total: 0,
      pageIndex: 1,
      pageSize: 5
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        // console.log(res);
        this.flightdata = res.data;
        this.total = res.data.total;
        this.dataList = res.data.flights;
      });
    },
    handleSizeChange(index) {
      this.pageSize = index;
      console.log(this.List);
    },
    handleCurrentChange(index) {
      this.pageIndex = index;
    },
    // 接收从头部选择后返回的数据
    gogogo(send) {
      // console.log(send);
      this.dataList = send;
      this.total = send.length;
    }
  },
  computed: {
    List() {
      if (!this.dataList) {
        return [];
      }
      let arr = this.dataList.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
  // 使用beforeRouteUpdate监听侧边栏的变化
  beforeRouteUpdate(to, from, next) {
    this.pageIndex = 1;
    next();
    this.getList();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>