/**
 * 用户头像昵称组件
 * properties: user(Object), isAnonymous(Boolean), showName(Boolean), showSchool(Boolean), size(Number)
 * events: tap
 */
Component({
  properties: {
    user: {
      type: Object,
      value: {}
    },
    isAnonymous: {
      type: Boolean,
      value: false
    },
    showName: {
      type: Boolean,
      value: true
    },
    showSchool: {
      type: Boolean,
      value: true
    },
    size: {
      type: Number,
      value: 72
    }
  },

  methods: {
    onTap() {
      const { user, isAnonymous } = this.data
      if (!isAnonymous && user && user.id) {
        wx.navigateTo({ url: `/pages/profile/index?id=${user.id}` })
      }
      this.triggerEvent('tap', { user: this.data.user })
    }
  }
})
