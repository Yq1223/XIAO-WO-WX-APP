/**
 * 常量定义
 */

// 环境切换：开发环境用localhost，生产环境用正式域名
const ENV = 'develop' // 'develop' | 'production'

const BASE_URL_MAP = {
  develop: 'http://localhost:8080',
  production: 'https://api.xiaowo.com'
}

const BASE_URL = BASE_URL_MAP[ENV]

// 帖子分类
const POST_CATEGORY = [
  { value: 0, label: '全部' },
  { value: 1, label: '热点' },
  { value: 2, label: '美食' },
  { value: 3, label: '学习' },
  { value: 4, label: '情感' },
  { value: 5, label: '游戏' },
  { value: 6, label: '其他' }
]

// 帖子分类映射（value -> label）
const POST_CATEGORY_MAP = {}
POST_CATEGORY.forEach(item => {
  POST_CATEGORY_MAP[item.value] = item.label
})

// 表白墙类型
const CONFESSION_TYPE = [
  { value: 0, label: '全部' },
  { value: 1, label: '表白' },
  { value: 2, label: '捞人' },
  { value: 3, label: '树洞' }
]

const CONFESSION_TYPE_MAP = {}
CONFESSION_TYPE.forEach(item => {
  CONFESSION_TYPE_MAP[item.value] = item.label
})

// 商品分类
const ITEM_CATEGORY = [
  { value: 0, label: '全部' },
  { value: 1, label: '数码' },
  { value: 2, label: '教材' },
  { value: 3, label: '日用' },
  { value: 4, label: '衣物' },
  { value: 5, label: '运动' },
  { value: 6, label: '其他' }
]

const ITEM_CATEGORY_MAP = {}
ITEM_CATEGORY.forEach(item => {
  ITEM_CATEGORY_MAP[item.value] = item.label
})

// 商品成色
const ITEM_CONDITION = [
  { value: 1, label: '全新' },
  { value: 2, label: '几乎全新' },
  { value: 3, label: '轻微使用' },
  { value: 4, label: '明显使用' }
]

const ITEM_CONDITION_MAP = {}
ITEM_CONDITION.forEach(item => {
  ITEM_CONDITION_MAP[item.value] = item.label
})

// 交易方式
const TRADE_METHOD = [
  { value: 1, label: '校内面交' },
  { value: 2, label: '快递邮寄' },
  { value: 3, label: '均可' }
]

const TRADE_METHOD_MAP = {}
TRADE_METHOD.forEach(item => {
  TRADE_METHOD_MAP[item.value] = item.label
})

// 分类颜色映射
const CATEGORY_COLOR_MAP = {
  0: '#FF6B35', // 全部
  1: '#FF4D4F', // 热点/数码
  2: '#FAAD14', // 美食/教材
  3: '#2A9D8F', // 学习/日用
  4: '#FF69B4', // 情感/衣物
  5: '#722ED1', // 游戏/运动
  6: '#999999'  // 其他
}

// 默认头像
const DEFAULT_AVATAR = '/static/images/default-avatar.png'

// 分页默认值
const PAGE_SIZE = 20

module.exports = {
  ENV,
  BASE_URL,
  POST_CATEGORY,
  POST_CATEGORY_MAP,
  CONFESSION_TYPE,
  CONFESSION_TYPE_MAP,
  ITEM_CATEGORY,
  ITEM_CATEGORY_MAP,
  ITEM_CONDITION,
  ITEM_CONDITION_MAP,
  TRADE_METHOD,
  TRADE_METHOD_MAP,
  CATEGORY_COLOR_MAP,
  DEFAULT_AVATAR,
  PAGE_SIZE
}
