# How to Add Images to Your Website

This guide explains how to add photos to Dr. Vikram Goel's portfolio website.

## Directory Structure

The website has three image folders:

```
images/
├── hero/          # Full-width hero/banner images
├── profile/       # Profile photo
└── gallery/       # Photo gallery images
```

## 1. Adding Hero Images

Hero images appear at the top of sections with full width.

### Main Hero (Homepage)
**Location:** `images/hero/main-hero.jpg`
**Recommended size:** 1920x1080px (or larger)
**File format:** JPG or PNG

Replace in `index.html`:
```html
<img src="images/hero/main-hero.jpg" alt="Antarctic glacier landscape" class="hero-img">
```

### Section Hero Images
- **Projects section:** `images/hero/projects-hero.jpg`
- **Publications section:** `images/hero/publications-hero.jpg`
- **Photos section:** `images/hero/photos-hero.jpg`

**Recommended size:** 1920x800px
**File format:** JPG or PNG

## 2. Adding Profile Photo

**Location:** `images/profile/profile.jpg`
**Recommended size:** 600x600px (square)
**File format:** JPG or PNG
**Note:** Image will be displayed as a circle

Replace in `index.html`:
```html
<img src="images/profile/profile.jpg" alt="Dr. Vikram Goel" class="profile-img">
```

## 3. Adding Gallery Photos

Gallery photos appear in the PHOTOS section as a grid.

### Quick Method: Replace Existing Placeholders

1. **Name your images:**
   - `expedition-1.jpg`
   - `expedition-2.jpg`
   - `expedition-3.jpg`
   - ... and so on

2. **Place them in:** `images/gallery/`

3. **Recommended specs:**
   - Size: 1200x800px (landscape) or 800x1200px (portrait)
   - Format: JPG (recommended for photos) or PNG
   - Quality: High quality, optimized for web (100-300 KB per image)

### Adding New Gallery Images

To add a new image to the gallery, copy this HTML block in `index.html` (Photos section):

```html
<!-- Gallery Item -->
<div class="gallery-item">
    <img src="images/gallery/YOUR-IMAGE-NAME.jpg" alt="Description of image" class="gallery-img" loading="lazy">
    <div class="gallery-caption">Your Caption Here</div>
</div>
```

**Example:**
```html
<div class="gallery-item">
    <img src="images/gallery/antarctica-sunset.jpg" alt="Antarctic sunset" class="gallery-img" loading="lazy">
    <div class="gallery-caption">Sunset at Dronning Maud Land, 2024</div>
</div>
```

### Gallery Image Guidelines

- **Aspect ratio:** 4:3 or 3:2 works best
- **Orientation:** Both landscape and portrait work
- **File size:** Keep under 500 KB for fast loading
- **File naming:** Use descriptive names with hyphens (e.g., `ice-core-drilling-2024.jpg`)

## 4. Methods to Upload Images

### Method 1: Via Git (Recommended)

1. **Add images to the folders:**
   ```bash
   # Copy your images to the appropriate folders
   cp /path/to/your/photo.jpg images/gallery/expedition-1.jpg
   cp /path/to/your/hero.jpg images/hero/main-hero.jpg
   cp /path/to/your/profile.jpg images/profile/profile.jpg
   ```

2. **Commit and push:**
   ```bash
   git add images/
   git commit -m "Add photos to gallery and hero sections"
   git push
   ```

### Method 2: Via GitHub Web Interface

1. Go to your repository on GitHub
2. Navigate to the `images` folder
3. Click on the subfolder (`gallery`, `hero`, or `profile`)
4. Click "Add file" > "Upload files"
5. Drag and drop your images
6. Commit the changes

### Method 3: Using External URLs

If you want to use images hosted elsewhere (e.g., Google Photos, Imgur, Cloudinary):

```html
<img src="https://example.com/path/to/image.jpg" alt="Description" class="gallery-img">
```

**Note:** Make sure you have rights to use the images and the hosting service allows hotlinking.

## 5. Optimizing Images

Before uploading, optimize your images for web:

### Recommended Tools:
- **TinyPNG** (https://tinypng.com/) - Online compression
- **ImageOptim** (Mac) - Desktop app
- **GIMP** or **Photoshop** - Export for web

### Optimization Settings:
- **Format:** JPG for photos, PNG for graphics with transparency
- **Quality:** 80-85% for JPG
- **Resolution:** 72 DPI (web standard)
- **Max width:** 1920px for hero images, 1200px for gallery

## 6. Gallery Features

Your photo gallery includes:

### Lightbox Viewer
- **Click any photo** to open full-screen lightbox
- **Navigate:** Use arrow keys ← → or click prev/next buttons
- **Close:** Press ESC or click the × button
- **Captions:** Show below the image

### Responsive Grid
- **Desktop:** 3 columns
- **Tablet:** 2 columns
- **Mobile:** 1 column

### Image Loading
- **Lazy loading:** Images load as you scroll (improves page speed)
- **Hover effects:** Images zoom slightly on hover
- **Fallback:** Gradient backgrounds show if images don't load

## 7. Best Practices

### Image Naming
✅ **Good:** `ice-shelf-survey-2024.jpg`, `team-photo-antarctica.jpg`
❌ **Bad:** `IMG_1234.jpg`, `photo1.jpg`, `pic.jpg`

### Alt Text
Always provide descriptive alt text for accessibility:
```html
<img src="..." alt="Researchers conducting radar survey on Antarctic ice shelf">
```

### File Organization
- Keep similar images together
- Use consistent naming conventions
- Delete unused images to save repository space

### Image Rights
- Only use images you own or have permission to use
- Credit photographers if required
- Consider adding image credits in captions

## 8. Troubleshooting

### Image not showing?
1. **Check file path:** Verify the path in HTML matches the actual file location
2. **Check file extension:** Is it `.jpg` or `.jpeg`? `.png` or `.PNG`?
3. **Check file name:** File names are case-sensitive on most servers
4. **Clear cache:** Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)

### Image too large/slow loading?
1. Compress the image using TinyPNG or similar
2. Reduce dimensions (1200px width is usually enough)
3. Convert PNG to JPG if it doesn't need transparency

### Wrong aspect ratio?
The gallery automatically crops images to fit. For best results:
- Use landscape images (4:3 or 3:2 ratio)
- Center important content in the image
- Avoid text at the edges

## 9. Example: Complete Workflow

Let's add a new expedition photo:

1. **Prepare the image:**
   - Rename: `nivl-ice-shelf-camp.jpg`
   - Resize: 1200x800px
   - Optimize: Compress to ~200 KB

2. **Upload to repository:**
   ```bash
   cp nivl-ice-shelf-camp.jpg images/gallery/
   ```

3. **Add to HTML** (in the Photos section):
   ```html
   <div class="gallery-item">
       <img src="images/gallery/nivl-ice-shelf-camp.jpg"
            alt="Field camp on Nivl Ice Shelf"
            class="gallery-img"
            loading="lazy">
       <div class="gallery-caption">SENS Expedition field camp, Nivl Ice Shelf 2024</div>
   </div>
   ```

4. **Commit and push:**
   ```bash
   git add images/gallery/nivl-ice-shelf-camp.jpg index.html
   git commit -m "Add Nivl Ice Shelf camp photo to gallery"
   git push
   ```

5. **Done!** The photo will appear in your gallery with lightbox functionality.

## 10. Gallery Layout Customization

To change the number of columns in the gallery, edit `styles.css`:

```css
.photo-gallery {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    /* Change 280px to adjust column width */
    /* More width = fewer columns */
}
```

## Need Help?

If you encounter issues:
1. Check the browser console for errors (F12 > Console tab)
2. Verify file paths are correct
3. Ensure images are in the correct folders
4. Make sure you've committed and pushed changes

---

**Happy photo uploading! Your Antarctic research deserves to be showcased beautifully! 🧊📸**
