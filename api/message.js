/**
 * 消息/会话相关接口
 */
const { get, post } = require('../utils/request')

/**
 * 获取会话列表
 * @param {Object} params - { pageNum, pageSize }
 */
function getConversations(params) {
  return get('/api/v1/messages/conversations', params)
}

/**
 * 创建会话（联系卖家等场景）
 * @param {string|number} targetUserId
 */
function createConversation(targetUserId) {
  return post('/api/v1/messages/conversations', { targetUserId })
}

/**
 * 获取会话内的消息列表
 * @param {string|number} conversationId
 * @param {Object} params - { pageNum, pageSize }
 */
function getMessages(conversationId, params) {
  return get(`/api/v1/messages/conversations/${conversationId}`, params)
}

/**
 * 发送消息
 * @param {Object} data - { conversationId, content, type, extra }
 *   type: 'text' | 'image' | 'item_card'
 */
function sendMessage(data) {
  return post('/api/v1/messages/send', data)
}

/**
 * 获取未读消息数
 */
function getUnreadCount() {
  return get('/api/v1/messages/unread-count')
}

module.exports = {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
  getUnreadCount
}
