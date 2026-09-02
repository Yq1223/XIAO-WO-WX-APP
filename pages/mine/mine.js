Page({
  data: {
    userInfo: {},
    isAdmin: false,
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
  },
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    const isAdmin = userInfo.role === 'admin'
    // TODO: 从后端获取统计数据
    const stats = wx.getStorageSync('userStats') || { publish: 0, favorite: 0, follow: 0, fans: 0 }
    this.setData({ userInfo, isAdmin, stats })
  },
  onLogin() {
    if (this.data.userInfo.nickName) return
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = {
          ...res.userInfo,
          school: '',
          role: 'user'
        }
        wx.setStorageSync('userInfo', userInfo)
        this.setData({ userInfo })
      }
    })
  },
  goSetting() {
    // TODO: 跳转设置页
    wx.showToast({ title: '设置页面开发中', icon: 'none' })
  },
  goPublish() {
    wx.navigateTo({ url: '/pages/mine-publish/mine-publish' })
  },
  goFavorite() {
    wx.navigateTo({ url: '/pages/mine-favorite/mine-favorite' })
  },
  goFollow() {
    wx.showToast({ title: '关注页面开发中', icon: 'none' })
  },
  goFans() {
    wx.showToast({ title: '粉丝页面开发中', icon: 'none' })
  }
})
