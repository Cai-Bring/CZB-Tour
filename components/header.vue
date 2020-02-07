<template>
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
        <Nuxt-link to="/user/login">登录/注册</Nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
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
  }
}
</style>