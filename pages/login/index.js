/**
 * 登录页面
 */
const { login } = require('../../utils/auth')
const { showToast } = require('../../utils/util')

Page({
  data: {
    logging: false,
    agreed: false
  },

  onToggleAgreement() {
    this.setData({ agreed: !this.data.agreed })
  },

  async onWxLogin() {
    if (!this.data.agreed) {
      showToast('请先同意用户协议和隐私政策')
      return
    }

    if (this.data.logging) return
    this.setData({ logging: true })

    try {
      await login()
      wx.showToast({ title: '登录成功', icon: 'success' })

      // 返回上一页或首页
      setTimeout(() => {
        const pages = getCurrentPages()
        if (pages.length > 1) {
          wx.navigateBack()
        } else {
          wx.reLaunch({ url: '/pages/index/index' })
        }
      }, 1500)
    } catch (err) {
      console.error('登录失败:', err)
      showToast('登录失败，请重试')
    } finally {
      this.setData({ logging: false })
    }
  },

  onUserAgreement() {
    // TODO: 跳转用户协议
    wx.showModal({
      title: '用户协议',
      content: '用户协议内容待完善',
      showCancel: false,
      confirmColor: '#FF6B35'
    })
  },

  onPrivacyPolicy() {
    // TODO: 跳转隐私政策
    wx.showModal({
      title: '隐私政策',
      content: '隐私政策内容待完善',
      showCancel: false,
      confirmColor: '#FF6B35'
    })
  }
})
