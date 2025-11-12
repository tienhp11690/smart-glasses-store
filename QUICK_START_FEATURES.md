# Quick Start: Feature Images Setup

## ✅ What's Been Configured

I've set up visual feature grids for all 4 products using your provided marketing images.

## 📋 Summary by Product

### Product g001 (YH-HY-03 SERIES) - Camera with AI
**4 Feature Cards:**
1. 800W Pixels Camera
2. AI Photo Recognition
3. AI Chat & Voice
4. Smart Features (AI Role-play, Scene Record)

### Product g002 (YH-HY-01 SERIES) - Fashion Audio
**4 Feature Cards:**
1. Multiple Lens Options
2. Music Control
3. Long Battery Life
4. IP66 Waterproof

### Product g003 (YH-HY-02 SERIES) - Health Monitoring
**6 Feature Cards:**
1. Health Monitoring (HR & SpO₂)
2. Temperature Measurement
3. UV Detection
4. AI Translation (100+ languages)
5. AI Conversation
6. Health Management Overview

### Product g004 (YH-HY-05 SERIES) - W630 Series
**4 Feature Cards:**
1. W630 AI Recognition (8MP)
2. Multiple Lens Options
3. Smart Translation
4. All Features (Seven Reasons)

## 🎯 Your Action Items

### Step 1: Save Images (5 minutes)
Open `IMAGE_MAPPING_GUIDE.md` for detailed instructions.

**Required images** (save to `public/assets/features/`):
- lens-options.jpg
- temperature.jpg
- ai-photo-transparent.jpg
- ai-chat.jpg
- w630-specs.jpg
- smart-glasses-hero.jpg
- ai-features.jpg
- health-management.jpg
- seven-reasons.jpg

**Optional** (crop from Image 9 for better quality):
- uv-detection.jpg
- health-monitoring.jpg
- ai-translation.jpg
- ai-conversation.jpg
- battery-life.jpg
- waterproof.jpg
- music-control.jpg

### Step 2: Test Locally
```bash
npm run build
npm run preview
```

Navigate to any product detail page (e.g., `/product/g001`) and scroll down to see the features grid.

### Step 3: Deploy
```bash
npm run deploy
```

## 🎨 How It Looks

Each feature card displays:
- **Background Image**: Full-bleed product marketing image
- **Title**: Large, bold feature name (bilingual)
- **Description**: Brief feature description (bilingual)
- **Hover Effect**: Gradient overlay on hover

**Layout:** Responsive grid
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column (full width cards)

## 🌐 Bilingual Support

All feature content automatically switches between English and Vietnamese based on user's language selection.

**Example:**
- English: "Health Monitoring" / "HR & SpO₂ tracking..."
- Vietnamese: "Theo Dõi Sức Khỏe" / "Theo dõi nhịp tim & SpO₂..."

## 📱 Where Features Appear

Features grid appears on **Product Detail pages**:
- Below the main product info and order form
- Above the image lightbox
- Full-width section with title "KEY FEATURES" / "TÍNH NĂNG NỔI BẬT"

## 🔄 Easy Updates

To modify features in the future:

1. Edit `public/data/products.json`
2. Find the product's `featuresGrid` array
3. Update title, description, or image path
4. Rebuild and redeploy

**Example:**
```json
{
  "title": "New Feature",
  "title_vi": "Tính Năng Mới",
  "description": "Feature description",
  "description_vi": "Mô tả tính năng",
  "image": "assets/features/your-image.jpg"
}
```

## 📚 Full Documentation

- `FEATURES_GRID_GUIDE.md` - Component usage and configuration
- `IMAGE_MAPPING_GUIDE.md` - Detailed image saving instructions
- `FEATURE_IMAGES_SETUP.md` - Image directory setup

## 🚀 Preview URL

After deployment, visit:
`https://tienhp11690.github.io/smart-glasses-store/#/product/g001`

Change `g001` to `g002`, `g003`, or `g004` to see different products.

## 💡 Tips

1. **Image Quality**: Use high-quality JPG images (1200x800px recommended)
2. **File Size**: Keep images under 500KB for fast loading
3. **Compression**: Run `npm run compress` to auto-optimize
4. **Testing**: Test on mobile devices to ensure text is readable
5. **Consistency**: Use similar aspect ratios across all feature images

## 🆘 Need Help?

Check `TROUBLESHOOTING.md` or review the browser console for 404 errors on missing images.


