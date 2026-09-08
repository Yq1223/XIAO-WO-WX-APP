// 子版块颜色配置
const TAG_COLORS = {
  '校园动态': '#FF6B35',
  '失物招领': '#E74C3C',
  '活动发布': '#9B59B6',
  '表白墙': '#E91E8B',
  '树洞': '#27AE60',
  '校园论坛': '#3498DB',
  '闲置交易': '#FF6B35',
  '求购专区': '#E67E22',
  '学长学姐传承': '#1ABC9C',
  '交易评价': '#F39C12',
  '拼车拼团': '#8E44AD',
  '外卖跑腿': '#E74C3C',
  '投票问卷': '#2980B9',
  '表白点歌': '#E91E8B'
}

// ===== 动态（首页） =====
const MOCK_DYNAMIC = [
  {
    id: 1, type: '动态',
    title: '今天食堂的红烧肉太好吃了！',
    content: '强烈推荐二食堂三楼的红烧肉，肥而不腻，入口即化，配上米饭简直绝了！',
    images: [], subType: '校园动态',
    viewCount: 128, likeCount: 32, commentCount: 8, collectCount: 15,
    createdAt: '2026-09-08 12:30'
  },
  {
    id: 2, type: '动态',
    title: '有没有一起考研的同学？',
    content: '准备考计算机方向，目标985，有没有一起自习的小伙伴，可以互相监督。',
    images: [], subType: '校园动态',
    viewCount: 256, likeCount: 45, commentCount: 23, collectCount: 8,
    createdAt: '2026-09-07 18:00'
  },
  {
    id: 3, type: '动态',
    title: '校园日落太美了',
    content: '今天傍晚在操场拍的，分享给大家。',
    images: ['/static/images/default-avatar.png'], subType: '校园动态',
    viewCount: 512, likeCount: 89, commentCount: 15, collectCount: 36,
    createdAt: '2026-09-06 19:20'
  },
  {
    id: 4, type: '动态',
    title: '在图书馆捡到一个U盘',
    content: '三楼自习区捡到一个银色U盘，16G的，失主请联系我认领。',
    images: [], subType: '失物招领',
    viewCount: 87, likeCount: 3, commentCount: 5, collectCount: 0,
    createdAt: '2026-09-08 09:15'
  },
  {
    id: 5, type: '动态',
    title: '谁丢了一把雨伞？',
    content: '昨天晚上在教学楼A栋门口捡到一把蓝色折叠伞，放在门卫处了。',
    images: [], subType: '失物招领',
    viewCount: 45, likeCount: 2, commentCount: 1, collectCount: 0,
    createdAt: '2026-09-07 20:00'
  },
  {
    id: 6, type: '动态',
    title: '校园歌手大赛开始报名啦！',
    content: '一年一度的校园歌手大赛开始报名，时间9月15日-9月30日，地点大礼堂，欢迎各位同学踊跃参加！',
    images: ['/static/images/default-avatar.png'], subType: '活动发布',
    viewCount: 1024, likeCount: 156, commentCount: 42, collectCount: 88,
    createdAt: '2026-09-06 10:00'
  },
  {
    id: 7, type: '动态',
    title: '中秋游园会志愿者招募',
    content: '中秋游园会需要20名志愿者，有意者请在评论区报名，有志愿时长哦！',
    images: [], subType: '活动发布',
    viewCount: 320, likeCount: 67, commentCount: 28, collectCount: 12,
    createdAt: '2026-09-05 14:30'
  }
]

// ===== 社区 =====
const MOCK_COMMUNITY = [
  {
    id: 1, type: '社区',
    title: '',
    content: '图书馆三楼靠窗那个穿白衬衫的同学，你认真看书的样子真的好好看！',
    images: [], subType: '表白墙', isAnonymous: 1,
    likeCount: 56, commentCount: 12, collectCount: 5,
    createdAt: '2026-09-08 10:00'
  },
  {
    id: 2, type: '社区',
    title: '',
    content: '每次路过篮球场都会多看几眼，那个投三分球的男生也太帅了吧！',
    images: [], subType: '表白墙', isAnonymous: 1,
    likeCount: 89, commentCount: 20, collectCount: 8,
    createdAt: '2026-09-07 16:00'
  },
  {
    id: 3, type: '社区',
    title: '',
    content: '最近压力好大，期末考试还有两周，感觉自己什么都没准备好，焦虑到失眠……',
    images: [], subType: '树洞', isAnonymous: 1,
    likeCount: 128, commentCount: 45, collectCount: 3,
    createdAt: '2026-09-08 02:30'
  },
  {
    id: 4, type: '社区',
    title: '',
    content: '室友每天晚上打游戏到凌晨两点，说了好几次都不听，真的要崩溃了。',
    images: [], subType: '树洞', isAnonymous: 1,
    likeCount: 256, commentCount: 78, collectCount: 6,
    createdAt: '2026-09-07 23:00'
  },
  {
    id: 5, type: '社区',
    title: '学校周边哪家麻辣烫最好吃？',
    content: '新生求推荐，学校周边有什么好吃的麻辣烫店？价格实惠的那种！',
    images: [], subType: '校园论坛', isAnonymous: 0,
    viewCount: 342, likeCount: 23, commentCount: 56, collectCount: 18,
    createdAt: '2026-09-08 11:00'
  },
  {
    id: 6, type: '社区',
    title: '有没有推荐的选修课？',
    content: '下学期选修课求推荐，想要给分高、不太水的课。',
    images: [], subType: '校园论坛', isAnonymous: 0,
    viewCount: 567, likeCount: 45, commentCount: 89, collectCount: 32,
    createdAt: '2026-09-06 09:00'
  }
]

// ===== 集市 =====
const MOCK_MARKET = [
  {
    id: 1, type: '集市',
    title: '九成新 iPad Air 5',
    content: '买来考研用的，上岸了用不到了，配件齐全，送保护壳。',
    images: ['/static/images/default-avatar.png'], subType: '闲置交易',
    sellingPrice: 2800, originalPrice: 4399,
    viewCount: 320, likeCount: 28, collectCount: 15,
    createdAt: '2026-09-08 09:00'
  },
  {
    id: 2, type: '集市',
    title: '高等数学同济第七版',
    content: '只做了前几页，基本全新，送课堂笔记。',
    images: [], subType: '闲置交易',
    sellingPrice: 15, originalPrice: 45,
    viewCount: 98, likeCount: 12, collectCount: 6,
    createdAt: '2026-09-06 16:00'
  },
  {
    id: 3, type: '集市',
    title: '求一个机械键盘',
    content: '想入一个青轴机械键盘，预算200以内，有没有同学出？',
    images: [], subType: '求购专区',
    viewCount: 67, likeCount: 5, collectCount: 0,
    createdAt: '2026-09-08 14:00'
  },
  {
    id: 4, type: '集市',
    title: '收一台二手显示器',
    content: '求购一台24寸以上的显示器，做设计用，色彩好一点的，价格好商量。',
    images: [], subType: '求购专区',
    viewCount: 45, likeCount: 3, collectCount: 0,
    createdAt: '2026-09-07 10:00'
  },
  {
    id: 5, type: '集市',
    title: '大四学长出全套考研资料',
    content: '包含政治、英语、数学全套复习资料，还有自己整理的笔记，打包价80元。',
    images: ['/static/images/default-avatar.png'], subType: '学长学姐传承',
    viewCount: 234, likeCount: 56, collectCount: 28,
    createdAt: '2026-09-05 12:00'
  },
  {
    id: 6, type: '集市',
    title: '转专业经验分享+资料赠送',
    content: '去年从土木成功转到计算机，有意向的学弟学妹可以联系我，免费分享资料。',
    images: [], subType: '学长学姐传承',
    viewCount: 189, likeCount: 78, collectCount: 42,
    createdAt: '2026-09-04 18:00'
  },
  {
    id: 7, type: '集市',
    title: '出的AirPods Pro 超赞',
    content: '同城交易，耳机很新，功能完好，卖家很靠谱，好评！',
    images: [], subType: '交易评价',
    viewCount: 34, likeCount: 8, collectCount: 0,
    createdAt: '2026-09-08 08:00'
  },
  {
    id: 8, type: '集市',
    title: '买的教材有笔记，介意慎拍',
    content: '之前在平台上买了本教材，结果里面有大量笔记，卖家没提前说明，给个中评吧。',
    images: [], subType: '交易评价',
    viewCount: 56, likeCount: 12, collectCount: 0,
    createdAt: '2026-09-06 20:00'
  },
  {
    id: 9, type: '集市',
    title: '周六去市区，有没有拼车的？',
    content: '周六早上8点从学校出发去市区，目前车上2个人，还能坐2个，费用AA。',
    images: [], subType: '拼车拼团',
    viewCount: 78, likeCount: 6, collectCount: 2,
    createdAt: '2026-09-08 07:00'
  },
  {
    id: 10, type: '集市',
    title: '双十一拼团买零食',
    content: '准备在拼多多上拼一箱坚果零食，有没有一起的？人均30左右。',
    images: [], subType: '拼车拼团',
    viewCount: 112, likeCount: 15, collectCount: 4,
    createdAt: '2026-09-07 15:00'
  }
]

// ===== 服务 =====
const MOCK_SERVICE = [
  {
    id: 1, type: '服务',
    title: '帮取快递，3元一次',
    content: '每天下午5点可以帮取菜鸟驿站的快递，3元一次，大件另议。',
    images: [], subType: '外卖跑腿',
    viewCount: 156, likeCount: 12, collectCount: 8,
    createdAt: '2026-09-08 08:00'
  },
  {
    id: 2, type: '服务',
    title: '代拿外卖',
    content: '中午和晚上饭点可以代拿外卖，送到宿舍楼下，2元一单。',
    images: [], subType: '外卖跑腿',
    viewCount: 234, likeCount: 18, collectCount: 12,
    createdAt: '2026-09-07 11:00'
  },
  {
    id: 3, type: '服务',
    title: '食堂哪个窗口最好吃？',
    content: '大家来投票，选出你心中食堂最好吃的窗口！',
    images: [], subType: '投票问卷',
    viewCount: 456, likeCount: 34, collectCount: 5,
    createdAt: '2026-09-08 10:00'
  },
  {
    id: 4, type: '服务',
    title: '周末去哪玩？投票决定',
    content: '这周末班级活动，A. 爬山 B. KTV C. 密室逃脱 D. 聚餐，大家投票选一个！',
    images: [], subType: '投票问卷',
    viewCount: 289, likeCount: 45, collectCount: 3,
    createdAt: '2026-09-06 16:00'
  },
  {
    id: 5, type: '服务',
    title: '想点一首《晴天》送给302宿舍',
    content: '谢谢你们这学期的照顾，点一首周杰伦的《晴天》送给你们！',
    images: [], subType: '表白点歌',
    viewCount: 89, likeCount: 23, collectCount: 2,
    createdAt: '2026-09-08 12:00'
  },
  {
    id: 6, type: '服务',
    title: '生日快乐！点一首《最好的我们》',
    content: '今天是我闺蜜生日，点一首歌送给她，希望我们友谊长存！',
    images: [], subType: '表白点歌',
    viewCount: 67, likeCount: 19, collectCount: 1,
    createdAt: '2026-09-07 18:00'
  }
]

// 给每条数据打上 tagColor
const addTagColor = (list) => list.map(item => ({ ...item, tagColor: TAG_COLORS[item.subType] || '#999' }))

Page({
  data: {
    activeTab: 0,
    tabs: ['动态', '社区', '集市', '服务'],
    currentList: [],
    keyword: '',
    // 全量数据
    allData: []
  },

  onLoad() {
    const allData = [
      addTagColor(MOCK_DYNAMIC),
      addTagColor(MOCK_COMMUNITY),
      addTagColor(MOCK_MARKET),
      addTagColor(MOCK_SERVICE)
    ]
    this.setData({ allData, currentList: allData[0] })
  },

  onTabChange(e) {
    const activeTab = e.detail.index
    this.setData({ activeTab, keyword: '', currentList: this.data.allData[activeTab] })
  },

  onSearch(e) {
    const keyword = e.detail
    this.setData({ keyword })
    const sourceList = this.data.allData[this.data.activeTab]
    if (!keyword) {
      this.setData({ currentList: sourceList })
      return
    }
    const filtered = sourceList.filter(item =>
      (item.title && item.title.includes(keyword)) || item.content.includes(keyword)
    )
    this.setData({ currentList: filtered })
  },

  onClearSearch() {
    this.setData({ keyword: '', currentList: this.data.allData[this.data.activeTab] })
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id
    const type = e.currentTarget.dataset.type
    const typeIndex = { '动态': 0, '社区': 1, '集市': 2, '服务': 3 }[type]
    wx.showModal({
      title: '确认删除',
      content: '删除后无法恢复，确定删除吗？',
      success: (res) => {
        if (res.confirm) {
          const allData = this.data.allData
          allData[typeIndex] = allData[typeIndex].filter(item => item.id !== id)
          this.setData({ allData, currentList: allData[this.data.activeTab] })
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  },

  onView() {
    wx.showToast({ title: '查看详情', icon: 'none' })
  }
})
