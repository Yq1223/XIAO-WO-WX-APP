/**
 * 帖子详情页
 */
const postApi = require('../../../api/post')
const commentApi = require('../../../api/comment')
const { formatTime, showToast, showSuccess } = require('../../../utils/util')
const { checkLogin } = require('../../../utils/auth')

Page({
  data: {
    postId: '',
    post: {},
    comments: [],
    commentPageNum: 1,
    commentHasMore: true,
    commentLoading: false,
    loading: true,
    replyTo: '',  // 回复目标昵称
    replyParentId: '', // 回复的父评论ID
    inputFocus: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ postId: options.id })
      this.loadDetail()
      this.loadComments(true)
    }
  },

  async loadDetail() {
    try {
      const res = await postApi.getPostDetail(this.data.postId)
      const post = res || {}
      post.createTimeText = formatTime(post.createTime)
      this.setData({ post, loading: false })
    } catch (err) {
      console.error('加载帖子详情失败:', err)
      this.setData({ loading: false })
      showToast('加载失败')
    }
  },

  async loadComments(refresh = false) {
    if (this.data.commentLoading) return
    const pageNum = refresh ? 1 : this.data.commentPageNum
    this.setData({ commentLoading: true })

    try {
      const res = await commentApi.getComments({
        targetId: this.data.postId,
        targetType: 'post',
        pageNum,
        pageSize: 20
      })
      const list = (res.list || res || []).map(c => ({
        ...c,
        createTimeText: formatTime(c.createTime)
      }))

      this.setData({
        comments: refresh ? list : [...this.data.comments, ...list],
        commentPageNum: pageNum + 1,
        commentHasMore: list.length >= 20,
        commentLoading: false
      })
    } catch (err) {
      console.error('加载评论失败:', err)
      this.setData({ commentLoading: false })
    }
  },

  onReachBottom() {
    if (this.data.commentHasMore && !this.data.commentLoading) {
      this.loadComments(false)
    }
  },

  // 点赞帖子
  async onLike() {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    try {
      await postApi.likePost(this.data.postId)
      const { post } = this.data
      this.setData({
        'post.isLiked': !post.isLiked,
        'post.likeCount': post.isLiked ? (post.likeCount || 1) - 1 : (post.likeCount || 0) + 1
      })
    } catch (err) {
      console.error('点赞失败:', err)
    }
  },

  // 收藏帖子
  async onCollect() {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    try {
      await postApi.collectPost(this.data.postId)
      const { post } = this.data
      this.setData({
        'post.isCollected': !post.isCollected,
        'post.collectCount': post.isCollected ? (post.collectCount || 1) - 1 : (post.collectCount || 0) + 1
      })
    } catch (err) {
      console.error('收藏失败:', err)
    }
  },

  // 聚焦评论输入框
  onFocusComment() {
    this.setData({ inputFocus: true, replyTo: '', replyParentId: '' })
  },

  // 回复评论
  onReplyComment(e) {
    const { comment } = e.detail
    this.setData({
      replyTo: comment.author.nickname,
      replyParentId: comment.id,
      inputFocus: true
    })
  },

  // 发送评论
  async onSendComment(e) {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    const { content } = e.detail
    try {
      await commentApi.createComment({
        targetId: this.data.postId,
        targetType: 'post',
        content,
        parentId: this.data.replyParentId || undefined
      })
      showSuccess('评论成功')
      this.setData({ replyTo: '', replyParentId: '', inputFocus: false })
      // 刷新评论
      this.loadComments(true)
      // 更新评论数
      this.setData({
        'post.commentCount': (this.data.post.commentCount || 0) + 1
      })
    } catch (err) {
      console.error('评论失败:', err)
      showToast('评论失败')
    }
  },

  // 点赞评论
  async onLikeComment(e) {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    const { comment } = e.detail
    try {
      await commentApi.likeComment(comment.id)
      // 遍历更新
      this.updateCommentLike(comment.id)
    } catch (err) {
      console.error('评论点赞失败:', err)
    }
  },

  updateCommentLike(commentId) {
    const comments = this.data.comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likeCount: c.isLiked ? (c.likeCount || 1) - 1 : (c.likeCount || 0) + 1
        }
      }
      if (c.children) {
        c.children = c.children.map(child => {
          if (child.id === commentId) {
            return {
              ...child,
              isLiked: !child.isLiked,
              likeCount: child.isLiked ? (child.likeCount || 1) - 1 : (child.likeCount || 0) + 1
            }
          }
          return child
        })
      }
      return c
    })
    this.setData({ comments })
  },

  onExpandComment(e) {
    // TODO: 加载子评论
    console.log('展开评论', e.detail)
  },

  onPreviewImage(e) {
    const { index } = e.currentTarget.dataset
    wx.previewImage({
      current: this.data.post.images[index],
      urls: this.data.post.images
    })
  },

  onShareAppMessage() {
    return {
      title: this.data.post.title || '来自校窝的帖子',
      path: `/pages/detail/post/index?id=${this.data.postId}`
    }
  }
})
