# 🎨 Enhanced Homepage Preview

## 📍 Preview URL
Navigate to: `/#/home-preview`

Or from your development server: `http://localhost:5173/#/home-preview`

## ✨ New Features Inspired by Rokid & DJI

### 1. **Hero Section**
- Full-screen video background with auto-loop
- Smooth parallax scrolling effects
- Animated scroll indicator
- Modern gradient text effects

### 2. **Features Section**
- Animated feature cards with hover effects
- Icon animations with spring physics
- Staggered entrance animations
- Glassmorphism design

### 3. **Products Showcase**
- 3-column grid layout
- Hover lift effects
- Product images with scale animation
- Smooth transitions to product details

### 4. **Technology Section**
- Side-by-side layout with media
- Checkmark list with staggered animation
- Floating gradient orbs
- Video/image support

### 5. **Call-to-Action Section**
- Centered CTA with animated background
- Rotating gradient effects
- Multiple CTA buttons
- Responsive design

## 🎬 Media Support

The enhanced homepage supports:
- ✅ **MP4 Videos** - Auto-loop, muted, plays inline
- ✅ **JPG/PNG Images** - Lazy loading, optimized
- ✅ **GIF Animations** - Auto-play support
- ✅ **Responsive Design** - Mobile, tablet, desktop

## 🚀 Animations Used

Based on [Rokid Glasses](https://global.rokid.com/pages/rokid-glasses) and [DJI Goggles 3](https://www.dji.com/global/goggles-3):

1. **Scroll Animations**: Fade-in on scroll with `useInView`
2. **Parallax Effects**: Hero section moves with scroll
3. **Hover Interactions**: Scale, lift, and glow effects
4. **Stagger Animations**: Sequential element reveals
5. **Floating Elements**: Gradient orbs with infinite animation

## 📱 Responsive Features

- Mobile-first design
- Fluid typography (clamp)
- Touch-friendly interactions
- Optimized media loading

## 🔄 How to Test

1. **View Preview**: Go to `/#/home-preview`
2. **Compare**: Switch between `/#/` (original) and `/#/home-preview` (new)
3. **Test Animations**: Scroll down to see all sections
4. **Test Responsive**: Resize browser or use mobile device
5. **Test Media**: Check video auto-play and image loading

## 🎯 Design Simplifications

Compared to reference sites, we simplified:
- ✅ Fewer sections (5 vs 10+)
- ✅ Cleaner animations (no complex 3D)
- ✅ Faster loading (optimized media)
- ✅ Better performance (fewer DOM elements)
- ✅ Easier maintenance (modular components)

## 💡 Key Differences from Original

| Original Home | Enhanced Home |
|---------------|---------------|
| Static layout | Full-screen hero |
| Simple grid | Animated sections |
| Basic transitions | Advanced parallax |
| Text-heavy | Media-rich |
| Single CTA | Multiple CTAs |

## 🔧 Customization Guide

### Change Hero Video
Edit line 69 in `HomeEnhanced.jsx`:
```javascript
src={`${import.meta.env.BASE_URL}assets/your-video.mp4`}
```

### Modify Features
Edit the `features` array in `FeaturesSection` component (lines 108-131)

### Update Products Count
Edit line 25:
```javascript
setProducts(data.slice(0, 3)) // Change 3 to any number
```

### Adjust Animation Speed
Modify `transition` duration values:
```javascript
transition={{ duration: 0.8 }} // Increase for slower
```

## 📝 Next Steps

1. **Review**: Check all animations and interactions
2. **Test**: Mobile, tablet, desktop views
3. **Decide**: Keep original or use enhanced
4. **Deploy**: 
   - To use new version: Replace `<Home />` with `<HomeEnhanced />` in App.jsx
   - To keep both: Keep current setup

## 🎨 Color Scheme

- Primary: Cyan (#06B6D4)
- Secondary: Purple (#A855F7)
- Background: Slate 900 (#0F172A)
- Glass effects: White with opacity
- Gradients: Cyan to Purple

## 🌐 Multilingual Support

✅ All text content supports EN/VI switching
✅ Uses existing translation system
✅ No additional configuration needed

---

**Created**: Based on Rokid Glasses and DJI Goggles 3 landing pages
**Simplified**: For better performance and maintainability
**Optimized**: For smart glasses e-commerce store


