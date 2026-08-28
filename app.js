// app.js - 校窝小程序全局逻辑
const { checkLogin, getToken } = require('./utils/auth')

App({
  onLaunch() {
    // 检查登录态
    this.checkLoginStatus()
    // 获取系统信息
    this.getSystemInfo()
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus() {
    const token = getToken()
    if (token) {
      this.globalData.isLoggedIn = true
      this.globalData.token = token
      // 尝试获取用户信息
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.globalData.userInfo = userInfo
      }
    }
  },

  /**
   * 获取系统信息（状态栏高度等）
   */
  getSystemInfo() {
    try {
      const systemInfo = wx.getSystemInfoSync()
      this.globalData.systemInfo = systemInfo
      this.globalData.statusBarHeight = systemInfo.statusBarHeight || 20
      // 胶囊按钮位置信息
      const menuButton = wx.getMenuButtonBoundingClientRect()
      this.globalData.menuButton = menuButton
      this.globalData.navBarHeight = (menuButton.top - systemInfo.statusBarHeight) * 2 + menuButton.height
    } catch (e) {
      console.error('获取系统信息失败', e)
    }
  },

  globalData: {
    userInfo: null,
    token: '',
    isLoggedIn: false,
    systemInfo: null,
    statusBarHeight: 20,
    navBarHeight: 44,
    menuButton: null
  }
})
