/**
 * 私聊页面
 */
const messageApi = require('../../api/message')
const { uploadImage } = require('../../api/upload')
const { formatTime, showToast } = require('../../utils/util')

const app = getApp()

Page({
  data: {
    conversationId: '',
    targetUser: {},
    messages: [],
    inputValue: '',
    myAvatar: '',
    pageNum: 1,
    hasMore: false,
    loading: false,
    scrollToMessage: '',
    socketTask: null
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        conversationId: options.id,
        myAvatar: (app.globalData.userInfo && app.globalData.userInfo.avatar) || '/static/images/default-avatar.png'
      })
      if (options.targetName) {
        wx.setNavigationBarTitle({ title: options.targetName })
      }
      this.loadMessages(true)
      this.initWebSocket()
    }
  },

  onUnload() {
    // 页面卸载时关闭WebSocket
    if (this.data.socketTask) {
      this.data.socketTask.close()
    }
  },

  /**
   * 初始化WebSocket连接
   */
  initWebSocket() {
    const token = wx.getStorageSync('token')
    const wsUrl = `wss://api.xiaowo.com/ws/chat?token=${token}&conversationId=${this.data.conversationId}`

    const socketTask = wx.connectSocket({
      url: wsUrl,
      success: () => console.log('WebSocket连接成功'),
      fail: (err) => console.error('WebSocket连接失败:', err)
    })

    socketTask.onMessage((res) => {
      try {
        const data = JSON.parse(res.data)
        if (data.type === 'message') {
          this.appendMessage(data.message)
        }
      } catch (e) {}
    })

    socketTask.onClose(() => {
      console.log('WebSocket已关闭')
    })

    this.setData({ socketTask })
  },

  /**
   * 加载历史消息
   */
  async loadMessages(refresh = false) {
    if (this.data.loading) return
    const pageNum = refresh ? 1 : this.data.pageNum
    this.setData({ loading: true })

    try {
      const res = await messageApi.getMessages(this.data.conversationId, {
        pageNum,
        pageSize: 30
      })
      const list = (res.list || res || []).map(msg => ({
        ...msg,
        isSelf: msg.senderId === (app.globalData.userInfo && app.globalData.userInfo.id)
      }))

      this.setData({
        messages: refresh ? list : [...list, ...this.data.messages],
        pageNum: pageNum + 1,
        hasMore: list.length >= 30,
        loading: false
      })

      if (refresh && list.length > 0) {
        this.scrollToBottom()
      }
    } catch (err) {
      console.error('加载消息失败:', err)
      this.setData({ loading: false })
    }
  },

  /**
   * 追加新消息
   */
  appendMessage(msg) {
    const messages = [...this.data.messages, {
      ...msg,
      isSelf: msg.senderId === (app.globalData.userInfo && app.globalData.userInfo.id)
    }]
    this.setData({ messages })
    this.scrollToBottom()
  },

  scrollToBottom() {
    const { messages } = this.data
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1]
      this.setData({ scrollToMessage: `msg-${lastMsg.id}` })
    }
  },

  onLoadMore() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadMessages(false)
    }
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value })
  },

  /**
   * 发送文本消息
   */
  async onSendText() {
    const { inputValue, conversationId } = this.data
    if (!inputValue.trim()) return

    const content = inputValue.trim()
    this.setData({ inputValue: '' })

    try {
      // 先通过WebSocket发送（实时）
      if (this.data.socketTask) {
        this.data.socketTask.send({
          data: JSON.stringify({
            type: 'text',
            conversationId,
            content
          })
        })
      }
      // 同时调用HTTP API存档
      await messageApi.sendMessage({
        conversationId,
        content,
        type: 'text'
      })
    } catch (err) {
      showToast('发送失败')
    }
  },

  /**
   * 发送图片消息
   */
  onChooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: async (res) => {
        const filePath = res.tempFiles[0].tempFilePath
        try {
          const uploadRes = await uploadImage(filePath)
          const imageUrl = uploadRes.url || uploadRes
          await messageApi.sendMessage({
            conversationId: this.data.conversationId,
            content: imageUrl,
            type: 'image'
          })
          // 本地追加
          this.appendMessage({
            id: Date.now(),
            content: imageUrl,
            type: 'image',
            senderId: app.globalData.userInfo && app.globalData.userInfo.id
          })
        } catch (err) {
          showToast('发送图片失败')
        }
      }
    })
  },

  onPreviewImage(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: [e.currentTarget.dataset.url]
    })
  },

  onTapItemCard(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/detail/market/index?id=${id}` })
  }
})
