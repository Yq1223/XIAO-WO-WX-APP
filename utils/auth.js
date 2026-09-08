/**
 * 微信登录工具
 * 使用 wx.login() 获取 code，换取服务端 token
 */

const { post } = require('./request')

/**
 * 微信静默登录（获取 code）
 * @returns {Promise<string>} code
 */
const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject(new Error('wx.login 失败'))
        }
      },
      fail: reject
    })
  })
}

/**
 * 获取用户头像昵称（微信新版能力）
 * 需要用户主动点击 button 触发
 * @returns {Promise<{nickName: string, avatarUrl: string}>}
 */
const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => resolve(res.userInfo),
      fail: reject
    })
  })
}

/**
 * 完整登录流程
 * 1. wx.login 获取 code
 * 2. 调用后端 /api/v1/auth/wx-login
 * 3. 存储 token 和用户信息
 * @param {object} userInfo - 可选，包含 nickname、avatar、gender
 * @returns {Promise<object>} 登录结果
 */
const login = async (userInfo = {}) => {
  const code = await wxLogin()

  const data = { code }
  if (userInfo.nickName) {
    data.nickname = userInfo.nickName
    data.avatar = userInfo.avatarUrl
    data.gender = userInfo.gender || 0
  }

  const result = await post('/api/v1/auth/wx-login', data)

  // 存储登录态
  wx.setStorageSync('token', result.token)
  wx.setStorageSync('userId', result.userId)

  const userInfoToStore = {
    nickName: result.nickname,
    avatarUrl: result.avatar,
    role: result.role === 1 ? 'user' : 'admin'
  }
  wx.setStorageSync('userInfo', userInfoToStore)

  return result
}

/**
 * 检查是否已登录
 */
const isLoggedIn = () => {
  return !!wx.getStorageSync('token')
}

/**
 * 退出登录
 */
const logout = () => {
  wx.removeStorageSync('token')
  wx.removeStorageSync('userId')
  wx.removeStorageSync('userInfo')
  wx.removeStorageSync('userStats')
}

module.exports = { wxLogin, getUserProfile, login, isLoggedIn, logout }
