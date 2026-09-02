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
    // 每次显示时刷新用户信息（从资料页返回后）
    this.loadUserInfo()
  },
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    const isAdmin = userInfo.role === 'admin'
    const stats = wx.getStorageSync('userStats') || { publish: 0, favorite: 0, follow: 0, fans: 0 }
    this.setData({ userInfo, isAdmin, stats })
  },
  // 点击头像/昵称区域
  onLogin() {
    if (this.data.userInfo.nickName) {
      // 已登录，跳转个人资料编辑页
      wx.navigateTo({ url: '/pages/mine-profile/mine-profile' })
      return
    }
    // 未登录，获取用户信息
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = {
          ...res.userInfo,
          school: '',
          gender: '',
          studentId: '',
          signature: '',
          role: 'user'
        }
        wx.setStorageSync('userInfo', userInfo)
        this.setData({ userInfo })
      }
    })
  },
  // 跳转设置页
  goSetting() {
    wx.navigateTo({ url: '/pages/mine-setting/mine-setting' })
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
