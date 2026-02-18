# ☁ CloudFlow — SaaS 服務首頁

一個使用純 HTML、CSS、JavaScript 打造的 SaaS 服務首頁，並透過 **Bun** 進行建置與資源最小化。

## 📁 專案結構

```
├── index.html          # 首頁（開發版本）
├── src/
│   ├── css/
│   │   └── style.css   # 樣式表
│   └── js/
│       └── main.js     # 互動腳本
├── build.js            # Bun 建置腳本
├── serve.js            # Bun 本地開發伺服器
├── package.json        # 專案設定
├── dist/               # 建置輸出（自動產生，已加入 .gitignore）
│   ├── index.html
│   ├── css/style.min.css
│   └── js/main.min.js
└── README.md
```

## 🚀 快速開始

### 環境需求

- [Bun](https://bun.sh/) v1.0+

### 安裝 Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

### 開發預覽（啟動本地伺服器）

```bash
bun run dev
```

啟動後在瀏覽器開啟 **http://localhost:3000** 即可預覽網頁。

> 也可以直接用瀏覽器開啟 `index.html` 檔案來預覽。

### 建置（最小化）

```bash
bun run build
```

建置後的檔案會輸出至 `dist/` 目錄，包含最小化的 HTML、CSS 和 JS。

### 預覽建置結果

```bash
bun run preview
```

此指令會先執行建置，然後啟動伺服器預覽 `dist/` 目錄中的最小化版本。

## ✨ 功能特色

- **純 HTML/CSS/JS** — 無框架依賴，輕量快速
- **響應式設計** — 支援桌面、平板、手機
- **Bun 建置** — 自動最小化 HTML、CSS、JS 資源
- **滾動動畫** — 卡片滾動進場效果
- **行動選單** — 手機版漢堡選單

## 📄 頁面區塊

| 區塊 | 說明 |
|------|------|
| Header | 固定導覽列，滾動時顯示陰影 |
| Hero | 主視覺區，包含 CTA 按鈕 |
| Features | 六大功能特色卡片 |
| Pricing | 三種定價方案 |
| Testimonials | 客戶評價 |
| CTA | 行動呼籲區 |
| Footer | 頁尾連結與版權資訊 |

## 📜 授權

MIT License
