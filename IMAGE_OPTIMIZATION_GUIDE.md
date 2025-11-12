# 📸 Hướng Dẫn Tối Ưu Hóa Ảnh

## 🎯 Mục tiêu
- **Đồng bộ size** thumbnail hiển thị trên catalogue
- **Tải nhanh** với ảnh đã compress
- **Tiết kiệm băng thông** 75-99%

---

## ✅ Đã Được Tối Ưu Hóa

### 1. **CSS Layout Optimization → `object-contain` + Flexbox Center**
Tất cả ảnh product dùng layout tối ưu:
- ✅ `src/components/ProductCard.jsx`
- ✅ `src/pages/Home.jsx`
- ✅ `src/pages/HomeEnhanced.jsx`
- ✅ `src/pages/ProductDetail.jsx`

**Thiết lập:**
- Container: `aspect-square` + `flex items-center justify-center` + `p-8`
- Image: `object-contain` (giữ nguyên ảnh, không crop)

**Kết quả:** 
- ✅ Container đồng bộ size (vuông đều)
- ✅ Ảnh không bị crop, hiển thị full
- ✅ Layout gọn gàng, ảnh center với padding đều

### 2. **Script Compress Ảnh**
Script `scripts/compressImages.js` tự động:
- Resize ảnh về **400x400px**
- Crop từ center với `fit: 'cover'`
- Compress quality **80%**
- Tiết kiệm **75-99%** dung lượng

**Ví dụ kết quả:**
```
Original: Glass08a.jpg = 3,100 KB
Thumbnail: Glass08a-thumb.jpg = 27 KB (99.1% smaller) ✅
```

---

## 🚀 Cách Sử Dụng

### Khi Thêm Ảnh Sản Phẩm Mới

#### Bước 1: Thêm ảnh vào `public/assets/`
```bash
public/assets/
  ├── Glass09a.jpg
  ├── Glass09b.jpg
  └── Glass09c.jpg
```

#### Bước 2: Chạy script compress
```bash
node scripts/compressImages.js
```

**Output:**
```bash
✅ Glass09a.jpg
   Original: 850 KB
   Thumbnail: 24 KB (97.2% smaller)
   → public/assets/thumbnails/Glass09a-thumb.jpg

✅ Glass09b.jpg
   ...
```

#### Bước 3: Tạo thumbnail chính (nếu cần)
```bash
# Copy thumbnail đầu tiên làm thumbnail chính
Copy-Item "public\assets\thumbnails\Glass09a-thumb.jpg" -Destination "public\assets\thumbnails\Glass09.jpg"
```

#### Bước 4: Update `products.json`
```json
{
  "id": "g009",
  "name": "New Product",
  "thumbnail": "assets/thumbnails/Glass09.jpg",
  "images": [
    "assets/Glass09a.jpg",
    "assets/Glass09b.jpg",
    "assets/Glass09c.jpg"
  ]
}
```

---

## 📊 Hiệu Suất

### Trước Tối Ưu ❌
| File | Size |
|------|------|
| Glass08.jpg | 999 KB |
| Glass08a.jpg | 3,100 KB |
| Glass08b.jpg | 2,984 KB |
| **Tổng** | **~7 MB** |

### Sau Tối Ưu ✅
| File | Size |
|------|------|
| Glass08.jpg | 27 KB |
| Glass08a-thumb.jpg | 27 KB |
| Glass08b-thumb.jpg | 29 KB |
| **Tổng** | **~83 KB** |

**Tiết kiệm:** 98.8% dung lượng! 🎉

---

## 🛠️ Cấu Hình Script

File: `scripts/compressImages.js`

```javascript
const CONFIG = {
  input: 'public/assets',
  output: 'public/assets/thumbnails',
  thumbnail: {
    width: 400,        // Chiều rộng
    height: 400,       // Chiều cao
    quality: 80,       // Chất lượng (0-100)
    fit: 'cover',      // Crop mode
    suffix: '-thumb'   // Suffix cho filename
  }
}
```

### Tùy Chỉnh

**Tăng chất lượng ảnh:**
```javascript
quality: 90  // Tăng lên 90% (file size lớn hơn)
```

**Thay đổi kích thước:**
```javascript
width: 600,   // Thumbnail lớn hơn
height: 600
```

**Thay đổi crop mode:**
```javascript
fit: 'contain',  // Giữ nguyên tỷ lệ, không crop
fit: 'cover',    // Crop để fill (recommended) ✅
fit: 'inside',   // Resize vừa khung, không crop
```

---

## 📝 Best Practices

### 1. **Luôn Compress Ảnh Trước Khi Deploy**
```bash
node scripts/compressImages.js
npm run build
npm run deploy
```

### 2. **Đặt Tên File Chuẩn**
- Sản phẩm: `Glass01.jpg`, `Glass02.jpg`, ...
- Chi tiết: `Glass01a.jpg`, `Glass01b.jpg`, ...
- Thumbnail: `Glass01-thumb.jpg` (auto generated)

### 3. **Kiểm Tra Dung Lượng**
```powershell
# Check thumbnail sizes
Get-ChildItem -Path "public\assets\thumbnails" | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}
```

**Mục tiêu:** 
- Thumbnail chính: < 50 KB ✅
- Thumbnail chi tiết: < 30 KB ✅
- Ảnh gốc detail: < 200 KB ⚠️

### 4. **Sử Dụng Thumbnail Trong JSON**
```json
// ✅ Good - Dùng thumbnail folder
"thumbnail": "assets/thumbnails/Glass01.jpg",

// ❌ Bad - Dùng ảnh gốc
"thumbnail": "assets/Glass01a.jpg"
```

---

## 🔍 Troubleshooting

### Vấn đề: Ảnh bị crop mất phần quan trọng

**Giải pháp 1:** Chỉnh vị trí crop
```javascript
// Trong scripts/compressImages.js
position: 'center'     // Default
position: 'top'        // Ưu tiên phần trên
position: 'bottom'     // Ưu tiên phần dưới
position: 'left'       // Ưu tiên phần trái
position: 'right'      // Ưu tiên phần phải
```

**Giải pháp 2:** Chuẩn bị ảnh gốc tỷ lệ 1:1
- Chỉnh sửa ảnh gốc thành 1000x1000px trước khi compress
- Script sẽ resize mượt hơn

### Vấn đề: Ảnh vẫn nặng sau compress

**Kiểm tra:**
```bash
# Xem file size
ls public\assets\thumbnails\*.jpg | Select Name, Length
```

**Giải pháp:**
- Giảm `quality` xuống 70-75
- Giảm kích thước xuống 300x300px
- Chuyển sang WebP format (nâng cao)

### Vấn đề: Ảnh không đồng bộ size

**Kiểm tra CSS:**
- Đảm bảo dùng `object-cover` (NOT `object-contain`)
- Đảm bảo có `aspect-square` wrapper
- Check `w-full h-full` classes

---

## 📈 Monitoring

### Check Loading Speed

1. Mở DevTools (F12)
2. Tab **Network**
3. Filter: **Img**
4. Reload trang

**Mục tiêu:**
- Mỗi thumbnail: < 50ms load time
- Total images: < 500ms
- Total page: < 2s

### Optimize Further

Nếu vẫn chậm:
1. **Lazy loading** (đã implement ✅)
2. **WebP format** (nâng cao)
3. **CDN** (cho production scale)
4. **Progressive JPEG** (đã enable ✅)

---

## 🎓 Kiến Thức Thêm

### Object Fit Values

| Value | Effect | Use Case |
|-------|--------|----------|
| `contain` | Giữ nguyên tỷ lệ, ảnh vừa khung, có khoảng trống | **Product thumbnails** ✅ |
| `cover` | Giữ nguyên tỷ lệ, fill đầy khung, có thể crop | Hero images, backgrounds |
| `fill` | Stretch ảnh fill đầy, méo tỷ lệ ❌ | Không dùng |
| `none` | Giữ nguyên size gốc ❌ | Không dùng |
| `scale-down` | Giống contain nhưng không scale up | Icons, logos |

**Lưu ý:** Chúng ta dùng `object-contain` để giữ nguyên full ảnh sản phẩm, kết hợp với:
- `aspect-square` container → Size đồng bộ
- `flex items-center justify-center` → Center ảnh
- `p-8` padding → Khoảng trống đều

### Sharp Library Features

Script dùng [Sharp](https://sharp.pixelplumbing.com/):
- ⚡ Nhanh nhất (10-20x faster than ImageMagick)
- 🎨 Quality tốt
- 💾 Memory efficient
- 🔧 Dễ customize

---

## ✨ Kết Luận

Với setup hiện tại:
- ✅ Thumbnails đồng bộ size hoàn hảo
- ✅ Load speed nhanh (tiết kiệm 75-99%)
- ✅ Tự động hóa compress workflow
- ✅ Dễ maintain và scale

**Workflow chuẩn:**
1. Thêm ảnh → `public/assets/`
2. Run → `node scripts/compressImages.js`
3. Update → `products.json`
4. Deploy → `npm run deploy`

🎉 Done!
