/**
 * 商品详情页
 */
const marketApi = require('../../../api/market')
const messageApi = require('../../../api/message')
const { formatTime, showToast } = require('../../../utils/util')
const { checkLogin } = require('../../../utils/auth')

Page({
  data: {
    itemId: '',
    item: {},
    loading: true
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ itemId: options.id })
      this.loadDetail()
    }
  },

  async loadDetail() {
    try {
      const res = await marketApi.getItemDetail(this.data.itemId)
      const item = res || {}
      item.createTimeText = formatTime(item.createTime)
      this.setData({ item, loading: false })
    } catch (err) {
      console.error('加载商品详情失败:', err)
      this.setData({ loading: false })
      showToast('加载失败')
    }
  },

  onPreviewImage(e) {
    const { index } = e.currentTarget.dataset
    wx.previewImage({
      current: this.data.item.images[index],
      urls: this.data.item.images
    })
  },

  // 联系卖家
  async onContact() {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    try {
      const res = await messageApi.createConversation(this.data.item.author.id)
      const conversationId = res.id || res
      wx.navigateTo({
        url: `/pages/chat/index?id=${conversationId}`
      })
    } catch (err) {
      showToast('创建会话失败')
    }
  },

  async onLike() {
    if (!checkLogin()) { wx.navigateTo({ url: '/pages/login/index' }); return }
    try {
      await marketApi.likeItem(this.data.itemId)
      const { item } = this.data
      this.setData({
        'item.isLiked': !item.isLiked,
        'item.likeCount': item.isLiked ? (item.likeCount || 1) - 1 : (item.likeCount || 0) + 1
      })
    } catch (err) {}
  },

  async onCollect() {
    if (!checkLogin()) { wx.navigateTo({ url: '/pages/login/index' }); return }
    try {
      await marketApi.likeItem(this.data.itemId)
      const { item } = this.data
      this.setData({
        'item.isCollected': !item.isCollected,
        'item.collectCount': item.isCollected ? (item.collectCount || 1) - 1 : (item.collectCount || 0) + 1
      })
    } catch (err) {}
  },

  onGoProfile() {
    if (this.data.item.author && this.data.item.author.id) {
      wx.navigateTo({ url: `/pages/profile/index?id=${this.data.item.author.id}` })
    }
  },

  onShareAppMessage() {
    return {
      title: this.data.item.title || '来自校窝的闲置好物',
      path: `/pages/detail/market/index?id=${this.data.itemId}`
    }
  }
})
