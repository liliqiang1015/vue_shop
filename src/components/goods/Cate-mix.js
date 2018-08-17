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
      columns: [
        {
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
      ]
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 根据分页参数 查询分类列表数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('获取分类列表失败')
      this.cateList = res.data.result
      this.total = res.data.total
    },
    handleCurrentChange() {}
  }
}
