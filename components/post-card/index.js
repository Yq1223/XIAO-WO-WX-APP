/**
 * 帖子卡片组件
 * properties: post(Object)
 * events: tap, like, collect
 */
Component({
  properties: {
    post: {
      type: Object,
      value: {}
    }
  },

  methods: {
    // 点击卡片，跳转详情
    onTap() {
      const { id } = this.data.post
      if (id) {
        wx.navigateTo({ url: `/pages/detail/post/index?id=${id}` })
      }
      this.triggerEvent('tap', { post: this.data.post })
    },

    // 点赞
    onLike() {
      this.triggerEvent('like', { post: this.data.post })
    },

    // 收藏
    onCollect() {
      this.triggerEvent('collect', { post: this.data.post })
    },

    // 预览图片
    onPreviewImage(e) {
      const { index } = e.currentTarget.dataset
      const { images } = this.data.post
      if (images && images.length > 0) {
        wx.previewImage({
          current: images[index],
          urls: images
        })
      }
    }
  }
})
