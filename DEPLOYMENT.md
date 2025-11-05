# Deployment Guide

This document provides detailed instructions for deploying the Smart Glasses Store to various hosting platforms.

## Table of Contents

1. [GitHub Pages](#github-pages)
2. [Netlify](#netlify)
3. [Vercel](#vercel)
4. [Custom Domain Setup](#custom-domain-setup)

## GitHub Pages

### Prerequisites

- GitHub account
- Repository created on GitHub
- `gh-pages` package installed (already in package.json)

### Steps

1. **Update Base Path**

   Edit `vite.config.js` and update the `base` value:

   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/', // Change this to your repository name
   })
   ```

2. **Deploy**

   ```bash
   npm run deploy
   ```

   This will:
   - Build your project
   - Push the `dist/` folder to the `gh-pages` branch
   - Trigger GitHub Pages deployment

3. **Enable GitHub Pages**

   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select `gh-pages` branch
   - Save changes

4. **Access Your Site**

   Your site will be available at:
   ```
   https://<username>.github.io/<repo-name>/
   ```

### Automatic Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## Netlify

### Prerequisites

- Netlify account
- Netlify CLI (optional, for local testing)

### Steps

1. **Build Configuration**

   Create `netlify.toml` in the root:

   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via Netlify Dashboard**

   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Deploy via CLI**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login
   netlify login

   # Deploy
   netlify deploy --prod
   ```

4. **Enable Order Saving (Optional)**

   If you want to use the serverless function for orders:
   - The function is already in `netlify/functions/saveOrder.js`
   - Update `src/components/OrderForm.jsx` to POST to `/.netlify/functions/saveOrder`
   - Connect to a database (MongoDB, Supabase, etc.) in the function

## Vercel

### Prerequisites

- Vercel account

### Steps

1. **Install Vercel CLI** (optional)

   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**

   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Deploy via CLI**

   ```bash
   vercel
   ```

4. **Update Base Path**

   If needed, update `vite.config.js`:

   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/', // Vercel uses root path
   })
   ```

## Custom Domain Setup

### GitHub Pages

1. Go to repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Add a `CNAME` file in your repository root with your domain
4. Configure DNS records with your domain provider:
   - Add a CNAME record pointing to `<username>.github.io`

### Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Netlify will automatically provision SSL certificate

### Vercel

1. Go to Project settings → Domains
2. Add your domain
3. Configure DNS records as instructed
4. Vercel will automatically provision SSL certificate

## Environment Variables

If you need to use environment variables (e.g., for API keys):

1. **GitHub Pages**: Use GitHub Secrets with Actions
2. **Netlify**: Site settings → Environment variables
3. **Vercel**: Project settings → Environment Variables

Access in code using `import.meta.env.VITE_YOUR_VAR` (Vite requires `VITE_` prefix for client-side vars).

## Troubleshooting

### Build Fails

- Check Node.js version (should be 16+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors if using `.ts` files

### Routes Not Working

- Ensure redirect rules are set (all routes → `/index.html`)
- For GitHub Pages, check that `base` path is correct
- For Netlify/Vercel, check `netlify.toml` or `vercel.json`

### Images Not Loading

- Verify images are in `/public/assets/`
- Check paths in `products.json` are relative to public folder
- Ensure case-sensitive file names match exactly

---

**Need Help?** Open an issue on GitHub or check the main README.md for more details.

