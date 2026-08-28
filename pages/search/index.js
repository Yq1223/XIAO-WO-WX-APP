/**
 * 搜索页面
 */
const postApi = require('../../api/post')
const marketApi = require('../../api/market')
const { formatTime } = require('../../utils/util')

const HISTORY_KEY = 'searchHistory'
const MAX_HISTORY = 20

Page({
  data: {
    keyword: '',
    activeTab: 'post',
    hasSearched: false,
    searchLoading: false,
    postResults: [],
    marketResults: [],
    leftResults: [],
    rightResults: [],
    searchHistory: [],
    hotSearches: ['二手手机', '考研资料', '四六级', '自行车', '考研', '健身卡']
  },

  onLoad(options) {
    if (options.tab) {
      this.setData({ activeTab: options.tab })
    }
    // 加载搜索历史
    const history = wx.getStorageSync(HISTORY_KEY) || []
    this.setData({ searchHistory: history })
  },

  onInputChange(e) {
    this.setData({ keyword: e.detail })
  },

  onSearch() {
    const { keyword } = this.data
    if (!keyword.trim()) return
    this.saveHistory(keyword.trim())
    this.setData({ hasSearched: true })
    this.doSearch()
  },

  onClear() {
    this.setData({ keyword: '', hasSearched: false, postResults: [], marketResults: [], leftResults: [], rightResults: [] })
  },

  onTabChange(e) {
    this.setData({ activeTab: e.detail.name })
    if (this.data.hasSearched) this.doSearch()
  },

  async doSearch() {
    const { keyword, activeTab } = this.data
    if (!keyword.trim()) return
    this.setData({ searchLoading: true })

    try {
      if (activeTab === 'post') {
        const res = await postApi.searchPosts(keyword.trim(), { pageNum: 1, pageSize: 20 })
        const list = (res.list || res || []).map(p => ({ ...p, createTimeText: formatTime(p.createTime) }))
        this.setData({ postResults: list })
      } else {
        const res = await marketApi.searchItems(keyword.trim(), { pageNum: 1, pageSize: 20 })
        const list = (res.list || res || []).map(i => ({ ...i, createTimeText: formatTime(i.createTime) }))
        const left = [], right = []
        list.forEach((item, idx) => { idx % 2 === 0 ? left.push(item) : right.push(item) })
        this.setData({ marketResults: list, leftResults: left, rightResults: right })
      }
    } catch (err) {
      console.error('搜索失败:', err)
    } finally {
      this.setData({ searchLoading: false })
    }
  },

  saveHistory(keyword) {
    let history = wx.getStorageSync(HISTORY_KEY) || []
    history = history.filter(h => h !== keyword)
    history.unshift(keyword)
    if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY)
    wx.setStorageSync(HISTORY_KEY, history)
    this.setData({ searchHistory: history })
  },

  onTapHistory(e) {
    const { keyword } = e.currentTarget.dataset
    this.setData({ keyword, hasSearched: true })
    this.doSearch()
  },

  onClearHistory() {
    wx.removeStorageSync(HISTORY_KEY)
    this.setData({ searchHistory: [] })
  }
})
