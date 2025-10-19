# Udita Ranade - Professional Singer Website

A beautiful, responsive website for professional singer Udita Ranade, showcasing her musical journey, performances, and upcoming concerts.

## 🎵 Features

- **Modern Design**: Clean, professional layout with musical aesthetics
- **Responsive**: Fully responsive design that works on all devices
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized for fast loading and smooth user experience
- **SEO Optimized**: Meta tags, structured data, and search engine friendly
- **GitHub Pages Ready**: Configured for easy deployment on GitHub Pages

## 📁 Project Structure

```
UditaRanade-Website/
├── index.html                 # Homepage with blog-style layout
├── about.html                 # About page with professional background
├── concerts.html              # Upcoming concerts and events
├── _config.yml               # GitHub Pages configuration
├── assets/
│   ├── css/
│   │   ├── main.css          # Main stylesheet
│   │   └── responsive.css    # Responsive design rules
│   ├── js/
│   │   ├── main.js           # Main JavaScript functionality
│   │   ├── smooth-scroll.js  # Smooth scrolling implementation
│   │   └── concerts.js       # Concert-specific functionality
│   └── images/               # Image assets and placeholders
├── .github/
│   └── copilot-instructions.md # AI coding assistant instructions
└── README.md                 # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/uditaranade/uditaranade.github.io.git
   cd uditaranade.github.io
   ```

2. **Serve locally** (if you have Jekyll installed)
   ```bash
   bundle install
   jekyll serve
   ```
   
   Or simply open `index.html` in your browser for basic preview.

3. **View the website**
   Open `http://localhost:4000` in your browser

### GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial website setup"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save settings

3. **Access your website**
   Your site will be available at `https://uditaranade.github.io`

## 🎨 Customization

### Content Updates

- **Personal Information**: Update contact details in all HTML files
- **Social Media**: Modify social media links in footer sections
- **Images**: Replace placeholder images in `assets/images/` directory
- **Concert Information**: Add real concert data in `assets/js/concerts.js`

### Styling

- **Colors**: Modify the CSS variables in `assets/css/main.css`
- **Fonts**: Update font imports in the HTML head sections
- **Layout**: Adjust grid layouts and spacing in the CSS files

### Functionality

- **Contact Form**: Integrate with a form service (Formspree, Netlify Forms, etc.)
- **Newsletter**: Connect to an email service provider
- **Analytics**: Add Google Analytics ID in `_config.yml`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and landmarks
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

## 🔧 Technical Features

- **Performance**: Optimized images, minified CSS, efficient JavaScript
- **SEO**: Meta tags, Open Graph, Twitter Cards, structured data
- **Security**: CSP headers, secure links, input validation
- **Progressive Enhancement**: Works without JavaScript
- **Error Handling**: Graceful fallbacks for missing content

## 📞 Contact & Support

For technical questions about this website template:
- Create an issue in this repository
- Contact: [contact@uditaranade.com](mailto:contact@uditaranade.com)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Designed with love for music and the arts

---

**Note**: This website template is ready to use but remember to:
1. Replace all placeholder content with actual information
2. Add real images to the `assets/images/` directory
3. Update contact information and social media links
4. Configure form handling for contact and newsletter forms
5. Add Google Analytics tracking if desired