# 🛒 Hướng dẫn Setup Hệ thống Order

## ✅ Những gì đã cải tiến

### 1. OrderForm mới
- ✅ Hiển thị thông báo thành công khi đặt hàng
- ✅ Không còn tải CSV xuống
- ✅ Lưu vào localStorage nếu không có backend
- ✅ Giao diện đẹp hơn với animation
- ✅ Thêm field địa chỉ giao hàng

### 2. Netlify Function (Backend)
- ✅ Tự động lưu orders vào GitHub qua API
- ✅ Commit trực tiếp vào `public/data/orders.json`
- ✅ Admin có thể xem ngay trên trang Admin

### 3. Admin Dashboard
- ✅ Xem tất cả orders
- ✅ Filter theo trạng thái (pending, completed, cancelled)
- ✅ Export ra CSV
- ✅ Thống kê tổng quan
- ✅ Truy cập tại: `/admin`

## 🚀 Setup cho GitHub Pages (Hiện tại)

### Cách hoạt động:
1. User đặt hàng → Lưu vào **localStorage**
2. Hiển thị thông báo thành công
3. Admin truy cập `/admin` để xem orders từ localStorage
4. Export CSV để xử lý thủ công

### Truy cập Admin:
```
https://tienhp11690.github.io/smart-glasses-store/admin
```

## 🌐 Setup cho Netlify (Tự động lưu vào GitHub)

Để orders tự động lưu vào GitHub, bạn cần deploy lên Netlify:

### Bước 1: Tạo GitHub Personal Access Token

1. Vào GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Đặt tên: `smart-glasses-order-token`
4. Chọn scope: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy token** (chỉ hiện 1 lần!)

### Bước 2: Deploy lên Netlify

1. Đăng ký/Đăng nhập [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Chọn GitHub và repository `smart-glasses-store`
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click "Deploy site"

### Bước 3: Cấu hình Environment Variables

Vào Site settings → Environment variables → Add:

```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=tienhp11690
GITHUB_REPO=smart-glasses-store
```

### Bước 4: Test

1. Truy cập site Netlify của bạn
2. Đặt một order test
3. Xem orders trong Admin dashboard
4. Kiểm tra GitHub repo → `public/data/orders.json` đã có order mới!

## 📋 Cấu trúc Order Data

```json
{
  "orders": [
    {
      "orderId": "ORD-20251106-ABC123",
      "productId": "g001",
      "productName": "Smart Glass Pro",
      "price": 499,
      "color": "Black",
      "size": "M",
      "customerName": "Nguyen Van A",
      "phone": "+84 912 345 678",
      "email": "customer@example.com",
      "address": "123 Le Loi, Q1, TPHCM",
      "timestamp": "2025-11-06T10:30:00.000Z",
      "status": "pending"
    }
  ]
}
```

## 🔐 Bảo mật Admin Page

Hiện tại trang `/admin` public. Để bảo mật:

### Option 1: Basic Auth (Netlify)
```toml
# netlify.toml
[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200
  force = true
  headers = {X-From = "Netlify"}
  
# Add this to enable password protection
[[redirects]]
  from = "/admin/*"
  to = "/admin/:splat"
  status = 200
  force = true
  conditions = {Role = ["admin"]}
```

### Option 2: Add Login Form
Tạo component Login với password check:

```javascript
// Simple password check (for demo only)
const ADMIN_PASSWORD = "your-secure-password"

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onLogin()
    }
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

## 📊 Alternative Solutions

### 1. Google Sheets API
- Lưu orders vào Google Sheets
- Dễ setup, miễn phí
- Link: [Google Sheets API Guide](https://developers.google.com/sheets/api)

### 2. Formspree
- Service nhận form submissions
- Miễn phí 50 submissions/tháng
- Link: [Formspree](https://formspree.io)

### 3. Airtable
- Database + Spreadsheet hybrid
- API dễ dùng
- Link: [Airtable](https://airtable.com)

### 4. Supabase
- Open-source Firebase alternative
- PostgreSQL database
- Link: [Supabase](https://supabase.com)

## 🧪 Test Local

### 1. Install dependencies
```bash
npm install
```

### 2. Run dev server
```bash
npm run dev
```

### 3. Test order flow
1. Vào http://localhost:5173/smart-glasses-store/
2. Click vào sản phẩm
3. Điền form và đặt hàng
4. Kiểm tra thông báo thành công
5. Vào http://localhost:5173/smart-glasses-store/admin
6. Xem order vừa tạo

### 4. Test Netlify Functions locally
```bash
npm install -g netlify-cli
netlify dev
```

## 📱 Mobile Responsive

Tất cả trang đã responsive:
- ✅ Order form
- ✅ Admin dashboard
- ✅ Tables scroll horizontal trên mobile

## 🎨 Customization

### Thay đổi màu thông báo success:
File: `src/components/OrderForm.jsx`
```javascript
// Line 175-178
className={`p-4 rounded-lg ${
  submitStatus.type === 'success'
    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
    : 'bg-red-500/20 border border-red-500/50 text-red-300'
}`}
```

### Thay đổi message:
```javascript
// Line 62-65
message: '🎉 Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.',
```

## 📞 Support

Nếu gặp vấn đề, check:
1. Console log (F12) xem error
2. Network tab xem API calls
3. localStorage có orders không
4. Netlify Function logs

## ⚡ Performance

- Orders load từ static JSON → rất nhanh
- localStorage backup → không mất data
- Admin dashboard lazy load
- CSV export instant

## 🔄 Workflow

```mermaid
User Order
    ↓
Try API (Netlify Function)
    ↓
Success? → Save to GitHub
    ↓
No? → Save to localStorage
    ↓
Show Success Message
    ↓
Admin views in Dashboard
```

---

**Tóm lại:**
- ✅ OrderForm đã cải tiến xong
- ✅ Admin dashboard hoạt động
- ⚠️ Cần deploy Netlify để tự động lưu GitHub
- 📦 Fallback: localStorage cho GitHub Pages



