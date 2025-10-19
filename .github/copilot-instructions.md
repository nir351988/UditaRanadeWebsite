# Copilot / AI agent instructions

## Project Overview
This is a complete static website for professional singer Udita Ranade, ready for GitHub Pages deployment. The site features a modern, responsive design with a blog-style landing page, professional about section, and upcoming concerts page.

## Architecture & Key Files

### Main Pages
- `index.html` - Homepage with hero section, latest news/blog layout, featured performances, and contact form
- `about.html` - Professional biography with timeline, philosophy, skills, and achievements
- `concerts.html` - Upcoming concerts with categories, past performances, and booking information

### Styling & Assets
- `assets/css/main.css` - Complete styling with gradients, animations, and component styles
- `assets/css/responsive.css` - Mobile-first responsive design with breakpoints and accessibility features
- `assets/js/main.js` - Core functionality with error handling, form validation, and accessibility
- `assets/js/smooth-scroll.js` - Enhanced smooth scrolling with reduced motion support
- `assets/js/concerts.js` - Concert-specific functionality for event management

### Configuration & Deployment
- `_config.yml` - GitHub Pages configuration with SEO settings
- `sitemap.xml` - SEO sitemap for search engines
- `robots.txt` - Search engine directives
- `README.md` - Complete documentation and setup instructions

## Technical Features Implemented

### Performance & SEO
- Optimized images with lazy loading and error fallbacks
- Meta tags, Open Graph, and Twitter Cards
- Structured data for events and organization
- Compressed CSS and optimized JavaScript
- CDN fonts and icons for fast loading

### Accessibility & UX
- WCAG 2.1 compliant with ARIA labels and semantic HTML
- Keyboard navigation and focus management
- Screen reader support with live regions
- High contrast and reduced motion support
- Touch-friendly targets for mobile devices

### Error Handling & Resilience
- Graceful image fallbacks with placeholder system
- Form validation with user-friendly error messages
- JavaScript error boundary handling
- Progressive enhancement (works without JS)
- Cross-browser compatibility

## Content Management

### To Add Real Content
1. **Images**: Replace placeholder SVGs in `assets/images/` with actual photos
2. **Contact Info**: Update email and phone in all HTML files
3. **Social Media**: Modify social media links in footer sections
4. **Concert Data**: Update `assets/js/concerts.js` with real event information
5. **CV Content**: Extract information from UditaRanadeCV.docx and update about page

### Form Integration
- Contact form needs backend service (Formspree, Netlify Forms, etc.)
- Newsletter signup requires email service provider (Mailchimp, ConvertKit, etc.)
- Update form action URLs and add proper endpoints

### Analytics & Tracking
- Add Google Analytics ID to `_config.yml`
- Configure social media pixels if needed
- Set up conversion tracking for contact forms

## Development Workflow

### Local Development
```powershell
# Serve locally with Live Server or similar
# Or use Jekyll if installed:
bundle install
jekyll serve
```

### GitHub Pages Deployment
1. Create repository named `uditaranade.github.io`
2. Push files to main branch
3. Enable GitHub Pages in repository settings
4. Site will be available at `https://uditaranade.github.io`

### File Structure
```
UditaRanade-Website/
├── index.html, about.html, concerts.html  # Main pages
├── assets/css/                            # Stylesheets
├── assets/js/                             # JavaScript functionality
├── assets/images/                         # Images and placeholders
├── _config.yml                            # GitHub Pages config
└── README.md                              # Documentation
```

## Code Quality & Maintenance

### Error Handling Patterns
- All JavaScript wrapped in try-catch blocks
- Image onerror fallbacks to placeholder system
- Form validation with progressive enhancement
- Graceful degradation for older browsers

### Accessibility Standards
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly content

### Performance Optimizations
- Lazy loading for images
- Debounced scroll events
- Efficient CSS with minimal reflows
- Optimized animations with will-change

## Common Tasks

### Adding New Concert
Update `concerts.js` with new event object in `concerts` array

### Updating Colors/Branding
Modify CSS custom properties in `main.css` for consistent theming

### Adding New Pages
Follow existing HTML structure with proper meta tags and navigation updates

### Form Modifications
Update form validation rules in `main.js` and add new field handling

This is a production-ready website template that can be immediately deployed and customized with real content.
