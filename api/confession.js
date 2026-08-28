/**
 * 表白墙相关接口
 */
const { get, post, del } = require('../utils/request')

/**
 * 获取表白墙列表
 * @param {Object} params - { type, pageNum, pageSize }
 */
function getConfessionList(params) {
  return get('/api/v1/confessions', params)
}

/**
 * 获取表白详情
 * @param {string|number} id
 */
function getConfessionDetail(id) {
  return get(`/api/v1/confessions/${id}`)
}

/**
 * 发表表白
 * @param {Object} data - { type, content, images, targetDesc }
 */
function createConfession(data) {
  return post('/api/v1/confessions', data, { showLoading: true })
}

/**
 * 删除表白
 * @param {string|number} id
 */
function deleteConfession(id) {
  return del(`/api/v1/confessions/${id}`)
}

/**
 * 点赞表白
 * @param {string|number} id
 */
function likeConfession(id) {
  return post(`/api/v1/confessions/${id}/like`)
}

/**
 * 收藏表白
 * @param {string|number} id
 */
function collectConfession(id) {
  return post(`/api/v1/confessions/${id}/collect`)
}

module.exports = {
  getConfessionList,
  getConfessionDetail,
  createConfession,
  deleteConfession,
  likeConfession,
  collectConfession
}
