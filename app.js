const { login, isLoggedIn } = require('./utils/auth')
const { get } = require('./utils/request')

App({
  onLaunch() {
    console.log('校窝启动成功')
    // 静默登录：自动获取 code 换取 token
    this.silentLogin()
  },

  /**
   * 静默登录
   * 如果没有 token，则调用 wx.login 获取 code 换取 token
   */
  async silentLogin() {
    if (isLoggedIn()) {
      // 已有 token，尝试刷新用户信息
      this.refreshUserInfo()
      return
    }
    try {
      const result = await login()
      console.log('静默登录成功', result)
      this.globalData.userInfo = wx.getStorageSync('userInfo')
      // 通知页面登录完成
      this.emitLoginReady()
    } catch (err) {
      console.error('静默登录失败', err)
    }
  },

  /**
   * 带用户信息的登录（用户主动点击头像/昵称时调用）
   * @param {object} userInfo - 微信用户信息
   */
  async loginWithProfile(userInfo) {
    try {
      const result = await login(userInfo)
      console.log('用户信息登录成功', result)
      this.globalData.userInfo = wx.getStorageSync('userInfo')
      this.emitLoginReady()
      return result
    } catch (err) {
      console.error('用户信息登录失败', err)
      throw err
    }
  },

  /**
   * 刷新用户信息（从服务端拉取最新）
   */
  async refreshUserInfo() {
    try {
      const userVO = await get('/api/v1/user/me')
      const userInfo = {
        nickName: userVO.nickname,
        avatarUrl: userVO.avatar,
        gender: userVO.gender,
        role: userVO.role === 1 ? 'user' : 'admin'
      }
      wx.setStorageSync('userInfo', userInfo)
      this.globalData.userInfo = userInfo
    } catch (err) {
      console.error('刷新用户信息失败', err)
    }
  },

  /**
   * 登录完成通知（供页面监听）
   */
  emitLoginReady() {
    if (this._loginReadyCallbacks) {
      this._loginReadyCallbacks.forEach(cb => cb(this.globalData.userInfo))
      this._loginReadyCallbacks = null
    }
  },

  /**
   * 等待登录完成后执行回调
   */
  onLoginReady(callback) {
    if (this.globalData.userInfo) {
      callback(this.globalData.userInfo)
    } else {
      if (!this._loginReadyCallbacks) {
        this._loginReadyCallbacks = []
      }
      this._loginReadyCallbacks.push(callback)
    }
  },

  globalData: {
    userInfo: null,
    baseUrl: '' // 接口地址，后续配置
  }
})
