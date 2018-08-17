export default {
  data() {
    return {
      // 查询分类列表时候的参数项
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 总数据条数
      total: 0,
      // 商品分类列表
      cateList: [],
      // 定义表格中 都有哪些列
      columns: [{
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          // 这一列，使用自定义模板进行渲染
          type: 'template',
          // 指定要使用哪个模板
          template: 'isok'
        },
        {
          label: '排序',
          prop: 'cat_level',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt',
          width: '200px'
        }
      ],
      // 控制添加分类的显示和隐藏
      addCateDialogVisible: false,
      // 添加分类的数据对象
      addForm: {
        // 父级分类id 默认为0 表示要添加的是1级分类
        cat_pid: 0,
        // 分类名称
        cat_name: '',
        // 即将要添加的分类 level 等级
        cat_level: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        cat_name: [{
          require: true,
          message: '请输入添加分类名称',
          trigger: 'blur'
        }]
      },
      // 父级分类列表
      parentCateList: [],
      // 级联选择框的配置对象
      cascaderProp: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 被选中的 父级分类id 都会存储到这个数组中
      selectedCateList: [],
      // 控制编辑分类的显示与隐藏
      editCateDialogVisible: false,
      // 编辑表单数据
      editForm: {
        cat_name: ''
      },
      // 验证规则
      editFormRules: {
        cat_name: [{
          require: true,
          message: '请输入添加分类名称',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 根据分页参数 查询分类列表数据
    async getCateList() {
      const {
        data: res
      } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('获取分类列表失败')
      this.cateList = res.data.result
      this.total = res.data.total
    },
    // 每当页码值改变 都触发 这个函数
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    // 显示添加分类的对话框
    async showAddCateDialog() {
      // 先获取所有1,2级分类
      const {data: res} = await this.$http.get('categories', {
        params: {type: 2}
      })
      if(res.meta.status !== 200) return this.$message.error('获取父级分类失败')
      this.parentCateList = res.data
      this.addCateDialogVisible = true
    },
    // 只要级联选择框的选中值发生了变化都会触发这个事件
    cascaderChange() {
      // 如果没有选择父级分类 则把父级分类id重置为0
      if(this.selectedCateList.length === 0) {
        // 一级分类的父id 为0
        this.addForm.cat_pid = 0
        // 要添加的一级分类
        this.addForm.cat_level = 0
      } else {
        // 如果数组不为空 则把数组最后一项的值 当做父级分类的id
        this.addForm.cat_pid = this.selectedCateList[this.selectedCateList.length - 1]
        // 设置分类的等级
        this.addForm.cat_level = this.selectedCateList.length
      }
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
      // 清空父级分类的选中项
      this.selectedCateList = []
      // 把曾经记录的腹肌分类id 重置为0
      this.addForm.cat_pid = 0
      this.addForm.cat_level = 0
    },
    addCate() {
      this.$refs.addFormRef.validate(async vaild => {
        if(!vaild) return

        const {data: res} = await this.$http.post('categories', this.addForm)
        if(res.meta.status !== 201) return this.$message.error('添加分类失败')
        this.$message.success('添加分类成功')
        this.addCateDialogVisible = false
        this.getCateList()
      })
    },
    // 展示编辑的对话框
    async showEditDialog(id) {
      const {data: res} = await this.$http.get('categories/' + id)
      if(res.meta.status !== 200) return this.$message.error('获取数据失败')
      this.editForm = res.data
      this.editCateDialogVisible = true
    },
    // 编辑对话框 关闭重置表单
    editDialogClosed() {
      this.$refs.editFormRef.setetFields()
    },
    saveCateInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if(!valid) return
        const {data: res} = await this.$http.put('categroies/' + this.editForm.cat_id, {
          cat_name: this.editForm.cat_name
        })

        if(res.meta.status !== 200) return this.$message.error('更新分类失败')
        this.$message.success('更新分类成功')
        this.editCateDialogVisible = false
        this.getCateList()
      })
    },
    async remove(id) {
      // 询问是否要删除
      const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 不删除
      if(confirmResult !== 'confirm') {
        return  this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }

      const {data: res} = await this.$http.delete('categroies/' + id)
      if(res.meta.status !== 200) return this.$message.error('删除分类失败')
      this.$message.success('删除分类成功')
      this.getCateList()
    }
  }
}
