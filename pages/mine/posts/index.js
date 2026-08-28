/**
 * 我的发布页面
 */
const userApi = require('../../../api/user')
const marketApi = require('../../../api/market')
const { formatTime, showToast, showConfirm } = require('../../../utils/util')

const app = getApp()

Page({
  data: {
    activeTab: 'post',
    postList: [],
    confessionList: [],
    itemList: [],
    loading: false,
    refreshing: false
  },

  onShow() {
    this.loadList()
  },

  onTabChange(e) {
    this.setData({ activeTab: e.detail.name })
    this.loadList()
  },

  async loadList() {
    const userId = app.globalData.userInfo && app.globalData.userInfo.id
    if (!userId) return
    this.setData({ loading: true })

    try {
      const { activeTab } = this.data
      if (activeTab === 'post') {
        const res = await userApi.getUserPosts(userId, { pageNum: 1, pageSize: 50 })
        const list = (res.list || res || []).map(p => ({ ...p, createTimeText: formatTime(p.createTime) }))
        this.setData({ postList: list })
      } else if (activeTab === 'item') {
        const res = await userApi.getUserItems(userId, { pageNum: 1, pageSize: 50 })
        const list = (res.list || res || []).map(i => ({ ...i, createTimeText: formatTime(i.createTime) }))
        this.setData({ itemList: list })
      }
    } catch (err) {
      console.error('加载失败:', err)
    } finally {
      this.setData({ loading: false, refreshing: false })
    }
  },

  onPullDownRefresh() {
    this.setData({ refreshing: true })
    this.loadList()
  },

  async onDeleteItem(e) {
    const { id } = e.currentTarget.dataset
    const confirmed = await showConfirm('确定删除这件商品吗？')
    if (confirmed) {
      try {
        await marketApi.deleteItem(id)
        showToast('已删除')
        this.loadList()
      } catch (err) {
        showToast('删除失败')
      }
    }
  }
})
