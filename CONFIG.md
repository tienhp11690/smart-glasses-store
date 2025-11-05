# Configuration Quick Reference

This file lists all the places you need to update when setting up the project.

## Initial Setup Checklist

### 1. Update Repository Name

If your GitHub repository name is different from `smart-glasses-store`, update these files:

**`vite.config.js`:**
```js
base: '/your-repo-name/', // Update this
```

**`src/App.jsx`:**
```jsx
<Router basename="/your-repo-name"> // Update this
```

**Note:** For Netlify/Vercel deployments, use `base: '/'` and `basename=""` or remove the basename prop.

### 2. Add Your Media Files

Place product images, GIFs, and videos in:
```
public/assets/
```

Supported formats:
- Images: `.jpg`, `.jpeg`, `.png`, `.webp`
- Animated: `.gif`
- Videos: `.mp4`, `.webm`, `.mov`

### 3. Update Product Data

Edit `public/data/products.json` to add your products. See the README for the schema.

### 4. Update Site Information

**`index.html`:**
- Update meta tags (title, description, Open Graph)
- Update favicon (replace `/vite.svg`)

**`src/components/Footer.jsx`:**
- Update contact information
- Update store address and hours

**`src/pages/Contact.jsx`:**
- Update store information
- Add Google Maps embed (optional)

### 5. Customize Branding

**Colors (`tailwind.config.js`):**
```js
colors: {
  primary: {
    // Customize your color palette
  }
}
```

**Fonts (`src/index.css`):**
Currently using Inter font. To change:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@...');
font-family: 'YourFont', ...;
```

### 6. Environment-Specific Settings

**For GitHub Pages:**
- Keep `base: '/your-repo-name/'` in `vite.config.js`
- Keep `basename="/your-repo-name"` in `App.jsx`

**For Netlify/Vercel:**
- Change to `base: '/'` in `vite.config.js`
- Remove `basename` prop or set to `""` in `App.jsx`

## File Locations Summary

| Item | File Location |
|------|--------------|
| Products Data | `public/data/products.json` |
| Orders Data | `public/data/orders.json` |
| Media Files | `public/assets/` |
| Site Configuration | `vite.config.js`, `src/App.jsx` |
| Styling | `tailwind.config.js`, `src/index.css` |
| Meta Tags | `index.html` |
| Contact Info | `src/components/Footer.jsx`, `src/pages/Contact.jsx` |

## Deployment-Specific Files

- **GitHub Pages**: No additional files needed
- **Netlify**: `netlify.toml`, `netlify/functions/`
- **Vercel**: Auto-detects, no config needed (or create `vercel.json`)

---

**Quick Start:** After cloning, update items 1-4 above, then run `npm install && npm run dev`.

