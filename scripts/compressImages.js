/**
 * Image Compression Script
 * 
 * This script compresses images in public/assets/ and creates thumbnails
 * 
 * Usage:
 *   node scripts/compressImages.js
 * 
 * Requirements:
 *   npm install sharp --save-dev
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const CONFIG = {
  input: 'public/assets',
  output: 'public/assets/thumbnails',
  thumbnail: {
    width: 400,
    height: 400,
    quality: 80,
    fit: 'cover', // Crop to fit exact dimensions
    suffix: '-thumb'
  },
  optimized: {
    quality: 85,
    progressive: true
  }
}

// Create output directory if it doesn't exist
if (!fs.existsSync(CONFIG.output)) {
  fs.mkdirSync(CONFIG.output, { recursive: true })
  console.log(`✅ Created directory: ${CONFIG.output}`)
}

// Get all image files
const getImageFiles = (dir) => {
  const files = fs.readdirSync(dir)
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
  })
}

// Compress and create thumbnail
const processImage = async (filename) => {
  const inputPath = path.join(CONFIG.input, filename)
  const name = path.parse(filename).name
  const ext = path.parse(filename).ext
  
  try {
    // Get original file size
    const originalStats = fs.statSync(inputPath)
    const originalSize = (originalStats.size / 1024).toFixed(2)
    
    // Create thumbnail
    const thumbnailName = `${name}${CONFIG.thumbnail.suffix}${ext}`
    const thumbnailPath = path.join(CONFIG.output, thumbnailName)
    
    await sharp(inputPath)
      .resize(CONFIG.thumbnail.width, CONFIG.thumbnail.height, {
        fit: CONFIG.thumbnail.fit || 'cover',
        position: 'center'
      })
      .jpeg({ quality: CONFIG.thumbnail.quality, progressive: true })
      .toFile(thumbnailPath)
    
    // Get thumbnail size
    const thumbnailStats = fs.statSync(thumbnailPath)
    const thumbnailSize = (thumbnailStats.size / 1024).toFixed(2)
    const saved = ((1 - thumbnailStats.size / originalStats.size) * 100).toFixed(1)
    
    console.log(`✅ ${filename}`)
    console.log(`   Original: ${originalSize} KB`)
    console.log(`   Thumbnail: ${thumbnailSize} KB (${saved}% smaller)`)
    console.log(`   → ${thumbnailPath}`)
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message)
  }
}

// Main function
const main = async () => {
  console.log('🖼️  Starting image compression...\n')
  
  const imageFiles = getImageFiles(CONFIG.input)
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No images found in', CONFIG.input)
    return
  }
  
  console.log(`Found ${imageFiles.length} images\n`)
  
  for (const file of imageFiles) {
    await processImage(file)
    console.log('')
  }
  
  console.log('🎉 Compression complete!')
  console.log(`\n📁 Thumbnails saved to: ${CONFIG.output}`)
  console.log('\n💡 Tips:')
  console.log('   - Update products.json with thumbnail paths')
  console.log('   - Format: "thumbnail": "assets/thumbnails/imagename-thumb.jpg"')
  console.log('   - Thumbnails are optimized for catalogue display')
}

// Run
main().catch(console.error)

