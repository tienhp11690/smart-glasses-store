# Feature Images Setup Guide

## 📁 Save Your Images

Please save the images you provided to the following locations:

### Main Feature Images
```
public/assets/features/
├── lens-options.jpg          (Image 1: Multiple lens options)
├── temperature.jpg           (Image 2: Temperature measurement)
├── ai-photo-transparent.jpg  (Image 3: Transparent glasses with AI features)
├── ai-chat.jpg              (Image 4: Woman reading with chat)
├── w630-specs.jpg           (Image 5: W630 detailed specs)
├── smart-glasses-hero.jpg   (Image 6: Two glasses on black background)
├── ai-features.jpg          (Image 7: AI role-play and features)
├── health-management.jpg    (Image 8: UV + HR & SpO2 monitoring)
└── seven-reasons.jpg        (Image 9: Grid layout with all features)
```

### Individual Feature Cards (from Image 9 - Seven Reasons)
If you want to use individual feature cards, crop Image 9 into separate images:

```
public/assets/features/
├── uv-detection.jpg         (Top-left: UV sensor)
├── health-monitoring.jpg    (Top-right: Heart rate monitoring)
├── ai-translation.jpg       (Middle-right: Translation feature)
├── ai-conversation.jpg      (Middle-left: AI chat conversation)
├── battery-life.jpg         (Middle-right-bottom: Battery feature)
├── waterproof.jpg           (Bottom-left: IP66 waterproof)
└── music-control.jpg        (Bottom-right: Music control)
```

## 🎯 How to Save the Images

1. **Right-click** on each image you uploaded in the chat
2. **Save as** with the filename indicated above
3. **Save to**: `D:\Project\smart-glasses-store\public\assets\features\`
4. Recommended format: **JPG** (for best performance)
5. Optimize images to **under 500KB** each if possible

## 📝 Image Specifications

All images have been configured in products.json with these recommended specs:
- **Format**: JPG or PNG
- **Size**: 800-1200px width recommended
- **File size**: Under 500KB for fast loading
- **Aspect ratio**: 16:9 or 4:3 works best

## ✅ Quick Compression

If images are too large, run:
```bash
npm run compress
```

This will automatically optimize all images in the features folder.


