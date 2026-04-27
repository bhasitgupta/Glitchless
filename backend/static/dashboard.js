// Dashboard-specific JavaScript

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tab}-tab`).classList.add('active');
    });
});

// Suggestion chips click handler
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const urlInput = document.getElementById('urlInput');
        const platform = chip.textContent;
        
        // Pre-fill based on platform
        const templates = {
            'Vercel': 'https://vercel.com/username/project',
            'Netlify': 'https://app.netlify.com/sites/your-site',
            'Jenkins': 'https://jenkins.example.com/job/your-job',
            'GitHub Actions': 'https://github.com/username/repository/actions'
        };
        
        if (templates[platform]) {
            urlInput.value = templates[platform];
            urlInput.focus();
        }
    });
});

// Recent card click handlers
document.querySelectorAll('.recent-card').forEach(card => {
    card.addEventListener('click', () => {
        // In a real app, this would navigate to the specific analysis
        window.location.href = 'analysis.php';
    });
});

document.querySelectorAll('.btn-text').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = 'analysis.php';
    });
});
