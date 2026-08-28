/**
 * 个人中心页面
 */
const userApi = require('../../api/user')
const messageApi = require('../../api/message')
const notifApi = require('../../api/notification')
const { checkLogin } = require('../../utils/auth')
const store = require('../../store/index')

const app = getApp()

Page({
  data: {
    isLoggedIn: false,
    userInfo: {},
    stats: {
      postCount: 0,
      collectCount: 0,
      fanCount: 0
    },
    unreadMsgCount: 0,
    unreadNotifCount: 0
  },

  onShow() {
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
      userInfo: app.globalData.userInfo || {}
    })

    if (this.data.isLoggedIn) {
      this.refreshUserInfo()
      this.loadUnreadCounts()
    }
  },

  /**
   * 刷新用户信息
   */
  async refreshUserInfo() {
    try {
      const res = await userApi.getUserInfo()
      const userInfo = res || {}
      store.updateUserInfo(userInfo)
      this.setData({
        userInfo,
        stats: {
          postCount: userInfo.postCount || 0,
          collectCount: userInfo.collectCount || 0,
          fanCount: userInfo.fanCount || 0
        }
      })
    } catch (err) {
      console.error('获取用户信息失败:', err)
    }
  },

  /**
   * 加载未读数
   */
  async loadUnreadCounts() {
    try {
      const [msgRes, notifRes] = await Promise.all([
        messageApi.getUnreadCount().catch(() => ({ count: 0 })),
        notifApi.getUnreadCount().catch(() => ({ count: 0 }))
      ])
      this.setData({
        unreadMsgCount: msgRes.count || 0,
        unreadNotifCount: notifRes.count || 0
      })
      store.updateUnreadMsgCount(msgRes.count || 0)
      store.updateUnreadNotifCount(notifRes.count || 0)
    } catch (err) {
      console.error('获取未读数失败:', err)
    }
  },

  onLogin() {
    wx.navigateTo({ url: '/pages/login/index' })
  },

  onEditProfile() {
    wx.navigateTo({ url: '/pages/mine/settings/index' })
  },

  onGoPosts() {
    wx.navigateTo({ url: '/pages/mine/posts/index' })
  },

  onGoCollections() {
    wx.navigateTo({ url: '/pages/mine/collections/index' })
  },

  onGoHistory() {
    wx.navigateTo({ url: '/pages/mine/history/index' })
  },

  onGoFans() {
    // TODO: 粉丝页面
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  onGoMessage() {
    wx.navigateTo({ url: '/pages/message/index' })
  },

  onGoNotification() {
    wx.navigateTo({ url: '/pages/notification/index' })
  },

  onGoSettings() {
    wx.navigateTo({ url: '/pages/mine/settings/index' })
  }
})
