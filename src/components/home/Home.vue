<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="logo-box">
        <img src="../../assets/images/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="toggle_bar" @click="collapse=!collapse">|||</div>
        <!-- 左侧的menu菜单开始 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409dff" :unique-opened="true" :collapse="collapse" :collapse-transition="false" :router="true">
          <el-submenu :index="item.id + ''" v-for="(item, i) in menulist" :key="item.id" :style="collapse ? 'width: 64px' : 'width: 200px'">
            <template slot="title">
              <i :class="['iconfont', iconList[i]]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 如果要为el-menu-item 开启路由木事 需要 通过index 属性 作为路由要跳转的地址 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- 左侧的menu菜单结束 -->
      </el-aside>
      <!-- 主题区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mix from './Homemix.js'
export default {
  // 通过mixins 把外界导入过来的 行为 混入到 当前组件中
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header {
    background: #373d41;
    height: 60px;
    display: flex;
    // 左右贴边对齐
    justify-content: space-between;
    // 纵向内中居中
    align-items: center;
    padding: 0;
    padding-right: 20px;
    .logo-box {
      display: flex;
      color: white;
      font-size: 22px;
      align-items: center;
      // 禁止用户选中内容
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
}
.el-aside {
  background-color: #333744;
  user-select: none;
}

.el-main {
  background-color: #eaedf1;
}

.toggle_bar {
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  background-color: #4a5064;
  user-select: none;
  // 鼠标变成小手
  cursor: pointer;
  // 字体间距
  letter-spacing: 0.1em;
}
</style>
