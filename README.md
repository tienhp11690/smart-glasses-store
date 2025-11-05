# Smart Glasses Store

A modern, responsive web application for showcasing and selling AI-powered smart glasses. Built with React, Vite, and TailwindCSS, optimized for deployment on GitHub Pages.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38B2AC?logo=tailwind-css)

## Features

- 🎨 **Modern UI/UX**: Glassmorphism design with smooth animations using Framer Motion
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🛍️ **Product Catalog**: Dynamic product grid loaded from JSON data
- 📸 **Media Support**: Images, GIFs, and video previews
- 📝 **Order Management**: Client-side order form with CSV/JSON export
- 🚀 **GitHub Pages Ready**: Configured for easy deployment

## Project Structure

```
smart-glasses-store/
├── public/
│   ├── assets/              # Images, GIFs, videos (add your media here)
│   └── data/
│       ├── products.json    # Product data
│       └── orders.json      # Order storage (example)
├── scripts/
│   ├── appendOrder.js      # Node script to append orders to JSON
│   └── appendOrderCSV.js   # Node script to append orders to CSV
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HomeHero.jsx
│   │   ├── Features.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── OrderForm.jsx
│   │   └── MediaDisplay.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Catalogue.jsx
│   │   ├── ProductDetail.jsx
│   │   └── Contact.jsx
│   ├── utils/
│   │   ├── dataLoader.js
│   │   └── orderHelper.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download this repository**

```bash
git clone <your-repo-url>
cd smart-glasses-store
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## Deployment to GitHub Pages

### Initial Setup

1. **Update the base path in `vite.config.js`**

   Change the `base` value to match your repository name:

   ```js
   // vite.config.js
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/', // Update this
   })
   ```

2. **Install gh-pages (if not already installed)**

   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy to GitHub Pages**

   ```bash
   npm run deploy
   ```

   This will:
   - Build the project
   - Deploy the `dist/` folder to the `gh-pages` branch
   - Your site will be available at `https://<username>.github.io/<repo-name>/`

### Automatic Deployment with GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Adding and Editing Products

### Adding Products

1. **Edit `/public/data/products.json`**

   Add a new product object to the `products` array:

   ```json
   {
     "id": "g004",
     "name": "Your Product Name",
     "price": 399,
     "currency": "USD",
     "colors": ["Black", "White"],
     "sizes": ["M", "L"],
     "images": [
       "assets/g004-hero.jpg",
       "assets/g004-demo.mp4"
     ],
     "shortDescription": "Brief product description",
     "longDescription": "Detailed product description with features and benefits."
   }
   ```

2. **Add Media Files**

   - Place images in `/public/assets/`
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.mp4`, `.webm`
   - Use relative paths in the `images` array (e.g., `"assets/product-hero.jpg"`)

3. **Commit and Push**

   ```bash
   git add public/data/products.json public/assets/
   git commit -m "Add new product"
   git push
   ```

### Editing Products

Simply edit the product object in `/public/data/products.json` and commit the changes.

## Order Management

### How Orders Work on GitHub Pages

**Important**: GitHub Pages is a static hosting service and cannot execute server-side code or write files to the server. This means:

1. **Client-Side Solution** (Current Implementation)
   - When a customer submits an order, a CSV file is automatically downloaded
   - The admin must manually collect these CSV files and add them to the repository
   - This is suitable for low-volume stores or as a temporary solution

2. **Recommended Production Solutions**
   - **Netlify Functions** (see example below)
   - **GitHub Actions** with webhook
   - **Third-party form services** (Formspree, Netlify Forms)
   - **Backend API** (Node.js, Python, etc.)

### Using the Order Scripts (Local Development)

For local testing or manual order management, you can use the provided scripts:

**Append to JSON:**

```bash
node scripts/appendOrder.js '{"orderId":"o1002","productId":"g001","productName":"Smart Glass Pro","color":"Black","size":"M","customerName":"John Doe","phone":"+1234567890","email":"john@example.com","timestamp":"2025-01-15T10:00:00Z"}'
```

**Append to CSV:**

```bash
node scripts/appendOrderCSV.js '{"orderId":"o1002",...}'
```

### Production Solution: Netlify Function Example

If you deploy to Netlify instead of GitHub Pages, you can use serverless functions:

**`netlify/functions/saveOrder.js`:**

```javascript
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const order = JSON.parse(event.body)
    
    // Save to database (e.g., MongoDB, Supabase, Airtable)
    // Or use Netlify's built-in storage
    // For this example, we'll just return success
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order saved', orderId: order.orderId })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
```

Then update `src/components/OrderForm.jsx` to POST to `/api/saveOrder` instead of downloading CSV.

## Customization

### Styling

- **Colors**: Edit `tailwind.config.js` to customize the color scheme
- **Fonts**: Update `src/index.css` to change fonts
- **Glassmorphism**: Adjust `glass` and `glass-strong` utilities in `src/index.css`

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add a route in `src/App.jsx`
3. Add navigation link in `src/components/Header.jsx`

## SEO and Meta Tags

Meta tags are configured in `index.html`. Update the following for your site:

- `description`
- `og:title`, `og:description`, `og:image`
- `twitter:card`, `twitter:title`, etc.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Images not loading

- Ensure images are in `/public/assets/`
- Check that paths in `products.json` are relative to the public folder
- Verify file names match exactly (case-sensitive)

### Build errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v16+)

### GitHub Pages not updating

- Ensure `base` path in `vite.config.js` matches your repo name
- Check that `gh-pages` branch exists and has the latest build
- Wait a few minutes for GitHub to process the deployment

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❤️ using React, Vite, and TailwindCSS**

