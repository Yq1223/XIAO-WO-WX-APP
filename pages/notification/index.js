/**
 * 通知列表页面
 */
const notifApi = require('../../api/notification')
const { formatTime, showToast } = require('../../utils/util')

Page({
  data: {
    activeTab: 'all',
    notifications: [],
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
      const res = await notifApi.getNotifications({
        type: this.data.activeTab === 'all' ? undefined : this.data.activeTab,
        pageNum,
        pageSize: 20
      })
      const list = (res.list || res || []).map(item => ({
        ...item,
        createTimeText: formatTime(item.createTime)
      }))
      this.setData({
        notifications: refresh ? list : [...this.data.notifications, ...list],
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

  onTabChange(e) {
    this.setData({ activeTab: e.detail.name, notifications: [], pageNum: 1, hasMore: true })
    this.loadList(true)
  },

  async onMarkAllRead() {
    try {
      await notifApi.markAllRead()
      const notifications = this.data.notifications.map(n => ({ ...n, isRead: true }))
      this.setData({ notifications })
      showToast('已全部标记已读')
    } catch (err) {}
  },

  async onTapNotif(e) {
    const { item } = e.currentTarget.dataset
    if (!item.isRead) {
      try { await notifApi.markRead(item.id) } catch (err) {}
    }
    // 根据通知类型跳转
    if (item.targetId && item.targetType === 'post') {
      wx.navigateTo({ url: `/pages/detail/post/index?id=${item.targetId}` })
    } else if (item.targetId && item.targetType === 'confession') {
      wx.navigateTo({ url: `/pages/detail/confession/index?id=${item.targetId}` })
    } else if (item.targetId && item.targetType === 'item') {
      wx.navigateTo({ url: `/pages/detail/market/index?id=${item.targetId}` })
    }
  }
})
