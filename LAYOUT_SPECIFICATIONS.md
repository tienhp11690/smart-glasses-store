# Feature Grid Layout Specifications

## 📐 Layout Pattern: "Rokid Style"

Your features grid now uses a **fixed layout** with **6 cards** of varying sizes, inspired by the Rokid example you provided.

## 🎨 Visual Layout Map

```
Desktop View (12-column grid):
┌─────────────────┬──────────────────────┬──────────────┐
│                 │                      │              │
│   CARD 1        │      CARD 2          │   CARD 3     │
│   (Large)       │      (Wide)          │   (Medium)   │
│   Vertical      │      Horizontal      │   Square     │
│   4 cols        │      5 cols          │   3 cols     │
│   400px tall    │      250px tall      │   250px tall │
│                 │                      │              │
│                 ├──────────┬───────────┼──────────────┤
│                 │          │           │              │
│                 │  CARD 4  │  CARD 5   │   CARD 6     │
│                 │ (Medium) │ (Medium)  │   (Medium)   │
│                 │  Square  │  Square   │   Square     │
│                 │  4 cols  │  4 cols   │   4 cols     │
│                 │ 250px t  │ 250px t   │   250px t    │
└─────────────────┴──────────┴───────────┴──────────────┘
```

## 📊 Card Specifications

### Card 1 (Position 0) - LARGE VERTICAL
**Feature:** 800W AI Photo Glasses
- **Grid Position:** Top-left
- **Size:** Large (4 columns wide, spans 2 rows)
- **Dimensions:** ~600px × 400px
- **Aspect Ratio:** 3:2 (horizontal) or 4:3
- **Recommended Image:** Product hero shot with vertical composition
- **Min Height:** 400px

### Card 2 (Position 1) - WIDE HORIZONTAL
**Feature:** Multiple Lens Options
- **Grid Position:** Top-center
- **Size:** Wide (5 columns wide)
- **Dimensions:** ~750px × 250px
- **Aspect Ratio:** 3:1 (wide horizontal)
- **Recommended Image:** Multiple products side-by-side
- **Min Height:** 250px

### Card 3 (Position 2) - MEDIUM SQUARE
**Feature:** Health Monitoring
- **Grid Position:** Top-right
- **Size:** Medium (3 columns wide)
- **Dimensions:** ~450px × 250px
- **Aspect Ratio:** 16:9 or 5:3
- **Recommended Image:** Person using product
- **Min Height:** 250px

### Card 4 (Position 3) - MEDIUM SQUARE
**Feature:** AI Chat & Translation
- **Grid Position:** Bottom-left
- **Size:** Medium (4 columns wide)
- **Dimensions:** ~600px × 250px
- **Aspect Ratio:** 16:9 or 2.4:1
- **Recommended Image:** AI interface or user interaction
- **Min Height:** 250px

### Card 5 (Position 4) - MEDIUM SQUARE
**Feature:** Smart Features
- **Grid Position:** Bottom-center
- **Size:** Medium (4 columns wide)
- **Dimensions:** ~600px × 250px
- **Aspect Ratio:** 16:9 or 2.4:1
- **Recommended Image:** App interface or smart features
- **Min Height:** 250px

### Card 6 (Position 5) - MEDIUM SQUARE
**Feature:** Complete Ecosystem
- **Grid Position:** Bottom-right
- **Size:** Medium (4 columns wide)
- **Dimensions:** ~600px × 250px
- **Aspect Ratio:** 16:9 or 2.4:1
- **Recommended Image:** Product overview or ecosystem
- **Min Height:** 250px

## 🎯 Image Creation Guidelines

### Recommended Image Sizes

For best results, create images in these exact dimensions:

| Card # | Name | Dimensions | Aspect | File Size |
|--------|------|------------|--------|-----------|
| 1 | ai-photo-transparent.jpg | 1200 × 800px | 3:2 | <300KB |
| 2 | lens-options.jpg | 1500 × 500px | 3:1 | <400KB |
| 3 | temperature.jpg | 900 × 500px | 16:9 | <250KB |
| 4 | ai-chat.jpg | 1200 × 500px | 2.4:1 | <300KB |
| 5 | ai-features.jpg | 1200 × 500px | 2.4:1 | <300KB |
| 6 | health-management.jpg | 1200 × 500px | 2.4:1 | <300KB |

### Design Tips

1. **Card 1 (Large Vertical)**
   - Use a portrait or square composition
   - Main hero product shot
   - Can have more vertical content
   - Should be your most impressive visual

2. **Card 2 (Wide Horizontal)**
   - Perfect for showing 2-3 items side-by-side
   - Great for "multiple options" themes
   - Use horizontal composition
   - Keep important content centered

3. **Cards 3-6 (Medium)**
   - Standard 16:9 landscape format
   - Single subject or focused scene
   - Keep text overlay area in bottom 1/3
   - Leave top 2/3 for visual content

### Text Overlay Safety

All images should leave the **bottom 30%** relatively clear or dark for text overlay:

```
┌─────────────────────┐
│                     │ ← Image content area
│   Your Image        │ ← (70% of height)
│   Content Here      │
│                     │
├─────────────────────┤
│ [Dark/Clear Area]   │ ← Text overlay zone
│ Title Text          │ ← (30% of height)
│ Description Text    │
└─────────────────────┘
```

## 📱 Responsive Behavior

### Desktop (>1024px)
- 12-column grid
- All cards visible as specified above
- Cards maintain aspect ratios

### Tablet (768px - 1024px)
- 6-column grid
- Cards resize proportionally
- Some cards may stack

### Mobile (<768px)
- 1-column grid
- All cards full width
- Stacked vertically in order

## 🎨 Alternative Layout: "DJI Style"

If you prefer a different layout, I also configured a **"DJI Style"** layout. To use it, just change the layout prop in `HomeEnhanced.jsx`:

```javascript
<FeaturesGrid layout="dji" ... />
```

### DJI Layout Pattern:
```
┌──────────────┬──────────────┐
│   CARD 1     │   CARD 2     │  2 horizontal cards
│  (Horizontal)│  (Horizontal)│  (280px tall)
├────┬─────────┼──────┬───────┤
│ C3 │  CARD 4 │ C5   │ CARD 6│  C3: small square
│(sq)│ (Medium)│(med) │(Large)│  C6: large vertical
│    │         │      │ Vert  │
│    │         │      │       │
└────┴─────────┴──────┴───────┘
```

## 🔧 Technical Details

### Grid System
- Uses CSS Grid with column spans
- `md:col-span-X` for medium screens
- `lg:col-span-X` for large screens
- Automatic gap spacing (1rem)

### Image Loading
- All images use `object-cover` (fills card, crops if needed)
- Lazy loading enabled
- Gradient overlay for text readability

### Current Order in HomeEnhanced.jsx
1. 800W AI Photo Glasses
2. Multiple Lens Options
3. Health Monitoring
4. AI Chat & Translation
5. Smart Features
6. Complete Ecosystem

## 📝 Quick Checklist

Before creating your images:

- [ ] Review the layout map above
- [ ] Note the aspect ratio for each position
- [ ] Create 6 images with specified dimensions
- [ ] Leave bottom 30% clear/dark for text
- [ ] Compress images to target file size
- [ ] Name files exactly as specified
- [ ] Save to `public/assets/features/`
- [ ] Test on desktop, tablet, and mobile

## 🚀 After Creating Images

1. Save images to `public/assets/features/`
2. Clear browser cache
3. Visit `http://localhost:4173/#/home-preview`
4. Scroll to "KEY FEATURES"
5. Verify layout looks good
6. Test language switching (EN/VI)
7. Test on different screen sizes
8. Deploy!

---

**Need help?** If the layout doesn't look right, you can switch to the 'dji' layout or adjust the `layoutConfigs` in `src/components/FeaturesGrid.jsx`.


