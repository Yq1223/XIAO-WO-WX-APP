/**
 * 认证相关接口
 */
const { post } = require('../utils/request')

/**
 * 微信登录
 * @param {string} code - wx.login 获取的 code
 */
function wxLogin(code) {
  return post('/api/v1/auth/wx-login', { code })
}

/**
 * 刷新token
 */
function refreshToken() {
  return post('/api/v1/auth/refresh-token')
}

module.exports = {
  wxLogin,
  refreshToken
}
