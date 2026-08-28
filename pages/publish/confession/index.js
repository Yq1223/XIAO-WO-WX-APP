/**
 * 发布表白页面
 */
const confessionApi = require('../../../api/confession')
const { CONFESSION_TYPE } = require('../../../utils/constants')
const { showToast, showSuccess } = require('../../../utils/util')

const app = getApp()

Page({
  data: {
    confessionTypes: CONFESSION_TYPE.filter(t => t.value !== 0),
    activeType: 1,
    content: '',
    targetDesc: '',
    imageList: [],
    submitting: false,
    canSubmit: false
  },

  checkForm() {
    this.setData({ canSubmit: this.data.content.trim().length > 0 })
  },

  onSelectType(e) {
    this.setData({ activeType: e.currentTarget.dataset.value })
  },

  onContentInput(e) {
    this.setData({ content: e.detail })
    this.checkForm()
  },

  onTargetInput(e) {
    this.setData({ targetDesc: e.detail })
  },

  onImageChange(e) {
    this.setData({ imageList: e.detail.fileList })
  },

  async onSubmit() {
    if (!this.data.canSubmit || this.data.submitting) return

    this.setData({ submitting: true })
    try {
      const images = this.data.imageList.map(item => item.url || item)
      await confessionApi.createConfession({
        type: this.data.activeType,
        content: this.data.content.trim(),
        targetDesc: this.data.targetDesc.trim(),
        images
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
