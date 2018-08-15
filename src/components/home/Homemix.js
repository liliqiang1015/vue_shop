export default {
  data() {
    return {
      // 左侧菜单列表的数据
      menulist: [],
      // 所有图标的对应类名数组
      iconList: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
      // 左侧菜单是否折叠 默认不折叠
      collapse: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('获取左侧菜单失败')
      this.menulist = res.data
    }
  }
}
