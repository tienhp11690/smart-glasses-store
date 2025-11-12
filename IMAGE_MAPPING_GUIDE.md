# Feature Images Mapping Guide

## 📸 Save Your Images to These Exact Filenames

Based on the images you provided, here's exactly how to save each one:

### Image 1: Multiple Lens Options (3 glasses showing different lenses)
**Save as:** `lens-options.jpg`
**Location:** `public/assets/features/lens-options.jpg`
**Used in:** g002 (YH-HY-01 SERIES), g004 (YH-HY-05 SERIES)

---

### Image 2: Temperature Measurement (Woman with temperature overlay)
**Save as:** `temperature.jpg`
**Location:** `public/assets/features/temperature.jpg`
**Used in:** g003 (YH-HY-02 SERIES)

---

### Image 3: Smart AI Photo Glasses (Transparent glasses on black background)
**Save as:** `ai-photo-transparent.jpg`
**Location:** `public/assets/features/ai-photo-transparent.jpg`
**Used in:** g001 (YH-HY-03 SERIES)

---

### Image 4: AI Chat (Woman reading book with chat bubble)
**Save as:** `ai-chat.jpg`
**Location:** `public/assets/features/ai-chat.jpg`
**Used in:** g001 (YH-HY-03 SERIES)

---

### Image 5: W630 Specs (Detailed product specifications)
**Save as:** `w630-specs.jpg`
**Location:** `public/assets/features/w630-specs.jpg`
**Used in:** g004 (YH-HY-05 SERIES)

---

### Image 6: Smart Glasses Hero (Two glasses - clear and dark)
**Save as:** `smart-glasses-hero.jpg`
**Location:** `public/assets/features/smart-glasses-hero.jpg`
**Used in:** g001 (YH-HY-03 SERIES)

---

### Image 7: AI Features (App interface showing role-play)
**Save as:** `ai-features.jpg`
**Location:** `public/assets/features/ai-features.jpg`
**Used in:** g001 (YH-HY-03 SERIES)

---

### Image 8: Health Management (UV + HR & SpO2)
**Save as:** `health-management.jpg`
**Location:** `public/assets/features/health-management.jpg`
**Used in:** g003 (YH-HY-02 SERIES)

---

### Image 9: Seven Reasons (Grid layout)
**Save as:** `seven-reasons.jpg`
**Location:** `public/assets/features/seven-reasons.jpg`
**Used in:** g004 (YH-HY-05 SERIES)

**Also crop individual sections and save as:**
- `uv-detection.jpg` (Top-left card)
- `health-monitoring.jpg` (Top-right card)
- `ai-translation.jpg` (Middle-right card)
- `ai-conversation.jpg` (Middle-left card)
- `battery-life.jpg` (Middle-right-bottom card)
- `waterproof.jpg` (Bottom-left card)
- `music-control.jpg` (Bottom-right card)

These individual cards are used in:
- **g002:** music-control, battery-life, waterproof
- **g003:** health-monitoring, uv-detection, ai-translation, ai-conversation

---

## 🚀 Quick Save Instructions

1. **Open each image in your image viewer**
2. **Right-click → Save As**
3. **Navigate to:** `D:\Project\smart-glasses-store\public\assets\features\`
4. **Use exact filename** from the list above
5. **Save as JPG format** (preferred)

## ✂️ For Image 9 (Seven Reasons) - Optional Cropping

If you want better quality individual cards:

1. Open Image 9 in an image editor (e.g., Paint, Photoshop, GIMP)
2. Crop each card individually
3. Save with the specified filenames
4. Recommended size: 600x400px per card

**OR** you can use the full grid image for some products and it will still look good!

## ✅ Verification

After saving all images, your folder structure should look like:

```
public/assets/features/
├── lens-options.jpg          ✓
├── temperature.jpg           ✓
├── ai-photo-transparent.jpg  ✓
├── ai-chat.jpg              ✓
├── w630-specs.jpg           ✓
├── smart-glasses-hero.jpg   ✓
├── ai-features.jpg          ✓
├── health-management.jpg    ✓
├── seven-reasons.jpg        ✓
├── uv-detection.jpg         ✓ (optional - from crop)
├── health-monitoring.jpg    ✓ (optional - from crop)
├── ai-translation.jpg       ✓ (optional - from crop)
├── ai-conversation.jpg      ✓ (optional - from crop)
├── battery-life.jpg         ✓ (optional - from crop)
├── waterproof.jpg           ✓ (optional - from crop)
└── music-control.jpg        ✓ (optional - from crop)
```

## 📊 Products Using Each Image

### g001 (YH-HY-03 SERIES) - Camera Series
- ai-photo-transparent.jpg
- smart-glasses-hero.jpg
- ai-chat.jpg
- ai-features.jpg

### g002 (YH-HY-01 SERIES) - Fashion Series
- lens-options.jpg
- music-control.jpg
- battery-life.jpg
- waterproof.jpg

### g003 (YH-HY-02 SERIES) - Camera Series with Health
- health-monitoring.jpg
- temperature.jpg
- uv-detection.jpg
- ai-translation.jpg
- ai-conversation.jpg
- health-management.jpg

### g004 (YH-HY-05 SERIES) - Fashion Series
- w630-specs.jpg
- lens-options.jpg
- ai-translation.jpg
- seven-reasons.jpg

## 🎯 Next Steps

After saving all images:

1. Run `npm run build` to test locally
2. Check product detail pages to see features display
3. Deploy: `npm run deploy`
4. Visit your GitHub Pages site to see the results!

## 🔧 Troubleshooting

**Images not showing?**
- Check filenames match exactly (case-sensitive)
- Ensure images are in `public/assets/features/` folder
- Clear browser cache and rebuild
- Check browser console for 404 errors

**Images too large?**
```bash
npm run compress
```
This will automatically optimize all feature images.


