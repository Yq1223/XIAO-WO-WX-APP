/**
 * 登录鉴权工具
 */
const { BASE_URL } = require('./constants')

const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_INFO_KEY = 'userInfo'

/**
 * 微信登录：获取code -> 调用后端换取token
 * @returns {Promise<Object>} 登录结果（含token和用户信息）
 */
function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (!res.code) {
          reject(new Error('wx.login 获取 code 失败'))
          return
        }
        // 调用后端登录接口
        wx.request({
          url: `${BASE_URL}/api/v1/auth/wx-login`,
          method: 'POST',
          data: { code: res.code },
          success(response) {
            const { statusCode, data } = response
            if (statusCode === 200 && data.code === 0) {
              const { token, refreshToken, userInfo } = data.data
              // 存储token和用户信息
              setToken(token)
              if (refreshToken) {
                wx.setStorageSync(REFRESH_TOKEN_KEY, refreshToken)
              }
              wx.setStorageSync(USER_INFO_KEY, userInfo)
              // 更新全局状态
              const app = getApp()
              if (app) {
                app.globalData.token = token
                app.globalData.isLoggedIn = true
                app.globalData.userInfo = userInfo
              }
              resolve(data.data)
            } else {
              reject(new Error(data.message || '登录失败'))
            }
          },
          fail(err) {
            reject(err)
          }
        })
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 * 检查是否已登录（本地token是否存在）
 * @returns {boolean}
 */
function checkLogin() {
  const token = wx.getStorageSync(TOKEN_KEY)
  return !!token
}

/**
 * 获取token
 * @returns {string}
 */
function getToken() {
  return wx.getStorageSync(TOKEN_KEY) || ''
}

/**
 * 设置token
 * @param {string} token
 */
function setToken(token) {
  wx.setStorageSync(TOKEN_KEY, token)
}

/**
 * 移除token
 */
function removeToken() {
  wx.removeStorageSync(TOKEN_KEY)
  wx.removeStorageSync(REFRESH_TOKEN_KEY)
}

/**
 * 退出登录
 */
function logout() {
  removeToken()
  wx.removeStorageSync(USER_INFO_KEY)
  const app = getApp()
  if (app) {
    app.globalData.token = ''
    app.globalData.isLoggedIn = false
    app.globalData.userInfo = null
  }
}

module.exports = {
  login,
  checkLogin,
  getToken,
  setToken,
  removeToken,
  logout
}
