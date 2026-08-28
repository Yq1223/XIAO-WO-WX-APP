/**
 * 评论条目组件
 * properties: comment(Object), depth(Number)
 * events: reply, like, expand
 */
Component({
  properties: {
    comment: {
      type: Object,
      value: {}
    },
    // 嵌套深度，用于限制递归层数
    depth: {
      type: Number,
      value: 0
    }
  },

  data: {
    hasMoreReplies: false
  },

  observers: {
    'comment': function(comment) {
      const childrenLen = (comment.children || []).length
      this.setData({
        hasMoreReplies: (comment.childCount || 0) > childrenLen
      })
    }
  },

  methods: {
    // 回复评论
    onReply() {
      this.triggerEvent('reply', {
        comment: this.data.comment
      })
    },

    // 点赞评论
    onLike() {
      this.triggerEvent('like', {
        comment: this.data.comment
      })
    },

    // 子评论回复事件冒泡
    onSubReply(e) {
      this.triggerEvent('reply', e.detail)
    },

    // 展开更多回复
    onExpand() {
      this.triggerEvent('expand', {
        comment: this.data.comment
      })
    }
  }
})
