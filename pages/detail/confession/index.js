/**
 * 表白墙详情页
 */
const confessionApi = require('../../../api/confession')
const commentApi = require('../../../api/comment')
const { formatTime, showToast, showSuccess } = require('../../../utils/util')
const { checkLogin } = require('../../../utils/auth')

Page({
  data: {
    id: '',
    confession: {},
    comments: [],
    commentPageNum: 1,
    commentHasMore: true,
    commentLoading: false,
    loading: true,
    replyTo: '',
    replyParentId: '',
    inputFocus: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id })
      this.loadDetail()
      this.loadComments(true)
    }
  },

  async loadDetail() {
    try {
      const res = await confessionApi.getConfessionDetail(this.data.id)
      const confession = res || {}
      confession.createTimeText = formatTime(confession.createTime)
      this.setData({ confession, loading: false })
    } catch (err) {
      console.error('加载详情失败:', err)
      this.setData({ loading: false })
    }
  },

  async loadComments(refresh = false) {
    if (this.data.commentLoading) return
    const pageNum = refresh ? 1 : this.data.commentPageNum
    this.setData({ commentLoading: true })
    try {
      const res = await commentApi.getComments({
        targetId: this.data.id,
        targetType: 'confession',
        pageNum,
        pageSize: 20
      })
      const list = (res.list || res || []).map(c => ({ ...c, createTimeText: formatTime(c.createTime) }))
      this.setData({
        comments: refresh ? list : [...this.data.comments, ...list],
        commentPageNum: pageNum + 1,
        commentHasMore: list.length >= 20,
        commentLoading: false
      })
    } catch (err) {
      this.setData({ commentLoading: false })
    }
  },

  onReachBottom() {
    if (this.data.commentHasMore && !this.data.commentLoading) {
      this.loadComments(false)
    }
  },

  async onLike() {
    if (!checkLogin()) { wx.navigateTo({ url: '/pages/login/index' }); return }
    try {
      await confessionApi.likeConfession(this.data.id)
      const { confession } = this.data
      this.setData({
        'confession.isLiked': !confession.isLiked,
        'confession.likeCount': confession.isLiked ? (confession.likeCount || 1) - 1 : (confession.likeCount || 0) + 1
      })
    } catch (err) {}
  },

  async onCollect() {
    if (!checkLogin()) { wx.navigateTo({ url: '/pages/login/index' }); return }
    try {
      await confessionApi.collectConfession(this.data.id)
      const { confession } = this.data
      this.setData({
        'confession.isCollected': !confession.isCollected,
        'confession.collectCount': confession.isCollected ? (confession.collectCount || 1) - 1 : (confession.collectCount || 0) + 1
      })
    } catch (err) {}
  },

  onReplyComment(e) {
    const { comment } = e.detail
    this.setData({ replyTo: comment.author.nickname, replyParentId: comment.id, inputFocus: true })
  },

  async onSendComment(e) {
    if (!checkLogin()) { wx.navigateTo({ url: '/pages/login/index' }); return }
    try {
      await commentApi.createComment({
        targetId: this.data.id,
        targetType: 'confession',
        content: e.detail.content,
        parentId: this.data.replyParentId || undefined
      })
      showSuccess('评论成功')
      this.setData({ replyTo: '', replyParentId: '', inputFocus: false })
      this.loadComments(true)
      this.setData({ 'confession.commentCount': (this.data.confession.commentCount || 0) + 1 })
    } catch (err) {
      showToast('评论失败')
    }
  },

  async onLikeComment(e) {
    if (!checkLogin()) { wx.navigateTo({ url: '/pages/login/index' }); return }
    try { await commentApi.likeComment(e.detail.comment.id) } catch (err) {}
  },

  onPreviewImage(e) {
    wx.previewImage({ current: this.data.confession.images[e.currentTarget.dataset.index], urls: this.data.confession.images })
  }
})
