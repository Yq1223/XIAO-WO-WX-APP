Page({
  data: {
    phone: '138****8888',
    schoolVerified: false
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({
      phone: userInfo.phone ? userInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '未绑定',
      schoolVerified: !!userInfo.school
    })
  },
  onClearCache() {
    wx.showModal({
      title: '提示',
      content: '确定清除本地缓存？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.showToast({ title: '清除成功', icon: 'success' })
        }
      }
    })
  },
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定退出登录？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo')
          wx.removeStorageSync('userStats')
          wx.navigateBack()
        }
      }
    })
  }
})
