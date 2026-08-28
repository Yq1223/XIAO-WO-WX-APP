/**
 * 帖子相关接口
 */
const { get, post, put, del } = require('../utils/request')

/**
 * 获取帖子列表
 * @param {Object} params - { category, pageNum, pageSize, sort }
 */
function getPostList(params) {
  return get('/api/v1/posts', params)
}

/**
 * 获取帖子详情
 * @param {string|number} postId
 */
function getPostDetail(postId) {
  return get(`/api/v1/posts/${postId}`)
}

/**
 * 创建帖子
 * @param {Object} data - { title, content, category, images, isAnonymous }
 */
function createPost(data) {
  return post('/api/v1/posts', data, { showLoading: true })
}

/**
 * 更新帖子
 * @param {string|number} postId
 * @param {Object} data
 */
function updatePost(postId, data) {
  return put(`/api/v1/posts/${postId}`, data)
}

/**
 * 删除帖子
 * @param {string|number} postId
 */
function deletePost(postId) {
  return del(`/api/v1/posts/${postId}`)
}

/**
 * 点赞帖子
 * @param {string|number} postId
 */
function likePost(postId) {
  return post(`/api/v1/posts/${postId}/like`)
}

/**
 * 收藏帖子
 * @param {string|number} postId
 */
function collectPost(postId) {
  return post(`/api/v1/posts/${postId}/collect`)
}

/**
 * 搜索帖子
 * @param {string} keyword
 * @param {Object} params - { pageNum, pageSize }
 */
function searchPosts(keyword, params) {
  return get('/api/v1/posts/search', { keyword, ...params })
}

module.exports = {
  getPostList,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
  likePost,
  collectPost,
  searchPosts
}
