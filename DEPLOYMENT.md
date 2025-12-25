# 部署到 GitHub Pages 指南

## 步驟 1️⃣：在 GitHub 建立新儲存庫

1. 前往 [GitHub](https://github.com)
2. 點擊右上角的 `+` 號，選擇 `New repository`
3. 填寫儲存庫資訊：
   - **Repository name**: `music-store` (或你喜歡的名稱)
   - **Description**: `樂器行網站`
   - **Public** (必須是 Public 才能使用免費的 GitHub Pages)
   - ⚠️ **不要**勾選 "Add a README file"
   - ⚠️ **不要**勾選 "Add .gitignore"
4. 點擊 `Create repository`

## 步驟 2️⃣：推送程式碼到 GitHub

在終端機中執行以下命令（請將 `YOUR-USERNAME` 替換成你的 GitHub 使用者名稱）：

```bash
cd music-store
git remote add origin https://github.com/YOUR-USERNAME/music-store.git
git branch -M main
git push -u origin main
```

如果需要登入，請使用你的 GitHub 帳號和 Personal Access Token。

### 如何建立 Personal Access Token：
1. GitHub 右上角頭像 → Settings
2. 左側選單最下方 → Developer settings
3. Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. 勾選 `repo` 權限
6. 複製 token（只會顯示一次！）

## 步驟 3️⃣：啟用 GitHub Pages

1. 前往你的 GitHub 儲存庫頁面
2. 點擊 `Settings` 標籤
3. 左側選單點擊 `Pages`
4. 在 **Source** 區域：
   - Branch: 選擇 `main`
   - Folder: 選擇 `/ (root)`
5. 點擊 `Save`

## 步驟 4️⃣：等待部署完成

- GitHub 會自動部署你的網站
- 通常需要 1-3 分鐘
- 部署完成後，頁面上方會顯示網址：
  ```
  Your site is live at https://YOUR-USERNAME.github.io/music-store/
  ```

## 步驟 5️⃣：訪問你的網站

在瀏覽器開啟：`https://YOUR-USERNAME.github.io/music-store/`

## 🎉 完成！

你的樂器行網站現在已經上線了！

## 更新網站

當你想更新網站內容時：

```bash
cd music-store
# 修改檔案後...
git add .
git commit -m "更新說明"
git push
```

GitHub Pages 會自動重新部署，通常幾分鐘內就會看到更新。

## 疑難排解

### 問題：網站顯示 404
- 確認儲存庫是 Public
- 確認 GitHub Pages 設定正確
- 等待幾分鐘讓部署完成

### 問題：樣式沒有載入
- 檢查 index.html 中的路徑是否正確
- 確認所有檔案都已推送到 GitHub

### 問題：推送時要求密碼
- GitHub 已不支援密碼登入
- 請使用 Personal Access Token 代替密碼

