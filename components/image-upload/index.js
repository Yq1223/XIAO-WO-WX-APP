/**
 * 图片上传组件
 * properties: maxCount(Number), fileList(Array)
 * events: change(fileList)
 */
const { uploadImage } = require('../../api/upload')
const { showToast } = require('../../utils/util')

Component({
  properties: {
    maxCount: {
      type: Number,
      value: 9
    },
    fileList: {
      type: Array,
      value: []
    }
  },

  methods: {
    // 选择图片
    onChooseImage() {
      const { maxCount, fileList } = this.data
      const remaining = maxCount - fileList.length

      wx.chooseMedia({
        count: remaining,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        sizeType: ['compressed'],
        success: (res) => {
          const tempFiles = res.tempFiles
          this.uploadFiles(tempFiles)
        }
      })
    },

    // 批量上传图片
    async uploadFiles(tempFiles) {
      wx.showLoading({ title: '上传中...', mask: true })

      const newFileList = [...this.data.fileList]
      const tasks = tempFiles.map(async (file) => {
        try {
          const result = await uploadImage(file.tempFilePath)
          return result.url || result
        } catch (err) {
          console.error('图片上传失败:', err)
          return null
        }
      })

      const results = await Promise.all(tasks)
      results.forEach((url) => {
        if (url) {
          newFileList.push({ url })
        }
      })

      wx.hideLoading()
      this.setData({ fileList: newFileList })
      this.triggerEvent('change', { fileList: newFileList })
    },

    // 删除图片
    onDelete(e) {
      const { index } = e.currentTarget.dataset
      const fileList = [...this.data.fileList]
      fileList.splice(index, 1)
      this.setData({ fileList })
      this.triggerEvent('change', { fileList })
    },

    // 预览图片
    onPreviewImage(e) {
      const { index } = e.currentTarget.dataset
      const urls = this.data.fileList.map(item => item.url || item)
      wx.previewImage({
        current: urls[index],
        urls
      })
    }
  }
})
