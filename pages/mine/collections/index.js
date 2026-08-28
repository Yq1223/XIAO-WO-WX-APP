/**
 * 我的收藏页面
 */
const userApi = require('../../../api/user')
const { formatTime } = require('../../../utils/util')

Page({
  data: {
    activeTab: 'post',
    postList: [],
    confessionList: [],
    itemList: [],
    loading: false,
    refreshing: false,
    listEmpty: true
  },

  onShow() {
    this.loadList()
  },

  onTabChange(e) {
    this.setData({ activeTab: e.detail.name })
    this.loadList()
  },

  async loadList() {
    this.setData({ loading: true })
    try {
      const res = await userApi.getCollections({
        type: this.data.activeTab,
        pageNum: 1,
        pageSize: 50
      })
      const list = (res.list || res || []).map(item => ({ ...item, createTimeText: formatTime(item.createTime) }))

      const { activeTab } = this.data
      if (activeTab === 'post') {
        this.setData({ postList: list, listEmpty: list.length === 0 })
      } else if (activeTab === 'confession') {
        this.setData({ confessionList: list, listEmpty: list.length === 0 })
      } else {
        this.setData({ itemList: list, listEmpty: list.length === 0 })
      }
    } catch (err) {
      console.error('加载收藏失败:', err)
    } finally {
      this.setData({ loading: false, refreshing: false })
    }
  },

  onPullDownRefresh() {
    this.setData({ refreshing: true })
    this.loadList()
  }
})
