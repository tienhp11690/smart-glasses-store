# Features Grid Guide

## Overview
The Features Grid allows you to display product features in a visually appealing grid layout with background images/media, similar to premium product pages like Rokid and DJI.

## Directory Structure

Create a dedicated folder for feature images:
```
public/
  assets/
    features/           # Feature background images
      camera-feature.jpg
      ai-feature.jpg
      battery-feature.jpg
      design-feature.jpg
```

## Product Configuration

In `public/data/products.json`, add a `featuresGrid` array to your product:

```json
{
  "id": "g001",
  "name": "YH-HY-03 SERIES",
  "featuresGrid": [
    {
      "title": "Advanced Camera",
      "title_vi": "Camera Tiên Tiến",
      "description": "12Mp high-definition POV camera",
      "description_vi": "Camera POV độ phân giải cao 12Mp",
      "image": "assets/features/camera-feature.jpg"
    },
    {
      "title": "AI Assistant",
      "title_vi": "Trợ Lý AI",
      "description": "Ask AI anything",
      "description_vi": "Hỏi AI mọi thứ",
      "image": "assets/features/ai-feature.jpg"
    }
  ]
}
```

## Supported Media Types

The Features Grid supports:
- **JPG/JPEG** - Best for photographs
- **PNG** - Best for graphics with transparency
- **GIF** - Animated graphics (auto-loops)
- **MP4/WebM** - Videos (auto-plays and loops)

## Image Guidelines

### Recommended Specifications:
- **Aspect Ratio**: 16:9 or 4:3
- **Minimum Size**: 800x600px
- **Optimal Size**: 1200x800px
- **File Size**: Keep under 500KB for best performance
- **Format**: 
  - JPG for photos (80% quality)
  - GIF for simple animations (under 1MB)
  - MP4 for videos (compressed, under 2MB)

### Image Preparation:
1. Use the compression script for JPG/PNG:
   ```bash
   npm run compress
   ```

2. For GIFs: Use online tools to optimize (e.g., ezgif.com)

3. For MP4 videos: Use FFmpeg to compress:
   ```bash
   ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4
   ```

## Layout Behavior

The grid automatically adjusts based on the number of features:

- **4 features**: 2x2 grid
- **6 features**: 2 large top cards, 3 medium cards, 1 large bottom card
- **Other**: Responsive 3-column grid (2 columns on tablet, 1 on mobile)

## Bilingual Support

The component automatically displays content based on the selected language:
- `title` and `title_vi` for feature headings
- `description` and `description_vi` for feature descriptions

## Example: Adding a Video Feature

```json
{
  "title": "Real-time Translation",
  "title_vi": "Dịch Thời Gian Thực",
  "description": "Instant subtitles in the lenses",
  "description_vi": "Phụ đề tức thì trên kính",
  "image": "assets/features/translation-demo.mp4"
}
```

## Tips

1. **Visual Hierarchy**: Place your most important feature first (top-left)
2. **Contrast**: Use dark images for better text readability
3. **Action Shots**: Show features in use rather than static product shots
4. **Consistency**: Keep similar aspect ratios across all feature images
5. **Performance**: Optimize all images before uploading

## Migration Notes

The old `features` array (simple text tags) still works alongside `featuresGrid`:
- `features`: Small tag badges above the model selector
- `featuresGrid`: Large visual grid section below the main product info

You can use both or either depending on your needs.


