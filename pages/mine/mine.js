Page({
  data: {
    userInfo: {},
    isAdmin: false
  },
  onLoad() {
    this.loadUserInfo()
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 4 })
    }
  },
  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    const isAdmin = userInfo.role === 'admin'
    this.setData({ userInfo, isAdmin })
  },
  // 点击登录/编辑资料
  onLogin() {
    if (this.data.userInfo.nickName) {
      // 已登录，可跳转编辑资料页
      return
    }
    // TODO: 实现登录逻辑
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = {
          ...res.userInfo,
          school: '', // TODO: 让用户填写学校
          role: 'user' // TODO: 从后端获取角色
        }
        wx.setStorageSync('userInfo', userInfo)
        this.setData({ userInfo })
      }
    })
  }
})
