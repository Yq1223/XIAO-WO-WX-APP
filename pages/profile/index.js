/**
 * 他人主页
 */
const userApi = require('../../api/user')
const { formatTime } = require('../../utils/util')

Page({
  data: {
    userId: '',
    userInfo: {},
    isFollowed: false,
    activeTab: 'post',
    postList: [],
    itemList: [],
    leftList: [],
    rightList: [],
    loading: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ userId: options.id })
      this.loadUserInfo()
      this.loadPosts()
    }
  },

  async loadUserInfo() {
    try {
      const res = await userApi.getUserById(this.data.userId)
      this.setData({ userInfo: res || {} })
      wx.setNavigationBarTitle({ title: res.nickname || '主页' })
    } catch (err) {}
  },

  async loadPosts() {
    this.setData({ loading: true })
    try {
      const res = await userApi.getUserPosts(this.data.userId, { pageNum: 1, pageSize: 20 })
      const list = (res.list || res || []).map(p => ({ ...p, createTimeText: formatTime(p.createTime) }))
      this.setData({ postList: list, loading: false })
    } catch (err) {
      this.setData({ loading: false })
    }
  },

  async loadItems() {
    this.setData({ loading: true })
    try {
      const res = await userApi.getUserItems(this.data.userId, { pageNum: 1, pageSize: 20 })
      const list = (res.list || res || []).map(i => ({ ...i, createTimeText: formatTime(i.createTime) }))
      const left = [], right = []
      list.forEach((item, idx) => { idx % 2 === 0 ? left.push(item) : right.push(item) })
      this.setData({ itemList: list, leftList: left, rightList: right, loading: false })
    } catch (err) {
      this.setData({ loading: false })
    }
  },

  onTabChange(e) {
    this.setData({ activeTab: e.detail.name })
    if (e.detail.name === 'post' && this.data.postList.length === 0) {
      this.loadPosts()
    } else if (e.detail.name === 'item' && this.data.itemList.length === 0) {
      this.loadItems()
    }
  },

  onFollow() {
    // TODO: 关注/取关
    this.setData({ isFollowed: !this.data.isFollowed })
    wx.showToast({ title: this.data.isFollowed ? '已关注' : '已取消', icon: 'none' })
  }
})
