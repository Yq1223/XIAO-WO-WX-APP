/**
 * 发布帖子页面
 */
const postApi = require('../../../api/post')
const { POST_CATEGORY } = require('../../../utils/constants')
const { showToast, showSuccess } = require('../../../utils/util')

const app = getApp()

Page({
  data: {
    categories: POST_CATEGORY.filter(c => c.value !== 0), // 排除"全部"
    activeCategory: 1,
    title: '',
    content: '',
    imageList: [],
    isAnonymous: false,
    submitting: false,
    canSubmit: false
  },

  // 实时校验表单
  checkForm() {
    const { title, content } = this.data
    this.setData({
      canSubmit: title.trim().length > 0 && content.trim().length > 0
    })
  },

  onTitleInput(e) {
    this.setData({ title: e.detail })
    this.checkForm()
  },

  onContentInput(e) {
    this.setData({ content: e.detail })
    this.checkForm()
  },

  onSelectCategory(e) {
    this.setData({ activeCategory: e.currentTarget.dataset.value })
  },

  onImageChange(e) {
    this.setData({ imageList: e.detail.fileList })
  },

  onAnonymousChange(e) {
    this.setData({ isAnonymous: e.detail })
  },

  async onSubmit() {
    if (!this.data.canSubmit || this.data.submitting) return

    const { title, content, activeCategory, imageList, isAnonymous } = this.data

    // 校验
    if (!title.trim()) {
      showToast('请输入标题')
      return
    }
    if (!content.trim()) {
      showToast('请输入内容')
      return
    }

    this.setData({ submitting: true })

    try {
      const images = imageList.map(item => item.url || item)
      await postApi.createPost({
        title: title.trim(),
        content: content.trim(),
        category: activeCategory,
        images,
        isAnonymous
      })

      showSuccess('发布成功')
      app.globalData.needRefresh = true

      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    } catch (err) {
      console.error('发布失败:', err)
      showToast('发布失败，请重试')
    } finally {
      this.setData({ submitting: false })
    }
  }
})
