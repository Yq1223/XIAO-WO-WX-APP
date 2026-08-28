/**
 * 跳蚤市场页面
 */
const marketApi = require('../../api/market')
const { ITEM_CATEGORY } = require('../../utils/constants')
const { formatTime } = require('../../utils/util')
const { checkLogin } = require('../../utils/auth')

const app = getApp()

Page({
  data: {
    categories: ITEM_CATEGORY,
    activeCategory: 0,
    sortBy: 'default',
    itemList: [],
    leftList: [],  // 瀑布流左列
    rightList: [], // 瀑布流右列
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
      const res = await marketApi.getMarketList({
        category: this.data.activeCategory,
        sort: this.data.sortBy,
        pageNum,
        pageSize: this.data.pageSize
      })

      const list = (res.list || res || []).map(item => ({
        ...item,
        createTimeText: formatTime(item.createTime)
      }))

      const fullList = refresh ? list : [...this.data.itemList, ...list]
      const { left, right } = this.splitWaterfall(fullList)

      this.setData({
        itemList: fullList,
        leftList: left,
        rightList: right,
        pageNum: pageNum + 1,
        hasMore: list.length >= this.data.pageSize,
        loading: false,
        refreshing: false
      })
    } catch (err) {
      console.error('加载商品失败:', err)
      this.setData({ loading: false, refreshing: false })
    }
  },

  /**
   * 将列表分为左右两列（瀑布流）
   */
  splitWaterfall(list) {
    const left = []
    const right = []
    list.forEach((item, index) => {
      if (index % 2 === 0) {
        left.push(item)
      } else {
        right.push(item)
      }
    })
    return { left, right }
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

  onCategoryChange(e) {
    this.setData({
      activeCategory: e.detail.name,
      itemList: [],
      leftList: [],
      rightList: [],
      pageNum: 1,
      hasMore: true
    })
    this.loadList(true)
  },

  onSortChange(e) {
    const { sort } = e.currentTarget.dataset
    this.setData({
      sortBy: sort,
      itemList: [],
      leftList: [],
      rightList: [],
      pageNum: 1,
      hasMore: true
    })
    this.loadList(true)
  },

  onSearchTap() {
    wx.navigateTo({ url: '/pages/search/index?tab=market' })
  },

  onPublish() {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    wx.navigateTo({ url: '/pages/publish/market/index' })
  },

  onShareAppMessage() {
    return {
      title: '校窝跳蚤市场 - 淘好物，省钱包',
      path: '/pages/market/index'
    }
  }
})
