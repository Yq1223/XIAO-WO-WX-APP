/**
 * 会话列表页面
 */
const messageApi = require('../../api/message')
const { formatTime } = require('../../utils/util')

Page({
  data: {
    conversations: [],
    loading: false,
    refreshing: false
  },

  onShow() {
    this.loadConversations()
  },

  async loadConversations() {
    if (this.data.loading) return
    this.setData({ loading: true })

    try {
      const res = await messageApi.getConversations({ pageNum: 1, pageSize: 50 })
      const list = (res.list || res || []).map(item => ({
        ...item,
        lastMessageTimeText: formatTime(item.lastMessageTime)
      }))
      this.setData({ conversations: list, loading: false, refreshing: false })
    } catch (err) {
      console.error('加载会话失败:', err)
      this.setData({ loading: false, refreshing: false })
    }
  },

  onPullDownRefresh() {
    this.setData({ refreshing: true })
    this.loadConversations()
  },

  onTapConversation(e) {
    const { id, target } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/chat/index?id=${id}&targetName=${target.nickname || ''}`
    })
  },

  onDelete(e) {
    // TODO: 删除会话
    wx.showToast({ title: '功能开发中', icon: 'none' })
  }
})
