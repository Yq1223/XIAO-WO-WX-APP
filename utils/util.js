/**
 * 通用工具函数
 */

/**
 * 时间格式化
 * @param {Date|string|number} date - 日期对象、时间字符串或时间戳
 * @returns {string} 格式化后的时间字符串
 */
function formatTime(date) {
  if (!date) return ''
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }

  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  // 刚刚（1分钟内）
  if (seconds < 60) return '刚刚'
  // x分钟前（1小时内）
  if (minutes < 60) return `${minutes}分钟前`
  // x小时前（24小时内）
  if (hours < 24) return `${hours}小时前`
  // x天前（7天内）
  if (days < 7) return `${days}天前`
  // 超过7天显示完整日期
  const year = date.getFullYear()
  const month = formatNumber(date.getMonth() + 1)
  const day = formatNumber(date.getDate())
  const hour = formatNumber(date.getHours())
  const minute = formatNumber(date.getMinutes())

  if (year === now.getFullYear()) {
    return `${month}-${day} ${hour}:${minute}`
  }
  return `${year}-${month}-${day} ${hour}:${minute}`
}

/**
 * 数字格式化（补零）
 * @param {number} n
 * @returns {string}
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 数字缩写（如 1.2万）
 * @param {number} num
 * @returns {string}
 */
function formatCount(num) {
  if (!num && num !== 0) return '0'
  num = Number(num)
  if (num < 1000) return num.toString()
  if (num < 10000) return (num / 1000).toFixed(1) + 'k'
  return (num / 10000).toFixed(1) + '万'
}

/**
 * 防抖
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function}
 */
function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 节流
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 间隔时间(ms)
 * @returns {Function}
 */
function throttle(fn, delay = 300) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * 显示轻提示
 * @param {string} title - 提示文字
 * @param {string} [icon='none'] - 图标类型
 */
function showToast(title, icon = 'none') {
  wx.showToast({ title, icon, duration: 2000 })
}

/**
 * 显示成功提示
 * @param {string} title
 */
function showSuccess(title) {
  wx.showToast({ title, icon: 'success', duration: 1500 })
}

/**
 * 显示错误提示
 * @param {string} title
 */
function showError(title) {
  wx.showToast({ title, icon: 'none', duration: 2000 })
}

/**
 * 显示确认对话框
 * @param {string} content - 提示内容
 * @param {string} [title='提示'] - 标题
 * @returns {Promise<boolean>}
 */
function showConfirm(content, title = '提示') {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      confirmColor: '#FF6B35',
      success(res) {
        resolve(res.confirm)
      },
      fail() {
        resolve(false)
      }
    })
  })
}

module.exports = {
  formatTime,
  formatNumber,
  formatCount,
  debounce,
  throttle,
  showToast,
  showSuccess,
  showError,
  showConfirm
}
