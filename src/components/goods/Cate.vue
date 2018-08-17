<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary">添加分类</el-button>
      <tree-table style="margin-top: 15px" :data="cateList" :columns="columns" border :selection-type="false" :expand-type="false" show-index index-text="#">
        <!-- 定义一个模板 -->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-circle-check" style="color: #20b2aa" v-if="scope.row.cat_deleted === false"></i>
          <i class="el-icon-circle-close" tyle="color: red" v-else></i>
        </template>
        <!-- 自定义 order 模板列 -->
        <template slot-scope="scope" slot="order">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>一级</el-tag>
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </el-card>

    <!-- 添加分类的表单 -->
    <!-- <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
import mix from './Cate-mix.js'

export default {
  mixins: [mix]
}
</script>

<style>
</style>
