/**
 * 通知相关接口
 */
const { get, put, post } = require('../utils/request')

/**
 * 获取通知列表
 * @param {Object} params - { type, pageNum, pageSize }
 */
function getNotifications(params) {
  return get('/api/v1/notifications', params)
}

/**
 * 获取未读通知数
 */
function getUnreadCount() {
  return get('/api/v1/notifications/unread-count')
}

/**
 * 全部标记已读
 */
function markAllRead() {
  return put('/api/v1/notifications/read-all')
}

/**
 * 单条标记已读
 * @param {string|number} id
 */
function markRead(id) {
  return put(`/api/v1/notifications/${id}/read`)
}

module.exports = {
  getNotifications,
  getUnreadCount,
  markAllRead,
  markRead
}
