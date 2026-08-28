/**
 * 网络请求封装
 * - 自动携带 Authorization Bearer token
 * - 统一错误处理（401跳登录页）
 * - 请求/响应拦截
 */
const { getToken, removeToken } = require('./auth')
const { BASE_URL } = require('./constants')

// 请求队列（用于401时暂停后续请求）
let isRefreshing = false
let requestQueue = []

/**
 * 核心请求方法
 * @param {Object} options - 请求配置
 * @param {string} options.url - 接口路径（不含基础URL）
 * @param {string} [options.method='GET'] - 请求方法
 * @param {Object} [options.data] - 请求数据
 * @param {Object} [options.header] - 自定义请求头
 * @param {boolean} [options.showLoading=false] - 是否显示loading
 * @param {boolean} [options.showError=true] - 是否显示错误提示
 * @returns {Promise}
 */
function request(options = {}) {
  const {
    url,
    method = 'GET',
    data,
    header = {},
    showLoading = false,
    showError = true
  } = options

  return new Promise((resolve, reject) => {
    // 显示loading
    if (showLoading) {
      wx.showLoading({ title: '加载中...', mask: true })
    }

    // 自动携带token
    const token = getToken()
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {}

    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...authHeader,
        ...header
      },
      success(res) {
        if (showLoading) wx.hideLoading()

        const { statusCode, data: resData } = res

        // 请求成功
        if (statusCode >= 200 && statusCode < 300) {
          // 业务层成功
          if (resData.code === 0 || resData.code === 200) {
            resolve(resData.data || resData)
          } else {
            // 业务层错误
            const errMsg = resData.message || '请求失败'
            if (showError) {
              wx.showToast({ title: errMsg, icon: 'none', duration: 2000 })
            }
            reject(new Error(errMsg))
          }
        } else if (statusCode === 401) {
          // token过期，清除登录态并跳转登录页
          handleUnauthorized()
          reject(new Error('登录已过期，请重新登录'))
        } else if (statusCode === 403) {
          if (showError) {
            wx.showToast({ title: '没有权限访问', icon: 'none' })
          }
          reject(new Error('没有权限'))
        } else if (statusCode === 404) {
          if (showError) {
            wx.showToast({ title: '资源不存在', icon: 'none' })
          }
          reject(new Error('资源不存在'))
        } else if (statusCode >= 500) {
          if (showError) {
            wx.showToast({ title: '服务器开小差了', icon: 'none' })
          }
          reject(new Error('服务器错误'))
        } else {
          reject(new Error(`请求失败: ${statusCode}`))
        }
      },
      fail(err) {
        if (showLoading) wx.hideLoading()
        if (showError) {
          wx.showToast({ title: '网络连接失败', icon: 'none' })
        }
        reject(err)
      }
    })
  })
}

/**
 * 处理401未授权
 */
function handleUnauthorized() {
  removeToken()
  wx.removeStorageSync('userInfo')
  const app = getApp()
  if (app) {
    app.globalData.isLoggedIn = false
    app.globalData.userInfo = null
    app.globalData.token = ''
  }
  // 跳转登录页
  wx.navigateTo({ url: '/pages/login/index' })
}

// 快捷方法
function get(url, data, options = {}) {
  return request({ url, method: 'GET', data, ...options })
}

function post(url, data, options = {}) {
  return request({ url, method: 'POST', data, ...options })
}

function put(url, data, options = {}) {
  return request({ url, method: 'PUT', data, ...options })
}

function del(url, data, options = {}) {
  return request({ url, method: 'DELETE', data, ...options })
}

module.exports = {
  request,
  get,
  post,
  put,
  del
}
