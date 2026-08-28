/**
 * 发布闲置商品页面
 */
const marketApi = require('../../../api/market')
const { ITEM_CATEGORY, ITEM_CONDITION, TRADE_METHOD } = require('../../../utils/constants')
const { showToast, showSuccess } = require('../../../utils/util')

const app = getApp()

Page({
  data: {
    categories: ITEM_CATEGORY.filter(c => c.value !== 0),
    conditions: ITEM_CONDITION,
    tradeMethods: TRADE_METHOD,
    activeCategory: 1,
    activeCondition: 1,
    activeTrade: 1,
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    location: '',
    imageList: [],
    isAnonymous: false,
    submitting: false,
    canSubmit: false
  },

  checkForm() {
    const { title, price } = this.data
    this.setData({
      canSubmit: title.trim().length > 0 && price > 0
    })
  },

  onTitleInput(e) { this.setData({ title: e.detail }); this.checkForm() },
  onDescInput(e) { this.setData({ description: e.detail }) },
  onPriceInput(e) { this.setData({ price: e.detail }); this.checkForm() },
  onOriginalPriceInput(e) { this.setData({ originalPrice: e.detail }) },
  onLocationInput(e) { this.setData({ location: e.detail }) },
  onImageChange(e) { this.setData({ imageList: e.detail.fileList }) },
  onAnonymousChange(e) { this.setData({ isAnonymous: e.detail }) },
  onSelectCategory(e) { this.setData({ activeCategory: e.currentTarget.dataset.value }) },
  onSelectCondition(e) { this.setData({ activeCondition: e.currentTarget.dataset.value }) },
  onSelectTrade(e) { this.setData({ activeTrade: e.currentTarget.dataset.value }) },

  async onSubmit() {
    if (!this.data.canSubmit || this.data.submitting) return

    this.setData({ submitting: true })
    try {
      const images = this.data.imageList.map(item => item.url || item)
      await marketApi.createItem({
        title: this.data.title.trim(),
        description: this.data.description.trim(),
        images,
        category: this.data.activeCategory,
        price: Number(this.data.price),
        originalPrice: this.data.originalPrice ? Number(this.data.originalPrice) : undefined,
        condition: this.data.activeCondition,
        tradeMethod: this.data.activeTrade,
        location: this.data.location.trim(),
        isAnonymous: this.data.isAnonymous
      })
      showSuccess('发布成功')
      app.globalData.needRefresh = true
      setTimeout(() => wx.navigateBack(), 1500)
    } catch (err) {
      showToast('发布失败')
    } finally {
      this.setData({ submitting: false })
    }
  }
})
