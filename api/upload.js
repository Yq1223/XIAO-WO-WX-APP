/**
 * 文件上传接口
 */
const { getToken } = require('../utils/auth')
const { BASE_URL } = require('../utils/constants')

/**
 * 上传图片
 * @param {string} filePath - 本地临时文件路径
 * @returns {Promise<Object>} - { url, ... }
 */
function uploadImage(filePath) {
  return new Promise((resolve, reject) => {
    const token = getToken()
    wx.uploadFile({
      url: `${BASE_URL}/api/v1/upload/image`,
      filePath,
      name: 'file',
      header: {
        Authorization: token ? `Bearer ${token}` : ''
      },
      success(res) {
        if (res.statusCode === 200) {
          try {
            const data = JSON.parse(res.data)
            if (data.code === 0 || data.code === 200) {
              resolve(data.data)
            } else {
              reject(new Error(data.message || '上传失败'))
            }
          } catch (e) {
            reject(new Error('解析上传结果失败'))
          }
        } else if (res.statusCode === 401) {
          wx.navigateTo({ url: '/pages/login/index' })
          reject(new Error('登录已过期'))
        } else {
          reject(new Error(`上传失败: ${res.statusCode}`))
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  uploadImage
}
