# Udita Ranade - Bharatiya Shastriya Sangeet

Welcome to the official website of **Udita Ranade**, showcasing the divine art of **Bharatiya Shastriya Sangeet** (Indian Classical Music).

## 🎵 About This Website

This is a complete Jekyll-powered website celebrating the rich tradition of Indian Classical Music with a modern, premium design aesthetic. The site features:

### ✨ Cultural Authenticity
- **Saffron & Gold Theme**: Colors inspired by sacred traditions
- **Devanagari Typography**: Beautiful Sanskrit and Hindi text support
- **Raga-inspired Design**: Visual elements reflecting musical traditions
- **Classical Animations**: Smooth, musical-inspired transitions

### 🎨 Premium Design System
- **SCSS Architecture**: Comprehensive styling system with 200+ variables
- **Responsive Design**: Mobile-first approach with perfect accessibility
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Ready**: Complete meta tags and structured data

### 🏛️ Jekyll Features
- **Collections**: Organized content for ragas, concerts, and performances
- **GitHub Pages Ready**: Deploy directly to `username.github.io`
- **Blog Capability**: News and updates system
- **Contact Forms**: Professional inquiry management

## 🚀 Quick Deployment to GitHub Pages

### Method 1: Direct GitHub Pages
1. **Create Repository**: Name it `uditaranade.github.io` (replace with actual username)
2. **Upload Files**: Push all files to the `main` branch
3. **Enable Pages**: Go to repository Settings → Pages → Source: Deploy from branch
4. **Live Site**: Available at `https://uditaranade.github.io`

### Method 2: Custom Domain
1. **Repository Name**: Any name (e.g., `udita-website`)
2. **Custom Domain**: Add `CNAME` file with your domain
3. **DNS Settings**: Point your domain to GitHub Pages
4. **SSL**: Automatic HTTPS encryption

## 🎭 Design Highlights

### Color Palette
- **Primary Saffron** (`#FF8C00`): Sacred and divine
- **Primary Gold** (`#FFD700`): Prosperity and wisdom  
- **Accent Burgundy** (`#8B0000`): Deep tradition
- **Sacred Orange** (`#FF6347`): Spiritual energy

### Typography
- **Classical Headings**: Cinzel - elegant serif for titles
- **Modern Text**: Inter - clean and readable
- **Devanagari Script**: Noto Sans Devanagari for Hindi/Sanskrit

### Unique Features
- **Raga Showcase**: Beautiful cards displaying ragas with mood and notation
- **Performance Timeline**: Elegant display of concerts and achievements
- **Musical Animations**: CSS animations inspired by taals and ragas
- **Cultural Ornaments**: Sanskrit elements and traditional motifs

## 📁 File Structure

```
UditaRanade-Website/
├── _config.yml              # Jekyll configuration
├── _layouts/                 # Page templates
│   ├── default.html         # Master layout
│   ├── home.html           # Homepage layout
│   └── page.html           # Standard page layout
├── _includes/               # Reusable components
│   ├── navigation.html     # Main navigation
│   ├── footer.html         # Site footer
│   └── head.html           # HTML head section
├── _sass/                   # SCSS styling system
│   ├── base/               # Foundation styles
│   ├── layout/             # Layout components
│   ├── components/         # UI components
│   └── utilities/          # Helper classes
├── assets/
│   ├── css/main.scss       # Main stylesheet
│   ├── js/                 # JavaScript files
│   └── images/             # Site images
├── _data/                  # Site data files
├── pages/                  # Static pages
└── index.md               # Homepage content
```

## � Content Management

### Adding New Content

#### Concerts/Performances
Add to `_data/concerts.yml`:
```yaml
- title: "Raga Yaman - Evening Concert"
  date: "2024-02-15"
  venue: "Music Academy"
  location: "Chennai"
  type: "Solo Performance"
  description: "An enchanting evening of Raga Yaman..."
```

#### Ragas
Add to `_data/ragas.yml`:
```yaml
- name: "Yaman"
  devanagari: "यमन"
  thaat: "Kalyan"
  time: "Evening"
  mood: "Peaceful, devotional"
  notes: "Sa Re Ga Ma# Pa Dha Ni Sa"
```

### Customization

#### Colors
Modify `_sass/base/_variables.scss`:
```scss
$primary-saffron: #FF8C00;
$primary-gold: #FFD700;
$accent-burgundy: #8B0000;
```

#### Typography
Update font preferences in `_sass/base/_typography.scss`:
```scss
$font-classical: 'Cinzel', serif;
$font-modern: 'Inter', sans-serif;
$font-devanagari: 'Noto Sans Devanagari', sans-serif;
```

## 🛠️ Development

### Local Development
If you have Ruby/Jekyll installed:
```bash
bundle install
bundle exec jekyll serve
```

### Without Jekyll
Simply edit files and push to GitHub - Pages will build automatically.

### Adding JavaScript
Add files to `assets/js/` and include in layouts:
```html
<script src="{{ '/assets/js/your-script.js' | relative_url }}"></script>
```

## 🎨 Advanced Features

### Musical Animations
The site includes custom CSS animations inspired by Indian classical music:
- **Raga Flow**: Smooth, wave-like movements
- **Taal Pulse**: Rhythmic, heartbeat-like effects
- **Swar Transitions**: Note-inspired color changes

### Accessibility
- WCAG 2.1 AA compliant
- Screen reader friendly
- Keyboard navigation
- High contrast support
- Reduced motion preferences

### Performance
- Optimized SCSS compilation
- Lazy image loading
- Minimal JavaScript
- CDN-ready assets

## 📧 Contact & Support

This is a premium Jekyll theme designed specifically for Indian Classical Music artists. The design system celebrates the divine art of Bharatiya Shastriya Sangeet while providing modern web functionality.

### Key Benefits
✅ **Instant Deployment**: No local setup required  
✅ **Cultural Authenticity**: Traditional Indian design elements  
✅ **Professional Quality**: Premium typography and layouts  
✅ **Mobile Perfect**: Responsive on all devices  
✅ **SEO Optimized**: Search engine ready  
✅ **Accessibility**: Inclusive design for all users  

---

## 🙏 Dedication

*This website is dedicated to the divine tradition of Bharatiya Shastriya Sangeet and all the great masters who have preserved this sacred art form through generations.*

**श्री गणेशाय नमः | ॐ नमो भगवते वासुदेवाय**