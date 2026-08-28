/**
 * 表白卡片组件
 * properties: confession(Object)
 * events: tap, like, collect
 */
Component({
  properties: {
    confession: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onTap() {
      const { id } = this.data.confession
      if (id) {
        wx.navigateTo({ url: `/pages/detail/confession/index?id=${id}` })
      }
      this.triggerEvent('tap', { confession: this.data.confession })
    },

    onLike() {
      this.triggerEvent('like', { confession: this.data.confession })
    },

    onCollect() {
      this.triggerEvent('collect', { confession: this.data.confession })
    },

    onPreviewImage(e) {
      const { index } = e.currentTarget.dataset
      const { images } = this.data.confession
      if (images && images.length > 0) {
        wx.previewImage({
          current: images[index],
          urls: images
        })
      }
    }
  }
})
