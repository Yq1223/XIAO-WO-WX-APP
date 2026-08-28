/**
 * 首页 - 论坛帖子列表
 */
const postApi = require('../../api/post')
const { likePost, collectPost } = require('../../api/post')
const { POST_CATEGORY } = require('../../utils/constants')
const { formatTime, showToast, debounce } = require('../../utils/util')
const { checkLogin } = require('../../utils/auth')

const app = getApp()

Page({
  data: {
    categories: POST_CATEGORY,
    activeCategory: 0,
    postList: [],
    pageNum: 1,
    pageSize: 20,
    hasMore: true,
    loading: false,
    refreshing: false,
    skeletonLoading: true
  },

  onLoad() {
    this.loadPosts(true)
  },

  onShow() {
    // 从发布页返回时刷新
    if (app.globalData.needRefresh) {
      this.loadPosts(true)
      app.globalData.needRefresh = false
    }
  },

  /**
   * 加载帖子列表
   * @param {boolean} refresh - 是否重置列表
   */
  async loadPosts(refresh = false) {
    if (this.data.loading) return

    const pageNum = refresh ? 1 : this.data.pageNum

    this.setData({ loading: true })

    try {
      const res = await postApi.getPostList({
        category: this.data.activeCategory,
        pageNum,
        pageSize: this.data.pageSize
      })

      const list = (res.list || res || []).map(item => ({
        ...item,
        createTimeText: formatTime(item.createTime)
      }))

      this.setData({
        postList: refresh ? list : [...this.data.postList, ...list],
        pageNum: pageNum + 1,
        hasMore: list.length >= this.data.pageSize,
        loading: false,
        refreshing: false,
        skeletonLoading: false
      })
    } catch (err) {
      console.error('加载帖子失败:', err)
      this.setData({ loading: false, refreshing: false })
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ refreshing: true })
    this.loadPosts(true)
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadPosts(false)
    }
  },

  // 切换分类
  onCategoryChange(e) {
    this.setData({
      activeCategory: e.detail.name,
      postList: [],
      pageNum: 1,
      hasMore: true
    })
    this.loadPosts(true)
  },

  // 点击搜索栏
  onSearchTap() {
    wx.navigateTo({ url: '/pages/search/index' })
  },

  // 点赞帖子
  async onPostLike(e) {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    const { post } = e.detail
    try {
      await likePost(post.id)
      // 更新本地状态
      const index = this.data.postList.findIndex(p => p.id === post.id)
      if (index > -1) {
        const key = `postList[${index}]`
        this.setData({
          [`${key}.isLiked`]: !post.isLiked,
          [`${key}.likeCount`]: post.isLiked ? (post.likeCount || 1) - 1 : (post.likeCount || 0) + 1
        })
      }
    } catch (err) {
      console.error('点赞失败:', err)
    }
  },

  // 收藏帖子
  async onPostCollect(e) {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    const { post } = e.detail
    try {
      await collectPost(post.id)
      const index = this.data.postList.findIndex(p => p.id === post.id)
      if (index > -1) {
        const key = `postList[${index}]`
        this.setData({
          [`${key}.isCollected`]: !post.isCollected,
          [`${key}.collectCount`]: post.isCollected ? (post.collectCount || 1) - 1 : (post.collectCount || 0) + 1
        })
      }
    } catch (err) {
      console.error('收藏失败:', err)
    }
  },

  // 发帖
  onPublish() {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    wx.navigateTo({ url: '/pages/publish/post/index' })
  },

  onShareAppMessage() {
    return {
      title: '校窝 - 有事，窝里说',
      path: '/pages/index/index'
    }
  }
})
