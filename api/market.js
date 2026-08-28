/**
 * 跳蚤市场相关接口
 */
const { get, post, put, del } = require('../utils/request')

/**
 * 获取商品列表
 * @param {Object} params - { category, sort, minPrice, maxPrice, pageNum, pageSize }
 */
function getMarketList(params) {
  return get('/api/v1/market/items', params)
}

/**
 * 获取商品详情
 * @param {string|number} itemId
 */
function getItemDetail(itemId) {
  return get(`/api/v1/market/items/${itemId}`)
}

/**
 * 发布商品
 * @param {Object} data - { title, description, images, category, price, originalPrice, condition, tradeMethod, location, isAnonymous }
 */
function createItem(data) {
  return post('/api/v1/market/items', data, { showLoading: true })
}

/**
 * 更新商品
 * @param {string|number} itemId
 * @param {Object} data
 */
function updateItem(itemId, data) {
  return put(`/api/v1/market/items/${itemId}`, data)
}

/**
 * 更新商品状态（已售/下架等）
 * @param {string|number} itemId
 * @param {number} status
 */
function updateItemStatus(itemId, status) {
  return put(`/api/v1/market/items/${itemId}/status`, { status })
}

/**
 * 删除商品
 * @param {string|number} itemId
 */
function deleteItem(itemId) {
  return del(`/api/v1/market/items/${itemId}`)
}

/**
 * 收藏商品
 * @param {string|number} itemId
 */
function likeItem(itemId) {
  return post(`/api/v1/market/items/${itemId}/like`)
}

/**
 * 搜索商品
 * @param {string} keyword
 * @param {Object} params
 */
function searchItems(keyword, params) {
  return get('/api/v1/market/items/search', { keyword, ...params })
}

module.exports = {
  getMarketList,
  getItemDetail,
  createItem,
  updateItem,
  updateItemStatus,
  deleteItem,
  likeItem,
  searchItems
}
