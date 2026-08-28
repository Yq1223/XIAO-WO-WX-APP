/**
 * 浏览记录页面
 */
const userApi = require('../../../api/user')
const { formatTime } = require('../../../utils/util')

Page({
  data: {
    historyList: [],
    pageNum: 1,
    hasMore: true,
    loading: false,
    refreshing: false
  },

  onLoad() {
    this.loadList(true)
  },

  async loadList(refresh = false) {
    if (this.data.loading) return
    const pageNum = refresh ? 1 : this.data.pageNum
    this.setData({ loading: true })

    try {
      const res = await userApi.getHistory({ pageNum, pageSize: 20 })
      const list = (res.list || res || []).map(item => ({
        ...item,
        viewTimeText: formatTime(item.viewTime)
      }))
      this.setData({
        historyList: refresh ? list : [...this.data.historyList, ...list],
        pageNum: pageNum + 1,
        hasMore: list.length >= 20,
        loading: false,
        refreshing: false
      })
    } catch (err) {
      this.setData({ loading: false, refreshing: false })
    }
  },

  onPullDownRefresh() {
    this.setData({ refreshing: true })
    this.loadList(true)
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) this.loadList(false)
  },

  onTapItem(e) {
    const { type, id } = e.currentTarget.dataset
    const urlMap = {
      post: `/pages/detail/post/index?id=${id}`,
      confession: `/pages/detail/confession/index?id=${id}`,
      item: `/pages/detail/market/index?id=${id}`
    }
    if (urlMap[type]) wx.navigateTo({ url: urlMap[type] })
  }
})
