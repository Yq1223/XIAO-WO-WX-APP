/**
 * 设置页面
 */
const userApi = require('../../../api/user')
const { logout } = require('../../../utils/auth')
const { showToast, showSuccess, showConfirm } = require('../../../utils/util')
const store = require('../../../store/index')

Page({
  data: {
    userInfo: {},
    cacheSize: '0KB'
  },

  onShow() {
    this.setData({ userInfo: store.getUserInfo() || {} })
    this.calcCacheSize()
  },

  calcCacheSize() {
    try {
      const res = wx.getStorageInfoSync()
      this.setData({ cacheSize: `${(res.currentSize / 1024).toFixed(2)}MB` })
    } catch (e) {}
  },

  onChangeAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: async (res) => {
        const filePath = res.tempFiles[0].tempFilePath
        try {
          const { uploadImage } = require('../../../api/upload')
          const result = await uploadImage(filePath)
          const avatarUrl = result.url || result
          await userApi.updateUser({ avatar: avatarUrl })
          this.setData({ 'userInfo.avatar': avatarUrl })
          store.updateUserInfo({ ...this.data.userInfo, avatar: avatarUrl })
          showSuccess('头像已更新')
        } catch (err) {
          showToast('更新失败')
        }
      }
    })
  },

  onEditNickname() {
    // 使用dialog编辑
    wx.showModal({
      title: '修改昵称',
      editable: true,
      placeholderText: '请输入新昵称',
      success: async (res) => {
        if (res.confirm && res.content) {
          try {
            await userApi.updateUser({ nickname: res.content.trim() })
            this.setData({ 'userInfo.nickname': res.content.trim() })
            store.updateUserInfo({ ...this.data.userInfo, nickname: res.content.trim() })
            showSuccess('昵称已更新')
          } catch (err) {
            showToast('更新失败')
          }
        }
      }
    })
  },

  onEditSchool() {
    wx.showModal({
      title: '修改学校',
      editable: true,
      placeholderText: '请输入学校名称',
      success: async (res) => {
        if (res.confirm && res.content) {
          try {
            await userApi.updateUser({ school: res.content.trim() })
            this.setData({ 'userInfo.school': res.content.trim() })
            store.updateUserInfo({ ...this.data.userInfo, school: res.content.trim() })
            showSuccess('学校已更新')
          } catch (err) {
            showToast('更新失败')
          }
        }
      }
    })
  },

  onEditBio() {
    wx.showModal({
      title: '修改简介',
      editable: true,
      placeholderText: '介绍一下自己吧',
      success: async (res) => {
        if (res.confirm) {
          try {
            await userApi.updateUser({ bio: (res.content || '').trim() })
            this.setData({ 'userInfo.bio': (res.content || '').trim() })
            store.updateUserInfo({ ...this.data.userInfo, bio: (res.content || '').trim() })
            showSuccess('简介已更新')
          } catch (err) {
            showToast('更新失败')
          }
        }
      }
    })
  },

  async onClearCache() {
    const confirmed = await showConfirm('确定清除本地缓存吗？')
    if (confirmed) {
      wx.clearStorageSync()
      this.setData({ cacheSize: '0KB' })
      showSuccess('缓存已清除')
    }
  },

  onAbout() {
    wx.showModal({
      title: '关于校窝',
      content: '校窝 v1.0.0\n面向大学生的校园社区\n有事，窝里说。',
      showCancel: false,
      confirmColor: '#FF6B35'
    })
  },

  onFeedback() {
    wx.showModal({
      title: '意见反馈',
      content: '如有问题或建议，请发送邮件至 feedback@xiaowo.com',
      showCancel: false,
      confirmColor: '#FF6B35'
    })
  },

  onPrivacy() {
    // TODO: 跳转隐私政策页面
    showToast('隐私政策页面开发中')
  },

  async onLogout() {
    const confirmed = await showConfirm('确定退出登录吗？')
    if (confirmed) {
      logout()
      store.clear()
      wx.reLaunch({ url: '/pages/index/index' })
    }
  }
})
