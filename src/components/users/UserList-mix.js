export default {
  data() {
    // 自定义邮箱校验的规则
    const ckeckEmail = (rule, value, callback) => {
      if (!value.trim()) return callback(new Error('请添加邮箱'))
      if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
      }
    }
    return {
      // 用户列表数据 默认为空
      userList: [],
      // 查询参数对象
      quertInfo: {
        // 搜索条件
        query: '',
        // 当前展示的是第几页的数据
        pagenum: 1,
        // 每页显示多少调数据
        pagesize: 2
      },
      // 总记录条数
      total: 0,
      // 控制添加对话框显示和隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [{
          require: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          require: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        email: [{validtor: ckeckEmail, trigger: 'blur'},
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [{
          require: true,
          message: '请输入用户名',
          trigger: 'blur'
        }]
      },
      // 控制 编辑对话框是否展示
      editDialogVisible: false,
      // 编辑表单的数据对象
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // 编辑表单的验证规则对象
      editFormRules: {
        email: [{validtor: ckeckEmail, trigger: 'blur'},
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [{
          require: true,
          message: '请输入用户名',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const {
        data: res
      } = await this.$http.get('users', {
        params: this.quertInfo
      })
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      // 把用户数据 保存到 userList 中
      this.userList = res.data.users
    },
    // 每当 pagesize改变 都会触发这个函数
    handleSizeChange(newSize) {
      this.quertInfo.pagesize = newSize
      this.getUserList()
    },
    // 每当页码值改变 都会触发这个函数
    handleCurrentChange(newpage) {
      this.quertInfo.pagenum = newpage
      this.getUserList()
    },
    async stateChanged(id, state) {
      const {data: res} = await this.$http.put(`users/${id}/state${state}`)
      if (res.meta.status !== 200) {
        return this.$message.error('修改用户状态失败')
      }
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addUser() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        // 关闭对话框
        this.addDialogVisible = false
        // 刷新用户列表
        this.getUserList()
      })
    },
    async remove(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 如果用户取消了删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }

      // 如果点击了删除
      const {
        data: res
      } = await this.$http.delete('uers/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除用户失败')
      this.$message.success('删除用户成功')
      // 此时 只要把当前页面上 唯一的一条数据 从数据库中删除了 但是 userList的长度还为1 
      if(this.userList.length === 1 && this.quertInfo.pagenum > 1) {
        this.quertInfo.pagenum --
      }
      this.getUserList()
    },
    // 点击按钮展示编辑对话框
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('查询用户失败')
      // 把查询到的数据 直接复制给 editForm
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 编辑对话框关闭 触发这个函数
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击按钮保存对用户信息的修改、
    savaUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.put('users/' + this.editForm.id, {
          mobile: this.editForm.mobile,
          email: this.editForm.email
        })

        if (res.meta.status !== 200) return this.$message.error('编辑用户失败')
        this.$message.success('编辑用户成功')
        this.getUserList()
        this.editDialogVisible = false
      })
    }
  }
}
