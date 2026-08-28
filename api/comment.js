/**
 * 评论相关接口
 */
const { get, post, del } = require('../utils/request')

/**
 * 获取评论列表
 * @param {Object} params - { targetId, targetType, pageNum, pageSize }
 *   targetType: 'post' | 'confession' | 'item'
 */
function getComments(params) {
  return get('/api/v1/comments', params)
}

/**
 * 发表评论
 * @param {Object} data - { targetId, targetType, content, parentId }
 */
function createComment(data) {
  return post('/api/v1/comments', data)
}

/**
 * 删除评论
 * @param {string|number} commentId
 */
function deleteComment(commentId) {
  return del(`/api/v1/comments/${commentId}`)
}

/**
 * 点赞评论
 * @param {string|number} commentId
 */
function likeComment(commentId) {
  return post(`/api/v1/comments/${commentId}/like`)
}

module.exports = {
  getComments,
  createComment,
  deleteComment,
  likeComment
}
