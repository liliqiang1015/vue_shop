<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
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
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>

        <!-- 自定义opt 模板列 -->
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.cat_id)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="remove(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 添加分类的表格 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <!-- 父级分类不需要设置成必填项 -->
        <el-form-item label="父级分类：">
          <el-cascader expand-trigger="hover" :options="parentCateList" :props="cascaderProp" v-model="selectedCateList" @change="cascaderChange" change-on-select clearable style="width: 100%">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类对话框 -->
    <el-dialog title="修改分类" :visible.sync="editCateDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="活动名称" prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCateInfo">确 定</el-button>
      </span>
    </el-dialog>

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
