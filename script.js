// Glitchless Frontend JavaScript

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(11, 14, 20, 0.95)';
    } else {
        navbar.style.background = 'rgba(11, 14, 20, 0.9)';
    }
});

// Drag and drop functionality for dashboard
function setupDragAndDrop() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    
    if (!dropZone) return;

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        if (file.name.endsWith('.log') || file.name.endsWith('.txt')) {
            uploadFile(file);
        } else {
            alert('Please upload a .log or .txt file');
        }
    }
}

function uploadFile(file) {
    const formData = new FormData();
    formData.append('logFile', file);
    
    // Show scanning animation
    showScanning();
    
    // Simulate upload and analysis
    setTimeout(() => {
        window.location.href = 'analysis.php';
    }, 2000);
}

// URL input handling
function setupURLInput() {
    const urlInput = document.getElementById('urlInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    if (!urlInput || !analyzeBtn) return;
    
    analyzeBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url) {
            showScanning();
            setTimeout(() => {
                window.location.href = 'analysis.php';
            }, 2000);
        }
    });
    
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            analyzeBtn.click();
        }
    });
}

function showScanning() {
    const overlay = document.getElementById('scanningOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        animateScanning();
    }
}

function animateScanning() {
    const progressBar = document.getElementById('scanProgress');
    const statusText = document.getElementById('scanStatus');
    const statuses = [
        'Connecting to repository...',
        'Scanning log files...',
        'Analyzing error patterns...',
        'Identifying root cause...',
        'Generating insights...'
    ];
    
    let progress = 0;
    let statusIndex = 0;
    
    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + '%';
        
        if (progress % 20 === 0 && statusIndex < statuses.length) {
            statusText.textContent = statuses[statusIndex];
            statusIndex++;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            statusText.textContent = 'Analysis complete!';
        }
    }, 40);
}

// Toggle plain English mode
function togglePlainEnglish() {
    const toggle = document.getElementById('plainEnglishToggle');
    const technicalElements = document.querySelectorAll('.technical-content');
    const plainElements = document.querySelectorAll('.plain-english-content');
    
    if (toggle.checked) {
        technicalElements.forEach(el => el.style.display = 'none');
        plainElements.forEach(el => el.style.display = 'block');
    } else {
        technicalElements.forEach(el => el.style.display = 'block');
        plainElements.forEach(el => el.style.display = 'none');
    }
}

// Checklist functionality
function setupChecklist() {
    const checkboxes = document.querySelectorAll('.fix-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const item = this.closest('.fix-item');
            if (this.checked) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
            updateProgress();
        });
    });
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('.fix-checkbox');
    const checked = document.querySelectorAll('.fix-checkbox:checked');
    const progress = (checked.length / checkboxes.length) * 100;
    
    const progressBar = document.getElementById('fixProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Copy fix functionality
function copyFix() {
    const fixCode = document.getElementById('fixCode');
    if (fixCode) {
        navigator.clipboard.writeText(fixCode.textContent).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = 'Copy Fix';
            }, 2000);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop();
    setupURLInput();
    setupChecklist();
    
    // Plain English toggle
    const toggle = document.getElementById('plainEnglishToggle');
    if (toggle) {
        toggle.addEventListener('change', togglePlainEnglish);
    }
    
    // Copy button
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyFix);
    }
});
