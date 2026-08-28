/**
 * 自定义导航栏组件
 * properties: title(String), back(Boolean), bgColor(String)
 * events: back
 */
Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: false
    },
    bgColor: {
      type: String,
      value: '#FF6B35'
    }
  },

  data: {
    statusBarHeight: 20,
    navBarHeight: 44
  },

  lifetimes: {
    attached() {
      const app = getApp()
      if (app) {
        this.setData({
          statusBarHeight: app.globalData.statusBarHeight || 20,
          navBarHeight: app.globalData.navBarHeight || 44
        })
      }
    }
  },

  methods: {
    onBack() {
      this.triggerEvent('back')
      wx.navigateBack({ delta: 1 })
    }
  }
})
