<template>
    <el-container class="home-container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
    .el-header {
      background: #373d41;
      height: 60px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>

