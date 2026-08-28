/**
 * 简易全局状态管理
 * 用于跨页面共享状态（未读消息数、用户信息等）
 */
const app = getApp()

const store = {
  /**
   * 获取用户信息
   */
  getUserInfo() {
    return app.globalData.userInfo
  },

  /**
   * 更新用户信息
   * @param {Object} userInfo
   */
  updateUserInfo(userInfo) {
    app.globalData.userInfo = userInfo
    wx.setStorageSync('userInfo', userInfo)
  },

  /**
   * 是否已登录
   */
  isLoggedIn() {
    return app.globalData.isLoggedIn
  },

  /**
   * 获取未读消息数
   */
  getUnreadMsgCount() {
    return app.globalData.unreadMsgCount || 0
  },

  /**
   * 更新未读消息数
   * @param {number} count
   */
  updateUnreadMsgCount(count) {
    app.globalData.unreadMsgCount = count
  },

  /**
   * 获取未读通知数
   */
  getUnreadNotifCount() {
    return app.globalData.unreadNotifCount || 0
  },

  /**
   * 更新未读通知数
   * @param {number} count
   */
  updateUnreadNotifCount(count) {
    app.globalData.unreadNotifCount = count
  },

  /**
   * 清除所有状态（退出登录时调用）
   */
  clear() {
    app.globalData.userInfo = null
    app.globalData.isLoggedIn = false
    app.globalData.token = ''
    app.globalData.unreadMsgCount = 0
    app.globalData.unreadNotifCount = 0
  }
}

module.exports = store
