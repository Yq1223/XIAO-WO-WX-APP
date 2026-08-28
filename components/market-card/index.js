/**
 * 商品卡片组件
 * properties: item(Object), imageHeight(Number)
 * events: tap
 */
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
    // 图片高度（rpx），用于瀑布流不同高度
    imageHeight: {
      type: Number,
      value: 300
    }
  },

  methods: {
    onTap() {
      const { id } = this.data.item
      if (id) {
        wx.navigateTo({ url: `/pages/detail/market/index?id=${id}` })
      }
      this.triggerEvent('tap', { item: this.data.item })
    }
  }
})
