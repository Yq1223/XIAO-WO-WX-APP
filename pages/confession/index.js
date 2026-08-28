/**
 * 表白墙页面
 */
const confessionApi = require('../../api/confession')
const { CONFESSION_TYPE } = require('../../utils/constants')
const { formatTime } = require('../../utils/util')
const { checkLogin } = require('../../utils/auth')

const app = getApp()

Page({
  data: {
    confessionTypes: CONFESSION_TYPE,
    activeType: 0,
    confessionList: [],
    pageNum: 1,
    pageSize: 20,
    hasMore: true,
    loading: false,
    refreshing: false
  },

  onLoad() {
    this.loadList(true)
  },

  onShow() {
    if (app.globalData.needRefresh) {
      this.loadList(true)
      app.globalData.needRefresh = false
    }
  },

  async loadList(refresh = false) {
    if (this.data.loading) return

    const pageNum = refresh ? 1 : this.data.pageNum
    this.setData({ loading: true })

    try {
      const res = await confessionApi.getConfessionList({
        type: this.data.activeType,
        pageNum,
        pageSize: this.data.pageSize
      })

      const list = (res.list || res || []).map(item => ({
        ...item,
        createTimeText: formatTime(item.createTime)
      }))

      this.setData({
        confessionList: refresh ? list : [...this.data.confessionList, ...list],
        pageNum: pageNum + 1,
        hasMore: list.length >= this.data.pageSize,
        loading: false,
        refreshing: false
      })
    } catch (err) {
      console.error('加载表白墙失败:', err)
      this.setData({ loading: false, refreshing: false })
    }
  },

  onPullDownRefresh() {
    this.setData({ refreshing: true })
    this.loadList(true)
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadList(false)
    }
  },

  onTypeChange(e) {
    this.setData({
      activeType: e.detail.name,
      confessionList: [],
      pageNum: 1,
      hasMore: true
    })
    this.loadList(true)
  },

  async onLike(e) {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    const { confession } = e.detail
    try {
      await confessionApi.likeConfession(confession.id)
      const index = this.data.confessionList.findIndex(c => c.id === confession.id)
      if (index > -1) {
        const key = `confessionList[${index}]`
        this.setData({
          [`${key}.isLiked`]: !confession.isLiked,
          [`${key}.likeCount`]: confession.isLiked ? (confession.likeCount || 1) - 1 : (confession.likeCount || 0) + 1
        })
      }
    } catch (err) {
      console.error('点赞失败:', err)
    }
  },

  async onCollect(e) {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    const { confession } = e.detail
    try {
      await confessionApi.collectConfession(confession.id)
      const index = this.data.confessionList.findIndex(c => c.id === confession.id)
      if (index > -1) {
        const key = `confessionList[${index}]`
        this.setData({
          [`${key}.isCollected`]: !confession.isCollected,
          [`${key}.collectCount`]: confession.isCollected ? (confession.collectCount || 1) - 1 : (confession.collectCount || 0) + 1
        })
      }
    } catch (err) {
      console.error('收藏失败:', err)
    }
  },

  onPublish() {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    wx.navigateTo({ url: '/pages/publish/confession/index' })
  },

  onShareAppMessage() {
    return {
      title: '校窝表白墙 - 有事，窝里说',
      path: '/pages/confession/index'
    }
  }
})
