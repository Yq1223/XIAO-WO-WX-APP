/**
 * 底部评论输入框组件
 * properties: placeholder(String), focus(Boolean)
 * events: send(content)
 */
Component({
  properties: {
    placeholder: {
      type: String,
      value: '说点什么...'
    },
    focus: {
      type: Boolean,
      value: false
    }
  },

  data: {
    value: '',
    focused: false
  },

  methods: {
    onInput(e) {
      this.setData({ value: e.detail.value })
    },

    onFocus() {
      this.setData({ focused: true })
    },

    onBlur() {
      this.setData({ focused: false })
    },

    onSend() {
      const { value } = this.data
      if (!value || !value.trim()) return

      this.triggerEvent('send', { content: value.trim() })
      this.setData({ value: '' })
    },

    // 外部调用：清空输入框
    clear() {
      this.setData({ value: '' })
    },

    // 外部调用：聚焦
    focus() {
      this.setData({ focus: true })
    }
  }
})
