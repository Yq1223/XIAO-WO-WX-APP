Component({
  data: {
    active: 0,
    list: [
      { url: '/pages/index/index' },
      { url: '/pages/community/community' },
      { url: '/pages/market/market' },
      { url: '/pages/service/service' },
      { url: '/pages/mine/mine' }
    ]
  },
  methods: {
    onChange(e) {
      const index = e.detail
      this.setData({ active: index })
      wx.switchTab({
        url: this.data.list[index].url
      })
    }
  },
  pageLifetimes: {
    show() {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      if (!currentPage) return
      const route = '/' + currentPage.route
      const index = this.data.list.findIndex(item => item.url === route)
      if (index !== -1) {
        this.setData({ active: index })
      }
    }
  }
})
