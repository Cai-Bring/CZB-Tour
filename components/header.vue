<template>
  <div class="top">
    <div class="header">
      <el-row type="flex" justify="space-between" align="middle" style="height:60px">
        <div class="logo">
          <img src="/logo.jpg" alt />
        </div>
        <el-row class="nav" type="flex">
          <Nuxt-link to="/">首页</Nuxt-link>
          <Nuxt-link to="/post/">旅游攻略</Nuxt-link>
          <Nuxt-link to="/hotel/">酒店</Nuxt-link>
          <Nuxt-link to="/air/">国内机票</Nuxt-link>
        </el-row>
        <div class="user">
          <el-dropdown v-if="$store.state.user.userInfo.token">
            <el-row type="flex" align="middle" class="el-dropdown-link">
              <nuxt-link to="#">
                <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
                {{$store.state.user.userInfo.user.nickname}}
              </nuxt-link>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-row>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <nuxt-link to="#">个人中心</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="handleLogout">退出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <Nuxt-link to="/user/login" v-else>登录/注册</Nuxt-link>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$confirm("您确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message.success("退出成功");
          this.$store.commit("user/setUserInfo", {});
        })
        .catch(() => {
          this.$message.info("已取消退出");
        });
    }
  }
};
</script>

<style scoped lang='less'>
.top {
  height: 60px;
  box-shadow: #cccccc 2px 2px 2px;
}
.header {
  width: 1000px;
  height: 60px;
  min-width: 1000px;
  margin: 0 auto;
  .logo {
    margin-right: 30px;
    img {
      display: block;
      width: 152px;
      height: 42px;
    }
  }
  .nav {
    flex: 1;
    a {
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      box-sizing: border-box;
      &:hover {
        border-bottom: 5px solid #409eff;
        color: #409eff;
      }
    }
    .nuxt-link-exact-active {
      background-color: #409eff;
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
  .user {
    font-size: 14px;
    a {
      color: #cccccc;
    }
    .el-dropdown-link {
      margin-left: 20px;

      &:hover {
        img {
          border-color: #409eff;
        }
      }

      a {
        display: block;
      }

      img {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        border: 2px #fff solid;
        border-radius: 50px;
      }
    }
  }
}
</style>