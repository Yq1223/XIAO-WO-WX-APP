// 修复 Vant 图标字体 CDN 引用问题
// 1. 从 node_modules 复制字体文件到 static/fonts/
// 2. 移除 icon/index.wxss 中的 @font-face CDN 引用

const fs = require('fs')
const path = require('path')

const distIcon = path.join(__dirname, '..', 'node_modules', '@vant', 'weapp', 'dist', 'icon')
const fontDir = path.join(__dirname, '..', 'static', 'fonts')

// 确保字体目录存在
if (!fs.existsSync(fontDir)) {
  fs.mkdirSync(fontDir, { recursive: true })
}

// 从 node_modules 中查找并复制字体文件
const files = fs.readdirSync(distIcon)
let copied = 0
for (const file of files) {
  if (file.endsWith('.woff') || file.endsWith('.woff2')) {
    const src = path.join(distIcon, file)
    const ext = file.split('.').pop()
    const dest = path.join(fontDir, `vant-icon.${ext}`)
    fs.copyFileSync(src, dest)
    copied++
    console.log(`[fix-vant-font] 复制 ${file} → static/fonts/vant-icon.${ext}`)
  }
}

// 如果 node_modules 中没有字体文件，尝试从 CDN 下载
if (copied === 0) {
  console.log('[fix-vant-font] node_modules 中未找到字体文件，尝试从 CDN 下载...')
  try {
    const https = require('https')
    const urls = {
      'vant-icon.woff2': 'https://at.alicdn.com/t/c/font_2553510_kfwma2yq1rs.woff2',
      'vant-icon.woff': 'https://at.alicdn.com/t/c/font_2553510_kfwma2yq1rs.woff'
    }
    for (const [filename, url] of Object.entries(urls)) {
      const dest = path.join(fontDir, filename)
      if (fs.existsSync(dest)) continue
      const data = require('child_process').execSync(`curl -sL "${url}"`, { maxBuffer: 1024 * 1024 })
      fs.writeFileSync(dest, data)
      console.log(`[fix-vant-font] 下载 ${filename}`)
    }
  } catch (e) {
    console.log('[fix-vant-font] 下载失败，请手动将字体文件放入 static/fonts/ 目录')
  }
}

// 移除 icon/index.wxss 中的 @font-face 块
const iconWxss = path.join(distIcon, 'index.wxss')
if (fs.existsSync(iconWxss)) {
  let content = fs.readFileSync(iconWxss, 'utf8')
  const before = content.length
  content = content.replace(/@font-face\{[^}]*\}/g, '')
  if (before !== content.length) {
    fs.writeFileSync(iconWxss, content, 'utf8')
    console.log(`[fix-vant-font] 已移除 icon/index.wxss 中的 CDN @font-face`)
  }
}

console.log('[fix-vant-font] 完成')
