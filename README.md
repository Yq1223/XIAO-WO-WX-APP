# 校窝 - 微信小程序

> 小窝虽小，装得下整个校园，校园大小事，一窝全知道

## 一、环境准备

### 1. 安装 Node.js

前往 [Node.js 官网](https://nodejs.org/) 下载并安装 **LTS 版本**（推荐 18.x 或更高）。

安装完成后，打开终端（Windows 用户打开 CMD 或 PowerShell），输入以下命令验证：

```bash
node -v
# 应该显示类似 v18.x.x

npm -v
# 应该显示类似 9.x.x
```

### 2. 安装微信开发者工具

前往 [微信开发者工具官网](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) 下载对应系统的版本并安装。

安装后打开，用微信扫码登录。

### 3. 注册小程序 AppID（可选，但推荐）

前往 [微信公众平台](https://mp.weixin.qq.com/) 注册一个小程序账号，获取 **AppID**。

> 如果暂时不想注册，可以用"测试号"进行开发，但部分功能会受限。

---

## 二、项目初始化

### 1. 安装 npm 依赖（Vant UI）

在项目根目录（`xiaowo/` 文件夹）下打开终端，执行：

```bash
npm install
```

这会安装 `@vant/weapp` 组件库到 `node_modules` 目录，并自动修复 Vant 图标字体 CDN 引用问题（通过 `postinstall` 脚本）。

### 2. 在微信开发者工具中构建 npm

这是**关键步骤**，很多新手会遗漏：

1. 打开**微信开发者工具**
2. 点击 **"导入项目"**（或 "导入"）
3. **目录**选择本项目文件夹 `xiaowo/`
4. **AppID** 填入你注册的 AppID，或点击"测试号"
5. 点击 **"导入"**
6. 导入后，点击菜单栏 **"工具" → "构建 npm"**
7. 等待构建完成，会出现 `miniprogram_npm` 文件夹

> ⚠️ 如果不执行"构建 npm"，Vant 组件将无法使用！

### 3. 修改 AppID

打开 `project.config.json`，把 `appid` 字段改成你自己的 AppID：

```json
"appid": "你的AppID"
```

---

## 三、运行项目

1. 确保已完成上述所有步骤
2. 在微信开发者工具中，点击顶部的 **"编译"** 按钮（或按 `Ctrl+B`）
3. 模拟器中应该可以看到小程序运行

---

## 四、项目结构

```
xiaowo/
├── app.js                        # 小程序入口文件
├── app.json                      # 全局配置（页面路由、TabBar等）
├── app.wxss                      # 全局样式
├── project.config.json           # 项目配置文件
├── sitemap.json                  # 站点地图配置
├── package.json                  # npm 依赖配置
├── custom-tab-bar/               # 自定义 TabBar（使用 Vant 图标）
│   ├── index.js
│   ├── index.json
│   ├── index.wxml
│   └── index.wxss
├── pages/
│   ├── index/                🏠 首页（TabBar）
│   ├── community/            💬 社区（TabBar）
│   ├── market/               🛒 集市（TabBar）
│   ├── service/              🔧 服务（TabBar）
│   ├── mine/                 👤 我的（TabBar）
│   ├── index-dynamic/        📰 校园动态
│   ├── index-lost/           🔍 失物招领
│   ├── index-activity/       🎉 活动发布
│   ├── community-confession/ ❤️ 表白墙
│   ├── community-treehole/   🕳️ 树洞
│   ├── community-forum/      💭 校园论坛
│   ├── market-idle/          📦 闲置交易
│   ├── market-buy/           🛍️ 求购专区
│   ├── market-inherit/       🎓 学长学姐传承
│   ├── market-review/        ⭐ 交易评价
│   ├── market-carpool/       🚗 拼车拼团
│   ├── service-errand/       🛵 外卖跑腿
│   ├── service-vote/         📊 投票问卷
│   └── service-song/         🎵 表白点歌
└── components/                   # 公共组件（后续扩展用）
```

---

## 五、TabBar 图标说明

本项目使用 **Vant Weapp 内置图标**，无需额外准备图片资源。

| Tab | Vant 图标 | 说明 |
|-----|-----------|------|
| 首页 | `home-o` | 首页 |
| 社区 | `friends-o` | 社区/朋友圈 |
| 集市 | `shop-o` | 商店/集市 |
| 服务 | `apps-o` | 应用/服务 |
| 我的 | `contact` | 联系人/个人 |

首页功能入口图标：

| 功能 | Vant 图标 |
|------|-----------|
| 校园动态 | `description` |
| 失物招领 | `search` |
| 活动发布 | `flag-o` |

> 图标颜色主题色为 `#FF6B35`（温暖橙），未选中为 `#999999`。

---

## 六、页面说明

### TabBar 页面（5个）

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `pages/index/index` | 校园动态入口，搜索 + 功能入口 |
| 社区 | `pages/community/community` | Vant Tabs 切换：表白墙、树洞、校园论坛 |
| 集市 | `pages/market/market` | Vant Tabs 切换：闲置交易、求购、传承、评价、拼车拼团 |
| 服务 | `pages/service/service` | Vant Tabs 切换：外卖跑腿、投票问卷、表白点歌 |
| 我的 | `pages/mine/mine` | 个人中心（暂未实现，预留） |

### 子页面（14个）

每个子页面都已创建基础文件框架（.js / .json / .wxml / .wxss），可直接开发。

---

## 七、常用开发命令

```bash
# 安装依赖
npm install

# 更新 Vant 到最新版
npm update @vant/weapp
```

---

## 八、开发小贴士

1. **主题色**：当前主题色为 `#FF6B35`（温暖橙），可在 `app.wxss` 和 `app.json` 中统一修改
2. **Vant 组件使用**：在页面的 `.json` 文件中引入组件后，直接在 `.wxml` 中使用标签即可
3. **页面跳转**：
   - Tab 页面之间：`wx.switchTab({ url: '/pages/xxx/xxx' })`
   - 跳转到子页面：`wx.navigateTo({ url: '/pages/xxx/xxx' })`
4. **自定义 TabBar**：本项目使用 Vant 的 `van-tabbar` 组件实现自定义 TabBar，图标全部来自 Vant 内置图标库
5. **调试**：善用微信开发者工具的"调试器"面板，Console 和 Network 面板是排查问题的好帮手

---

## 九、常见问题

### Q: Vant 组件显示不出来？
A: 检查是否执行了"工具 → 构建 npm"，并确认 `miniprogram_npm` 文件夹已生成。

### Q: TabBar 不显示或报错？
A: 确认 `custom-tab-bar/` 目录存在且文件完整，并且已执行 `npm install` 和"构建 npm"。

### Q: 页面白屏？
A: 检查控制台报错信息，常见原因是 `.json` 文件格式错误（多了逗号等）。

### Q: 怎么添加新页面？
A: 两步：
1. 在 `pages/` 下创建文件夹和4个文件（.js / .json / .wxml / .wxss）
2. 在 `app.json` 的 `pages` 数组中添加页面路径

### Q: 想换 TabBar 图标？
A: 修改 `custom-tab-bar/index.wxml` 中的 `icon` 属性值，可用图标见 [Vant 图标列表](https://vant-ui.github.io/vant-weapp/#/icon)

### Q: 控制台报 `Failed to load font` 错误？
A: 这是 Vant 图标字体 CDN 地址加载失败。项目已内置自动修复脚本，`npm install` 时会自动执行。如果仍有问题，手动运行：
```bash
node scripts/fix-vant-font.js
```
然后重新执行"构建 npm"。

---

## 十、技术栈

- **框架**：微信小程序原生开发
- **UI 组件库**：[Vant Weapp](https://vant-ui.github.io/vant-weapp/)
- **TabBar**：Vant `van-tabbar` 自定义组件
- **样式**：WXSS（微信小程序的 CSS）

---

祝开发顺利！🎓
