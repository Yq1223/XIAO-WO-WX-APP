/**
 * 用户相关接口
 */
const { get, put } = require('../utils/request')

/**
 * 获取当前用户信息
 */
function getUserInfo() {
  return get('/api/v1/user/info')
}

/**
 * 根据ID获取用户信息
 * @param {string|number} userId
 */
function getUserById(userId) {
  return get(`/api/v1/user/${userId}`)
}

/**
 * 更新用户信息
 * @param {Object} data - 要更新的字段
 */
function updateUser(data) {
  return put('/api/v1/user/info', data)
}

/**
 * 获取用户的帖子列表
 * @param {string|number} userId
 * @param {Object} params - { pageNum, pageSize, ... }
 */
function getUserPosts(userId, params) {
  return get(`/api/v1/user/${userId}/posts`, params)
}

/**
 * 获取用户的商品列表
 * @param {string|number} userId
 * @param {Object} params
 */
function getUserItems(userId, params) {
  return get(`/api/v1/user/${userId}/items`, params)
}

/**
 * 获取收藏列表
 * @param {Object} params - { type, pageNum, pageSize }
 */
function getCollections(params) {
  return get('/api/v1/user/collections', params)
}

/**
 * 获取浏览记录
 * @param {Object} params
 */
function getHistory(params) {
  return get('/api/v1/user/history', params)
}

module.exports = {
  getUserInfo,
  getUserById,
  updateUser,
  getUserPosts,
  getUserItems,
  getCollections,
  getHistory
}
