// pages/splash/index.js - 开屏广告页
const app = getApp()

Page({
  data: {
    // 动画控制
    logoAnimation: false,
    nameAnimation: false,
    slogan1Animation: false,
    slogan2Animation: false,
    dividerAnimation: false,
    btnAnimation: false,
    footerAnimation: false,

    // 跳过倒计时
    showSkip: true,
    countdown: 5
  },

  /** 定时器句柄 */
  _timer: null,
  _countdownTimer: null,

  onLoad() {
    // 检查是否首次打开（可选：每天只显示一次开屏广告）
    // const lastSplashDate = wx.getStorageSync('lastSplashDate')
    // const today = new Date().toDateString()
    // if (lastSplashDate === today) {
    //   this._goHome()
    //   return
    // }

    this._startAnimations()
    this._startCountdown()
  },

  onUnload() {
    // 页面卸载时清理定时器
    if (this._timer) clearTimeout(this._timer)
    if (this._countdownTimer) clearInterval(this._countdownTimer)
  },

  /**
   * 启动逐帧动画
   */
  _startAnimations() {
    // 第1帧：Logo 弹出（立即）
    setTimeout(() => {
      this.setData({ logoAnimation: true })
    }, 200)

    // 第2帧：应用名（+400ms）
    setTimeout(() => {
      this.setData({ nameAnimation: true })
    }, 600)

    // 第3帧：口号1（+400ms）
    setTimeout(() => {
      this.setData({ slogan1Animation: true })
    }, 1000)

    // 第4帧：口号2（+300ms）
    setTimeout(() => {
      this.setData({ slogan2Animation: true })
    }, 1300)

    // 第5帧：分割线（+300ms）
    setTimeout(() => {
      this.setData({ dividerAnimation: true })
    }, 1600)

    // 第6帧：进入按钮（+200ms）
    setTimeout(() => {
      this.setData({ btnAnimation: true })
    }, 1800)

    // 第7帧：底部版权（+200ms）
    setTimeout(() => {
      this.setData({ footerAnimation: true })
    }, 2200)
  },

  /**
   * 倒计时（自动跳过）
   */
  _startCountdown() {
    this._countdownTimer = setInterval(() => {
      let count = this.data.countdown - 1
      if (count <= 0) {
        clearInterval(this._countdownTimer)
        this._goHome()
        return
      }
      this.setData({ countdown: count })
    }, 1000)
  },

  /**
   * 点击「进入校窝」
   */
  onEnter() {
    this._goHome()
  },

  /**
   * 点击「跳过」
   */
  onSkip() {
    this._goHome()
  },

  /**
   * 跳转到首页
   */
  _goHome() {
    // 清理定时器
    if (this._timer) clearTimeout(this._timer)
    if (this._countdownTimer) clearInterval(this._countdownTimer)

    // 记录今天已展示过（可选：每天只展示一次）
    // wx.setStorageSync('lastSplashDate', new Date().toDateString())

    // 跳转到首页（tabBar 页面必须用 switchTab）
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
