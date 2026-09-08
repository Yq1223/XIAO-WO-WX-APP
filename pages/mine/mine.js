const app = getApp()
const { isLoggedIn, login, logout } = require('../../utils/auth')
const { get } = require('../../utils/request')

Page({
  data: {
    userInfo: {},
    isAdmin: false,
    isLoggedIn: false,
    stats: {
      publish: 0,
      favorite: 0,
      follow: 0,
      fans: 0
    }
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 4 })
    }
    this.loadUserInfo()
  },

  loadUserInfo() {
    const loggedIn = isLoggedIn()
    const userInfo = wx.getStorageSync('userInfo') || {}
    const isAdmin = userInfo.role === 'admin'
    const stats = wx.getStorageSync('userStats') || { publish: 0, favorite: 0, follow: 0, fans: 0 }
    this.setData({ userInfo, isAdmin, isLoggedIn: loggedIn, stats })

    // 已登录时拉取最新统计
    if (loggedIn) {
      this.fetchStats()
    }
  },

  /**
   * 从服务端拉取用户统计数据
   */
  async fetchStats() {
    try {
      const userId = wx.getStorageSync('userId')
      if (!userId) return

      // 并行拉取帖子、表白墙、闲置的发布数量
      const [posts, confessions, marketItems] = await Promise.all([
        get(`/api/v1/post/user/${userId}`, { pageNum: 1, pageSize: 1 }).catch(() => ({ total: 0 })),
        get(`/api/v1/confession/user/${userId}`, { pageNum: 1, pageSize: 1 }).catch(() => ({ total: 0 })),
        get(`/api/v1/market/user/${userId}`, { pageNum: 1, pageSize: 1 }).catch(() => ({ total: 0 }))
      ])

      const publishCount = (posts.total || 0) + (confessions.total || 0) + (marketItems.total || 0)
      const stats = { publish: publishCount, favorite: 0, follow: 0, fans: 0 }

      wx.setStorageSync('userStats', stats)
      this.setData({ stats })
    } catch (err) {
      console.error('获取统计数据失败', err)
    }
  },

  /**
   * 点击头像/昵称区域
   */
  onLogin() {
    if (this.data.isLoggedIn) {
      // 已登录，跳转个人资料编辑页
      wx.navigateTo({ url: '/pages/mine-profile/mine-profile' })
      return
    }
    // 未登录，使用 wx.login 静默登录
    this.doLogin()
  },

  /**
   * 执行登录
   */
  async doLogin() {
    wx.showLoading({ title: '登录中...' })
    try {
      await login()
      wx.hideLoading()
      wx.showToast({ title: '登录成功', icon: 'success' })
      this.loadUserInfo()
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '登录失败，请重试', icon: 'none' })
      console.error('登录失败', err)
    }
  },

  /**
   * 获取头像（用户选择头像后触发登录）
   */
  onChooseAvatar(e) {
    const avatarUrl = e.detail.avatarUrl
    // 保存头像并触发带用户信息的登录
    this.setData({ 'userInfo.avatarUrl': avatarUrl })
    this.doLoginWithProfile({ avatarUrl })
  },

  /**
   * 带用户信息的登录
   */
  async doLoginWithProfile(extra = {}) {
    wx.showLoading({ title: '登录中...' })
    try {
      const userInfo = {
        nickName: extra.nickName || this.data.userInfo.nickName || '微信用户',
        avatarUrl: extra.avatarUrl || this.data.userInfo.avatarUrl || '',
        gender: extra.gender || 0
      }
      await app.loginWithProfile(userInfo)
      wx.hideLoading()
      wx.showToast({ title: '登录成功', icon: 'success' })
      this.loadUserInfo()
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '登录失败，请重试', icon: 'none' })
    }
  },

  // 跳转设置页
  goSetting() {
    wx.navigateTo({ url: '/pages/mine-setting/mine-setting' })
  },

  goPublish() {
    wx.navigateTo({ url: '/pages/mine-publish/mine-publish' })
  },

  goFavorite() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/mine-favorite/mine-favorite' })
  },

  goFollow() {
    wx.showToast({ title: '关注页面开发中', icon: 'none' })
  },

  goFans() {
    wx.showToast({ title: '粉丝页面开发中', icon: 'none' })
  },

  onClearCache() {
    wx.showModal({
      title: '提示',
      content: '确定清除本地缓存？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.showToast({ title: '清除成功', icon: 'success' })
          this.loadUserInfo()
        }
      }
    })
  }
})
