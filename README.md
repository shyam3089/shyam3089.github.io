# SMCTechLabs Website

A modern, mobile-responsive website for SMCTechLabs - an innovative app development company.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Mobile Navigation**: Touch-friendly hamburger menu for mobile devices
- **Font Icons**: Beautiful Font Awesome icons throughout the site
- **Smooth Scrolling**: Seamless navigation between sections
- **Contact Form**: Interactive contact form with validation
- **SEO Friendly**: Semantic HTML and proper meta tags

## 📁 Project Structure

```
SMCTECHLABS_SITE/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main styles
│   └── responsive.css     # Responsive/mobile styles
├── js/
│   └── main.js            # JavaScript functionality
├── assets/
│   └── images/            # App screenshots and icons
│       ├── litelist-icon.png
│       ├── app-screen-lists.png
│       ├── app-screen-grocery.png
│       └── app-features.png
└── README.md
```

## 🎨 Sections

1. **Home/Hero**: Engaging introduction with call-to-action buttons
2. **About**: Company information and statistics
3. **Services**: App development services offered
4. **Products**: Showcase of LiteList app with features and screenshots
5. **Contact**: Contact form and company information
6. **Footer**: Quick links and legal information

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, Grid, and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome 6**: Icon library
- **Google Fonts**: Inter font family

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📱 Mobile Features

- Responsive navigation with hamburger menu
- Touch-optimized buttons and links
- Optimized images for faster loading
- Smooth scrolling on mobile devices
- Landscape mode support

## 🚀 Getting Started

1. **Clone or download the repository**
2. **Open `index.html` in your web browser**
3. That's it! No build process required.

### For Development

If you want to serve the site locally with a development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Then open http://localhost:8000 in your browser
```

## 🎨 Customization

### Colors

The website uses CSS custom properties for easy theming. Edit these in `css/style.css`:

```css
:root {
    --primary-color: #F4D03F;      /* Yellow brand color */
    --primary-dark: #D4AF37;       /* Darker yellow */
    --secondary-color: #2C3E50;    /* Dark blue-gray */
    --accent-color: #3498DB;       /* Blue accent */
    /* ... more colors */
}
```

### Content

All content can be edited directly in `index.html`. Update:
- Company name and description
- Service offerings
- Product information
- Contact details

### Images

Replace the placeholder images in `assets/images/` with your actual:
- App icon (litelist-icon.png)
- App screenshots (app-screen-*.png)
- Feature graphics (app-features.png)

**Note**: The current images are SVG placeholders. Replace them with your actual PNG/JPG images keeping the same filenames.

## 📧 Contact Form

The contact form currently shows a success notification without actually sending emails. To make it functional:

1. Set up a backend API endpoint
2. Update the form submission handler in `js/main.js`
3. Or use a service like Formspree, EmailJS, or Netlify Forms

Example with Formspree:
```javascript
// In js/main.js, update the form submission
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json'
    }
})
```

## 🔧 Performance Tips

- Images are lazy-loaded by default
- CSS and JS are minified for production
- Use optimized images (WebP format recommended)
- Enable gzip compression on your server
- Use CDN for Font Awesome and Google Fonts

## 📄 License

© 2025 SMCTechLabs. All rights reserved.

## 🤝 Support

For issues or questions:
- Email: info@SMCTechLabs.com
- Phone: +1 (555) 123-4567

---

**Built with ❤️ by SMCTechLabs**
