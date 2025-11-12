# 🚀 Hướng dẫn Deploy

## ✅ Đã hoàn thành

Deploy thành công! Các file ảnh đã được push lên branch `gh-pages`:
- `assets/Glass01a.jpg` (461 KB)
- `assets/Glass01b.jpg` (538 KB)
- `assets/Glass01c.jpg` (140 KB)
- `assets/hero-media.mp4` (20 MB)

## 🔧 Những gì đã sửa

### 1. Thêm file `.nojekyll`
- Tạo file `.nojekyll` trong thư mục `public/`
- Tự động tạo file này trong script `predeploy`
- Ngăn GitHub Pages sử dụng Jekyll (có thể bỏ qua assets)

### 2. Cập nhật script deploy
```json
"predeploy": "set NODE_ENV=production && npm run build && echo. > dist\\.nojekyll",
"deploy": "gh-pages -d dist --dotfiles --add"
```
- `--dotfiles`: Deploy cả file `.nojekyll`
- `--add`: Force add tất cả files

### 3. Cấu hình Vite
```javascript
build: {
  assetsInlineLimit: 0, // Không inline assets, luôn copy vào assets/
}
```

## 📝 Các bước tiếp theo

### 1. Đợi GitHub Pages build (2-3 phút)
GitHub Pages cần thời gian để build và deploy. Kiểm tra progress tại:
- Settings → Pages → GitHub Pages build progress

### 2. Test ảnh trên production
Truy cập: https://tienhp11690.github.io/smart-glasses-store/

Test URL ảnh trực tiếp:
- https://tienhp11690.github.io/smart-glasses-store/assets/Glass01a.jpg
- https://tienhp11690.github.io/smart-glasses-store/assets/Glass01b.jpg
- https://tienhp11690.github.io/smart-glasses-store/assets/Glass01c.jpg

### 3. Hard refresh browser
- **Windows/Linux**: `Ctrl + Shift + R` hoặc `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`
- Hoặc mở Incognito/Private window

### 4. Kiểm tra console (F12)
Nếu ảnh vẫn không hiện:
1. Mở Developer Tools (F12)
2. Vào tab Console
3. Xem có lỗi 404 (Not Found) không
4. Kiểm tra Network tab xem request đến đâu

## 🔍 Troubleshooting

### Nếu ảnh vẫn không hiện

#### Kiểm tra 1: Files có trong gh-pages branch không?
```bash
git fetch origin gh-pages:gh-pages
git ls-tree -r --name-only gh-pages | Select-String "\.jpg"
```

#### Kiểm tra 2: URL có đúng không?
URL ảnh phải có dạng:
```
https://tienhp11690.github.io/smart-glasses-store/assets/Glass01a.jpg
```

Không phải:
```
https://tienhp11690.github.io/assets/Glass01a.jpg  ❌
```

#### Kiểm tra 3: BASE_URL trong code
Trong `vite.config.js`:
```javascript
base: isProduction ? '/smart-glasses-store/' : '/',
```

#### Kiểm tra 4: products.json
File `public/data/products.json` phải có paths đúng:
```json
"images": [
  "assets/Glass01a.jpg",
  "assets/Glass01b.jpg",
  "assets/Glass01c.jpg"
]
```

### Nếu cần deploy lại
```bash
npm run deploy
```

Hoặc xóa cache và deploy:
```bash
Remove-Item -Path "node_modules\.cache\gh-pages" -Recurse -Force
npm run deploy
```

## 📊 Lưu ý về File Size

GitHub Pages có giới hạn:
- Max file size: **100 MB**
- Max repo size: **1 GB**
- Khuyến nghị: file < 1 MB

File `hero-media.mp4` (~20 MB) có thể load chậm. Nên:
- Nén video nhỏ hơn (< 5 MB)
- Hoặc host video trên CDN/YouTube

## 🎯 Kết luận

Deploy đã thành công! Chỉ cần:
1. ⏰ Đợi 2-3 phút
2. 🔄 Hard refresh browser
3. ✅ Kiểm tra ảnh đã load chưa

Nếu sau 5 phút vẫn không thấy ảnh, kiểm tra lại các bước troubleshooting ở trên.



