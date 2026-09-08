/**
 * 网络请求封装
 * 统一处理 token 注入、错误提示、登录过期跳转
 */

const BASE_URL = '' // 接口地址，上线时配置

const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')

    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.header
      },
      success(res) {
        const data = res.data
        // 业务层统一判断
        if (data.code === 200 || data.code === 0) {
          resolve(data.data)
        } else if (data.code === 401) {
          // token 过期，清除登录态，跳转登录
          wx.removeStorageSync('token')
          wx.removeStorageSync('userInfo')
          wx.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
          reject(new Error('未授权'))
        } else {
          wx.showToast({ title: data.msg || '请求失败', icon: 'none' })
          reject(new Error(data.msg || '请求失败'))
        }
      },
      fail(err) {
        wx.showToast({ title: '网络异常', icon: 'none' })
        reject(err)
      }
    })
  })
}

const get = (url, data) => request({ url, method: 'GET', data })
const post = (url, data) => request({ url, method: 'POST', data })
const put = (url, data) => request({ url, method: 'PUT', data })
const del = (url, data) => request({ url, method: 'DELETE', data })

module.exports = { request, get, post, put, del }
