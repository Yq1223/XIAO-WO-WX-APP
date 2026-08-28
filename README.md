# 🏠 校窝 · 微信小程序前端 (xiaowo-miniapp)

> **校窝** — 有事，窝里说。
> 面向大学生的一站式校园社区小程序（论坛 + 表白墙 + 跳蚤市场）

本项目是校窝的微信小程序前端，基于微信原生框架 + Vant Weapp 组件库。

---

## 📋 目录

- [一、项目概览](#一项目概览)
- [二、环境准备](#二环境准备)
- [三、安装微信开发者工具](#三安装微信开发者工具)
- [四、导入项目](#四导入项目)
- [五、配置项目](#五配置项目)
- [六、安装依赖（Vant Weapp）](#六安装依赖vant-weapp)
- [七、运行项目](#七运行项目)
- [八、项目结构说明](#八项目结构说明)
- [九、页面功能说明](#九页面功能说明)
- [十、组件说明](#十组件说明)
- [十一、接口对接](#十一接口对接)
- [十二、自定义配置](#十二自定义配置)
- [十三、常见问题排查](#十三常见问题排查)
- [十四、发布上线流程](#十四发布上线流程)

---

## 一、项目概览

### 技术栈

| 组件 | 说明 |
|------|------|
| 微信小程序原生框架 | 基础框架 |
| Vant Weapp | UI 组件库（有赞出品） |
| wx.request | HTTP 请求 |
| WebSocket | 实时消息通信 |

### 主色调

```
主色（温暖橙）：#FF6B35
```

### 项目结构

```
xiaowo-miniapp/
├── app.js                 # 全局逻辑
├── app.json               # 全局配置（路由/TabBar/组件）
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
├── sitemap.json           # 搜索收录配置
│
├── utils/                 # 工具层
│   ├── request.js         # HTTP 请求封装
│   ├── auth.js            # 登录管理
│   ├── util.js            # 通用工具函数
│   └── constants.js       # 常量定义
│
├── api/                   # 接口调用层
│   ├── auth.js            # 认证 API
│   ├── user.js            # 用户 API
│   ├── post.js            # 帖子 API
│   ├── confession.js      # 表白墙 API
│   ├── market.js          # 跳蚤市场 API
│   ├── comment.js         # 评论 API
│   ├── message.js         # 消息 API
│   ├── notification.js    # 通知 API
│   └── upload.js          # 上传 API
│
├── store/                 # 全局状态
│   └── index.js           # 状态管理
│
├── pages/                 # 页面（20个）
│   ├── index/             # 首页（论坛）
│   ├── confession/        # 表白墙
│   ├── market/            # 跳蚤市场
│   ├── mine/              # 个人中心
│   ├── detail/            # 详情页（帖子/表白/商品）
│   ├── publish/           # 发布页（帖子/表白/商品）
│   ├── message/           # 消息列表
│   ├── chat/              # 私聊
│   ├── notification/      # 通知列表
│   ├── search/            # 搜索
│   ├── profile/           # 他人主页
│   └── login/             # 登录页
│
├── components/            # 自定义组件（9个）
│   ├── post-card/         # 帖子卡片
│   ├── confession-card/   # 表白卡片
│   ├── market-card/       # 商品卡片
│   ├── comment-item/      # 评论条目
│   ├── comment-input/     # 评论输入框
│   ├── image-upload/      # 图片上传
│   ├── user-avatar/       # 用户头像
│   ├── empty-state/       # 空状态
│   └── navbar/            # 自定义导航栏
│
└── static/                # 静态资源
    ├── icons/             # TabBar 图标
    └── images/            # 品牌图片
```

---

## 二、环境准备

你需要安装以下软件：

| 序号 | 软件 | 说明 |
|------|------|------|
| 1 | **微信开发者工具** | 必装！用于开发和预览小程序 |
| 2 | Node.js（可选） | 如果需要使用 npm 安装依赖 |
| 3 | 后端服务（可选） | 完整联调时需要后端运行 |

> 💡 **小白提示**：只需要安装「微信开发者工具」就能运行本项目，非常简单！

---

## 三、安装微信开发者工具

### 3.1 下载

1. 访问微信开发者工具官网：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. 根据你的操作系统下载对应版本：
   - **Windows 64位**：推荐大多数 Windows 用户
   - **Windows 32位**：老电脑可能需要
   - **macOS**：Mac 用户
   - **Linux（x64）**：Linux 用户

### 3.2 安装

**Windows：**
1. 双击下载的 `.exe` 安装包
2. 一路「下一步」即可
3. 安装完成后桌面会出现图标

**macOS：**
1. 双击下载的 `.dmg` 文件
2. 将「微信开发者工具」拖入「Applications」文件夹
3. 首次打开可能提示"无法验证开发者"，去「系统偏好设置 → 安全性与隐私」点「仍要打开」

### 3.3 登录

1. 打开「微信开发者工具」
2. 使用**微信扫码登录**
3. 登录后你会看到主界面

> 💡 你需要有一个微信小程序的 AppID。如果没有：
> - 访问 https://mp.weixin.qq.com/ 注册小程序账号
> - 在「开发 → 开发管理 → 开发设置」中获取 AppID
> - 开发阶段可以先使用「测试号」

---

## 四、导入项目

### 4.1 打开项目

1. 打开微信开发者工具
2. 点击 **「+」号** 或 **「导入项目」**
3. 填写以下信息：

| 字段 | 填写内容 |
|------|----------|
| **目录** | 选择 `xiaowo-miniapp` 文件夹 |
| **AppID** | 填入你的小程序 AppID（或点击「使用测试号」） |
| **项目名称** | 校窝（或任意名称） |

4. 点击 **「确定」**

### 4.2 项目导入成功

导入成功后，你会看到：
- 左侧是**模拟器**（手机预览）
- 中间是**编辑器**（代码区域）
- 右侧是**调试器**（Console/Network 等）

---

## 五、配置项目

### 5.1 修改 AppID

如果你使用的是自己的 AppID，确保在 `project.config.json` 中填写正确：

```json
{
  "appid": "你的小程序AppID",
  ...
}
```

### 5.2 配置后端 API 地址

打开 `utils/request.js`，找到以下内容：

```javascript
// 开发环境
const BASE_URL = 'http://localhost:8080'
```

修改说明：

| 场景 | 配置 |
|------|------|
| **本地开发（后端也在本机）** | `http://localhost:8080` ✅ 默认值 |
| **本地开发（后端在局域网其他机器）** | `http://192.168.x.x:8080` |
| **使用微信云托管** | `https://你的云托管域名` |
| **正式上线** | `https://你的服务器域名` |

> ⚠️ **重要**：在微信开发者工具中，需要关闭「详情 → 本地设置 → 不校验合法域名」才能访问 localhost。

### 5.3 关闭域名校验（开发阶段）

1. 点击微信开发者工具右上角 **「详情」**
2. 切换到 **「本地设置」** 标签
3. **勾选**「不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书」

> 💡 这样就能在开发阶段访问 localhost 和任意 HTTP 接口了。
> 正式上线时必须配置 HTTPS 域名。

---

## 六、安装依赖（Vant Weapp）

本项目使用 [Vant Weapp](https://vant-ui.github.io/vant-weapp/) 组件库。

### 方式一：使用 npm 安装（推荐）

1. 在微信开发者工具中，点击 **「终端 → 新终端」**
2. 确保当前目录是 `xiaowo-miniapp`
3. 执行以下命令：

```bash
# 初始化 package.json（如果没有的话）
npm init -y

# 安装 Vant Weapp
npm i @vant/weapp -S --production
```

4. 安装完成后，点击微信开发者工具的 **「工具 → 构建 npm」**
5. 构建成功后，项目根目录会出现 `miniprogram_npm` 文件夹

> ⚠️ **如果不执行「构建 npm」这一步，Vant 组件将无法使用！**

### 方式二：使用官方示例项目

如果 npm 安装遇到问题：
1. 访问 https://github.com/youzan/vant-weapp/releases
2. 下载最新的 `vant-weapp` 包
3. 将 `dist` 文件夹复制到项目中，重命名为 `vant`
4. `app.json` 中的组件路径改为相对于你复制的位置

---

## 七、运行项目

### 7.1 编译预览

1. 确保微信开发者工具中已打开本项目
2. 点击顶部的 **「编译」** 按钮（或按 `Ctrl+B` / `Cmd+B`）
3. 左侧模拟器会显示小程序界面

### 7.2 预览效果

编译成功后，你会看到：

| Tab | 页面 |
|-----|------|
| 🏠 首页 | 帖子列表（论坛） |
| 💌 表白墙 | 表白/树洞 |
| 🛒 市场 | 跳蚤市场 |
| 👤 我的 | 个人中心 |

### 7.3 真机预览

1. 点击顶部的 **「预览」** 按钮
2. 用手机微信扫描二维码
3. 即可在真机上体验

> 💡 真机预览需要你的小程序已配置好 AppID，且手机和电脑在同一网络。

### 7.4 调试

- **查看网络请求**：点击「调试器 → Network」标签
- **查看日志**：点击「调试器 → Console」标签
- **查看页面结构**：点击「调试器 → Wxml」标签
- **模拟不同机型**：顶部下拉框可选择 iPhone/Android 等

---

## 八、项目结构说明

### 8.1 全局文件

| 文件 | 作用 | 是否需要修改 |
|------|------|-------------|
| `app.js` | 全局逻辑（登录检查、全局数据） | 一般不需要 |
| `app.json` | 路由配置、TabBar、组件注册 | 一般不需要 |
| `app.wxss` | 全局样式变量和通用类 | 可自定义颜色 |
| `project.config.json` | 项目配置（AppID 等） | **需要填 AppID** |
| `sitemap.json` | 搜索收录规则 | 一般不需要 |

### 8.2 工具层 (utils/)

| 文件 | 作用 | 是否需要修改 |
|------|------|-------------|
| `request.js` | HTTP 请求封装（自动带 Token） | **需要改 BASE_URL** |
| `auth.js` | 登录管理（wx.login/Token） | 一般不需要 |
| `util.js` | 工具函数（时间格式化等） | 一般不需要 |
| `constants.js` | 常量定义（枚举映射等） | 一般不需要 |

### 8.3 接口层 (api/)

每个文件对应后端的一个模块，导出 API 调用函数：

```javascript
// 示例：api/post.js
const request = require('../utils/request')

module.exports = {
  // 获取帖子列表
  getPostList(params) {
    return request.get('/api/v1/posts', params)
  },
  // 获取帖子详情
  getPostDetail(postId) {
    return request.get(`/api/v1/posts/${postId}`)
  },
  // ... 更多方法
}
```

### 8.4 全局状态 (store/)

```javascript
// store/index.js
const store = {
  userInfo: null,          // 当前用户信息
  unreadMsgCount: 0,       // 未读消息数
  unreadNotifCount: 0,     // 未读通知数
  
  // 更新用户信息
  updateUserInfo(info) { ... },
  // 更新未读数
  updateUnreadCount() { ... }
}
```

---

## 九、页面功能说明

### 9.1 TabBar 页面

#### 🏠 首页 (pages/index/index)

- 顶部搜索栏（点击跳转搜索页）
- 分类 Tab 切换：全部 / 热点 / 美食 / 学习 / 情感 / 游戏 / 其他
- 帖子列表（下拉刷新 + 上拉加载更多）
- 悬浮发帖按钮
- 点击帖子卡片跳转详情页

#### 💕 表白墙 (pages/confession/index)

- 子 Tab 切换：表白 / 捞人 / 树洞
- 表白/树洞卡片列表
- 悬浮发表按钮
- 支持匿名发布

#### 🛒 跳蚤市场 (pages/market/index)

- 搜索栏
- 分类 Tab：全部 / 数码 / 教材 / 日用 / 衣物 / 运动 / 其他
- 两列瀑布流商品卡片
- 悬浮发布闲置按钮
- 支持排序（最新/价格升序/价格降序）

#### 👤 个人中心 (pages/mine/index)

- 已登录：显示头像、昵称、学校、简介、统计数据
- 功能入口：我的发布 / 我的收藏 / 浏览记录 / 消息通知 / 设置
- 未登录：显示登录引导

### 9.2 详情页

#### 📄 帖子详情 (pages/detail/post/index)

- 作者信息（头像/昵称/学校/时间）
- 标题 + 正文 + 图片（可点击预览大图）
- 互动栏：点赞 ❤️ / 收藏 ⭐ / 评论数 💬
- 评论列表（支持嵌套回复）
- 底部评论输入框

#### 💗 表白墙详情 (pages/detail/confession/index)

- 匿名标识
- 内容 + 图片
- 对象描述（如"信工学院大二短发女生"）
- 互动栏 + 评论

#### 🏷️ 商品详情 (pages/detail/market/index)

- 图片轮播（可预览大图）
- 价格信息：¥售价 / 原价（划线）/ 成色标签
- 商品描述
- 交易方式 + 交易地点
- 底部操作栏：收藏 ❤️ + 联系卖家 💬

### 9.3 发布页

#### ✍️ 发布帖子 (pages/publish/post/index)

- 选择分类
- 输入标题（必填）
- 输入正文内容（必填）
- 上传图片（最多 9 张，可拖拽排序）
- 匿名发布开关
- 发布按钮

#### 💌 发布表白 (pages/publish/confession/index)

- 选择类型（表白/捞人/树洞）
- 输入内容
- 上传图片
- 对象描述（可选）

#### 📦 发布闲置 (pages/publish/market/index)

- 输入标题 + 描述
- 上传图片
- 选择分类
- 输入售价 + 原价
- 选择成色（全新/几乎全新/良好/一般）
- 选择交易方式（面交/邮寄/都可以）
- 输入交易地点

### 9.4 消息页

#### 💬 消息列表 (pages/message/index)

- 会话列表（头像/昵称/最后消息/时间）
- 未读消息角标
- 左滑删除会话

#### 🗨️ 私聊 (pages/chat/index)

- 消息气泡（区分自己/对方，靠右/靠左）
- 支持文本消息、图片消息、商品卡片消息
- 底部输入栏：文字输入 + 图片发送
- WebSocket 实时接收消息
- 上拉加载历史消息

### 9.5 其他页面

| 页面 | 路径 | 功能 |
|------|------|------|
| 通知列表 | `/pages/notification/index` | 点赞/评论/系统通知 |
| 搜索 | `/pages/search/index` | 搜索帖子+商品，历史记录 |
| 他人主页 | `/pages/profile/index` | 查看其他用户的资料和发布 |
| 我的发布 | `/pages/mine/posts/index` | 我发的帖子/表白/商品 |
| 我的收藏 | `/pages/mine/collections/index` | 我收藏的内容 |
| 浏览记录 | `/pages/mine/history/index` | 我浏览过的内容 |
| 设置 | `/pages/mine/settings/index` | 编辑资料/退出登录 |
| 登录 | `/pages/login/index` | 微信一键登录 |

---

## 十、组件说明

| 组件 | 路径 | 用途 | 使用方式 |
|------|------|------|----------|
| `post-card` | `/components/post-card/` | 帖子列表中的卡片 | `<post-card post="{{item}}" />` |
| `confession-card` | `/components/confession-card/` | 表白墙中的卡片 | `<confession-card confession="{{item}}" />` |
| `market-card` | `/components/market-card/` | 商品列表中的卡片 | `<market-card item="{{item}}" />` |
| `comment-item` | `/components/comment-item/` | 评论列表中的条目 | `<comment-item comment="{{item}}" />` |
| `comment-input` | `/components/comment-input/` | 底部评论输入框 | `<comment-input bind:send="onSend" />` |
| `image-upload` | `/components/image-upload/` | 图片上传九宫格 | `<image-upload fileList="{{images}}" bind:change="onImageChange" />` |
| `user-avatar` | `/components/user-avatar/` | 用户头像+昵称 | `<user-avatar user="{{author}}" isAnonymous="{{false}}" />` |
| `empty-state` | `/components/empty-state/` | 空状态占位图 | `<empty-state text="暂无内容" />` |
| `navbar` | `/components/navbar/` | 自定义导航栏 | `<navbar title="页面标题" back="{{true}}" />` |

---

## 十一、接口对接

### 11.1 接口基础信息

- **基础路径**：`/api/v1`
- **认证方式**：请求头 `Authorization: Bearer {jwt_token}`
- **请求格式**：JSON
- **响应格式**：`{ "code": 200, "message": "success", "data": { ... } }`

### 11.2 在页面中调用 API

```javascript
// 引入 API
const postApi = require('../../api/post')

Page({
  data: {
    postList: [],
    pageNum: 1,
    loading: false
  },

  onLoad() {
    this.loadPosts()
  },

  async loadPosts() {
    this.setData({ loading: true })
    try {
      const res = await postApi.getPostList({
        pageNum: this.data.pageNum,
        pageSize: 20,
        category: ''
      })
      this.setData({
        postList: res.data.records,
        loading: false
      })
    } catch (err) {
      console.error('加载失败', err)
      this.setData({ loading: false })
    }
  }
})
```

### 11.3 开发阶段 Mock 数据

如果后端还没准备好，你可以在 API 文件中临时返回 mock 数据：

```javascript
// api/post.js
module.exports = {
  getPostList(params) {
    // 开发阶段：返回 mock 数据
    return Promise.resolve({
      code: 200,
      data: {
        records: [
          { id: 1, title: '测试帖子', content: '这是测试内容', likeCount: 10 }
        ],
        total: 1
      }
    })
    
    // 正式对接：取消上面的注释，使用下面的代码
    // return request.get('/api/v1/posts', params)
  }
}
```

---

## 十二、自定义配置

### 12.1 修改主色调

打开 `app.wxss`，修改 CSS 变量：

```css
page {
  --primary: #FF6B35;          /* 主色 - 改成你喜欢的颜色 */
  --primary-light: #FF8C5A;    /* 主色浅色 */
  --primary-dark: #E85D2A;     /* 主色深色 */
}
```

### 12.2 修改 TabBar 图标

1. 准备 8 张图标图片（4个图标 × 2种状态：普通/选中）
2. 替换 `static/icons/` 目录下的文件：
   - `home.png` / `home-active.png` — 首页图标
   - `heart.png` / `heart-active.png` — 表白墙图标
   - `shop.png` / `shop-active.png` — 市场图标
   - `mine.png` / `mine-active.png` — 我的图标

图标要求：
- 格式：PNG（透明背景）
- 大小：81px × 81px（推荐）
- 普通状态：灰色 (#999999)
- 选中状态：主色 (#FF6B35)

### 12.3 修改小程序名称

打开 `app.json`，修改 `window.navigationBarTitleText`：

```json
{
  "window": {
    "navigationBarTitleText": "校窝"  // ← 改成你想要的名字
  }
}
```

### 12.4 修改隐私协议和用户协议

在 `pages/login/index.wxml` 中，修改协议链接：

```html
<view class="agreement">
  登录即表示同意
  <text class="link" bindtap="onPrivacy">《隐私协议》</text>
  和
  <text class="link" bindtap="onUserAgreement">《用户协议》</text>
</view>
```

---

## 十三、常见问题排查

### ❌ 问题 1：编译报错 "module is not defined"

**原因**：在 `.wxml` 或 `.wxss` 文件中误用了 JS 语法。

**解决**：检查报错的文件，确保 JS 代码在 `.js` 文件中。

---

### ❌ 问题 2：Vant 组件不显示 / 报错

**原因**：npm 依赖没有构建。

**解决**：
1. 确认已执行 `npm i @vant/weapp -S --production`
2. 在微信开发者工具中点击 **「工具 → 构建 npm」**
3. 重新编译

---

### ❌ 问题 3：接口请求失败 (404 / 网络错误)

**原因**：后端服务未启动，或 API 地址配置错误。

**解决**：
1. 确认后端已启动：浏览器访问 `http://localhost:8080/doc.html`
2. 检查 `utils/request.js` 中的 `BASE_URL` 是否正确
3. 确认已勾选「不校验合法域名」（开发阶段）

---

### ❌ 问题 4：接口返回 401

**原因**：Token 过期或未登录。

**解决**：
1. 进入小程序 → 「我的」→ 如果显示登录引导，点击登录
2. 如果反复 401，清除小程序缓存：微信开发者工具 → 「清缓存 → 清除全部」

---

### ❌ 问题 5：图片上传失败

**原因**：后端未配置腾讯云 COS，或 COS 配置错误。

**解决**：
1. 开发阶段可以在后端 `application-dev.yml` 中关闭内容审核：`content.check.enabled: false`
2. 确保后端 COS 配置正确（secret-id/secret-key/bucket-name）

---

### ❌ 问题 6：真机预览时无法连接后端

**原因**：手机无法访问电脑的 localhost。

**解决**：
1. 确保手机和电脑在同一 WiFi 网络
2. 将 `BASE_URL` 改为电脑的局域网 IP：`http://192.168.x.x:8080`
3. 查看电脑 IP：
   - Windows：`ipconfig`
   - macOS/Linux：`ifconfig` 或 `ip addr`

---

### ❌ 问题 7：页面空白，没有任何内容

**可能原因**：
1. 检查 Console 是否有报错
2. 检查 Network 中 API 请求是否成功
3. 确认 `app.json` 中页面路径是否正确
4. 确认组件是否正确引入（检查页面的 `.json` 文件）

---

### ❌ 问题 8：TabBar 图标不显示

**原因**：图标文件路径错误或文件不存在。

**解决**：
1. 确认 `static/icons/` 目录下有 8 个图标文件
2. 文件名必须与 `app.json` 中配置的一致
3. 图标文件必须是真实存在的图片（不能是空文件）

---

## 十四、发布上线流程

### 14.1 前置准备

1. **注册小程序账号**：https://mp.weixin.qq.com/
2. **完成小程序备案**（2024年起必须）
3. **配置服务器域名**：
   - 登录微信公众平台 → 开发 → 开发管理 → 服务器域名
   - 添加 `request 合法域名`：你的后端 API 地址（必须 HTTPS）
4. **配置业务域名**（如有 H5 嵌入）

### 14.2 上传代码

1. 在微信开发者工具中，点击右上角 **「上传」**
2. 填写版本号（如 `1.0.0`）和备注
3. 代码上传到微信公众平台

### 14.3 提交审核

1. 登录微信公众平台 → 管理 → 版本管理
2. 在「开发版本」中找到刚上传的版本
3. 点击 **「提交审核」**
4. 选择类目：**社交 → 社区/论坛**
5. 填写相关信息，提交

### 14.4 发布上线

1. 审核通过后（通常 1-7 天），在「审核版本」中点击 **「全量发布」**
2. 你的小程序正式上线！🎉

### 14.5 后续更新

1. 修改代码 → 微信开发者工具上传 → 提交审核 → 发布
2. 每次更新都需要重新审核

---

## 📞 需要帮助？

| 问题类型 | 查阅位置 |
|----------|----------|
| 微信小程序基础 | [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/) |
| Vant Weapp 组件 | [Vant Weapp 文档](https://vant-ui.github.io/vant-weapp/) |
| 项目配置问题 | 本文档「常见问题排查」章节 |
| 后端接口问题 | 后端项目 `xiaowo-server/README.md` |

---

> 🏠 **校窝** — 有事，窝里说。
