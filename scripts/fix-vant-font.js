// 修复 Vant 图标字体 CDN 引用问题
// 移除 @font-face 中的阿里 CDN 地址，避免小程序环境中加载失败

const fs = require('fs')
const path = require('path')

const iconWxss = path.join(__dirname, '..', 'node_modules', '@vant', 'weapp', 'dist', 'icon', 'index.wxss')

if (!fs.existsSync(iconWxss)) {
  console.log('[fix-vant-font] 未找到 icon/index.wxss，跳过')
  process.exit(0)
}

let content = fs.readFileSync(iconWxss, 'utf8')

// 移除 @font-face{...} 块
const before = content.length
content = content.replace(/@font-face\{[^}]*\}/g, '')
const after = content.length

if (before !== after) {
  fs.writeFileSync(iconWxss, content, 'utf8')
  console.log(`[fix-vant-font] 已移除 CDN @font-face 引用 (${before - after} bytes)`)
} else {
  console.log('[fix-vant-font] 未发现 @font-face，无需修复')
}
