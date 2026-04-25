# Glitchless - Frontend Website

A PHP-based frontend for Glitchless - an AI-powered log analysis tool that turns chaotic deployment logs into clear, actionable fixes.

## Features

- **Dark Mode First Design**: Deep Space Blue background with Electric Cyan accents
- **Three-Paneled Flow**: Log Terminal → Insight Stream → Auto-Fix Sidebar
- **Plain English Mode**: Toggle between technical and beginner-friendly explanations
- **Drag & Drop Upload**: Easy log file submission
- **GitHub URL Integration**: Analyze repositories directly
- **Real-time Scanning Animation**: Visual feedback during analysis
- **Diff View**: See exactly what changes need to be made
- **Terminal Preview**: Simulated build success after fixes

## Installation

1. Copy all files to your web server directory (e.g., `htdocs` or `www`)
2. Ensure PHP is installed and running on your server
3. Access the site via `http://localhost/Gitchless/` or your domain

## File Structure

```
Glitchless/
├── config.php          # Configuration and color constants
├── index.php           # Landing page with hero terminal
├── login.php           # GitHub OAuth login page
├── dashboard.php       # Main dashboard with upload
├── analysis.php        # Three-paneled analysis view
├── logout.php          # Session destruction
├── style.css           # Global styles
├── dashboard.css       # Dashboard-specific styles
├── analysis.css        # Analysis page styles
├── script.js           # Global JavaScript
└── dashboard.js        # Dashboard-specific JavaScript
```

## Color Palette

- **Primary**: Deep Space Blue (#0B0E14)
- **Accent**: Electric Cyan (#00F2FF)
- **Secondary**: Soft Slate (#94A3B8)
- **Error**: Vibrant Coral (#FF4C4C)
- **Warning**: Amber Glow (#F59E0B)
- **Success**: Emerald Mint (#10B981)

## User Flow

1. **Landing Page**: Hero section with animated terminal showing log transformation
2. **Login**: GitHub OAuth authentication
3. **Dashboard**: Drag-and-drop log upload or GitHub URL input
4. **Analysis**: Three-paneled view showing filtered logs, insights, and fixes
5. **Resolution**: Apply fixes with diff view and terminal preview

## Technology Stack

- **Backend**: PHP 7.4+
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Fonts**: Inter (headings), JetBrains Mono (code)
- **No Frameworks**: Pure PHP with custom CSS for maximum control

## Development Notes

- Session-based authentication (simulated GitHub OAuth)
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Glassmorphic UI elements
- Modern developer aesthetic

## Future Enhancements

- Real GitHub OAuth integration
- Backend AI log analysis
- CI/CD pipeline integration
- User dashboard with history
- PR automation
- Multi-language support

## License

Proprietary - All rights reserved
