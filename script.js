// Enhanced script.js with multi-language support for Yozil.uz

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    updateCounter();
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = text.includes('.') ? parseFloat(text) : parseInt(text.replace(/,/g, ''));
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in effect to the hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
    
    // Add staggered animation to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            link.style.transition = 'all 0.3s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 100 + 500);
    });

    // Initialize language manager
    if (typeof LanguageManager !== 'undefined') {
        window.languageManager = new LanguageManager();
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroElements = document.querySelector('.floating-elements');
    if (heroElements) {
        heroElements.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced mobile menu functionality
function createMobileMenu() {
    const nav = document.querySelector('nav');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    const languageSelector = document.querySelector('.language-selector');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-dark);
        cursor: pointer;
        padding: 0.5rem;
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
    `;
    
    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.style.cssText = `
        position: fixed;
        top: 0;
        left: -100%;
        width: 80%;
        height: 100vh;
        background: white;
        box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        transition: left 0.3s ease;
        z-index: 9999;
        padding: 2rem;
        display: none;
    `;
    
    // Toggle mobile menu
    let isMenuOpen = false;
    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.style.left = '0';
            mobileMenuBtn.innerHTML = '✕';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.style.left = '-100%';
            mobileMenuBtn.innerHTML = '☰';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking on links
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            isMenuOpen = false;
            mobileMenu.style.left = '-100%';
            mobileMenuBtn.innerHTML = '☰';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle responsive layout
    function handleResize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            mobileMenu.style.display = 'block';
            navContainer.style.position = 'relative';
            navContainer.appendChild(mobileMenuBtn);
            
            // Clone navigation elements to mobile menu
            if (!mobileMenu.hasChildNodes()) {
                const mobileNavLinks = navLinks.cloneNode(true);
                const mobileLangSelector = languageSelector.cloneNode(true);
                mobileNavLinks.style.cssText = `
                    flex-direction: column;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                `;
                mobileMenu.appendChild(mobileNavLinks);
                mobileMenu.appendChild(mobileLangSelector);
                document.body.appendChild(mobileMenu);
            }
        } else {
            mobileMenuBtn.style.display = 'none';
            mobileMenu.style.display = 'none';
            if (isMenuOpen) {
                isMenuOpen = false;
                document.body.style.overflow = 'auto';
            }
        }
    }
    
    // Initial check and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
}

// Advanced Language Manager with enhanced features
class EnhancedLanguageManager {
    constructor() {
        this.currentLanguage = 'ru'; // Default to Russian
        this.supportedLanguages = ['ru', 'uz', 'en'];
        this.init();
    }

    init() {
        // Load saved language or detect browser language
        const savedLanguage = this.getSavedLanguage();
        const browserLanguage = this.detectBrowserLanguage();
        const initialLanguage = savedLanguage || browserLanguage || 'ru';
        
        this.setLanguage(initialLanguage);
        this.setupEventListeners();
        this.addLanguageChangeAnimation();
    }

    getSavedLanguage() {
        return localStorage.getItem('yozil-language');
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
        return this.supportedLanguages.includes(langCode) ? langCode : null;
    }

    setupEventListeners() {
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');
        const languageOptions = document.querySelectorAll('.language-option');

        if (!languageBtn || !languageDropdown) return;

        // Toggle dropdown with enhanced animation
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
            this.animateDropdownArrow(languageBtn, languageDropdown.classList.contains('active'));
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (languageDropdown.classList.contains('active')) {
                languageDropdown.classList.remove('active');
                this.animateDropdownArrow(languageBtn, false);
            }
        });

        // Handle language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = option.getAttribute('data-lang');
                if (selectedLang !== this.currentLanguage) {
                    this.setLanguage(selectedLang);
                    this.showLanguageChangeNotification(selectedLang);
                }
                languageDropdown.classList.remove('active');
                this.animateDropdownArrow(languageBtn, false);
            });
        });
    }

    animateDropdownArrow(button, isOpen) {
        const arrow = button.querySelector('.dropdown-arrow');
        if (arrow) {
            arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }

    setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang) || !translations[lang]) return;
        
        this.currentLanguage = lang;
        localStorage.setItem('yozil-language', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update all translatable elements with animation
        this.updateTranslations(lang);
        
        // Update language button
        this.updateLanguageButton(lang);
        
        // Update page title
        document.title = translations[lang].page_title;
        
        // Dispatch custom event for language change
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang, translations: translations[lang] }
        }));
    }

    updateTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // Add fade effect during translation
                element.style.opacity = '0.7';
                element.style.transform = 'translateY(-2px)';
                
                setTimeout(() => {
                    element.innerHTML = translations[lang][key];
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 150);
            }
        });
    }

    updateLanguageButton(lang) {
        const languageBtn = document.getElementById('languageBtn');
        const flagMap = {
            'ru': '🇷🇺',
            'uz': '🇺🇿',
            'en': '🇺🇸'
        };
        
        const langNames = {
            'ru': 'Русский',
            'uz': "O'zbek",
            'en': 'English'
        };
        
        if (languageBtn) {
            languageBtn.innerHTML = `
                <span class="flag-icon">${flagMap[lang]}</span>
                <span>${langNames[lang]}</span>
                <span class="dropdown-arrow">▼</span>
            `;
        }
    }

    addLanguageChangeAnimation() {
        // Add CSS for smooth transitions
        const style = document.createElement('style');
        style.textContent = `
            [data-i18n] {
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .language-change-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                font-weight: 500;
            }
            
            .language-change-notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }

    // showLanguageChangeNotification(lang) {
    //     const langNames = {
    //         'ru': 'Русский',
    //         'uz': "O'zbek",
    //         'en': 'English'
    //     };

    //     const notification = document.createElement('div');
    //     notification.className = 'language-change-notification';
    //     notification.innerHTML = `Language changed to ${langNames[lang]}`;
        
    //     document.body.appendChild(notification);
        
    //     // Trigger animation
    //     setTimeout(() => notification.classList.add('show'), 100);
        
    //     // Remove notification
    //     setTimeout(() => {
    //         notification.classList.remove('show');
    //         setTimeout(() => notification.remove(), 300);
    //     }, 2000);
    // }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getTranslation(key) {
        return translations[this.currentLanguage]?.[key] || key;
    }

    // Method to add new translations dynamically
    addTranslations(lang, newTranslations) {
        if (!translations[lang]) {
            translations[lang] = {};
        }
        Object.assign(translations[lang], newTranslations);
    }
}

// Initialize enhanced mobile menu and language manager
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    createMobileMenu();
    
    // Initialize enhanced language manager
    window.languageManager = new EnhancedLanguageManager();
    
    // Add keyboard navigation for language dropdown
    document.addEventListener('keydown', function(e) {
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown && dropdown.classList.contains('active')) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('active');
                document.getElementById('languageBtn').focus();
            }
        }
    });
});

// Add smooth language transition effects
window.addEventListener('languageChanged', function(e) {
    // Re-animate elements after language change
    const animatedElements = document.querySelectorAll('.feature-card, .step, .stat');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                el.style.transform = 'translateY(0)';
            }, 200);
        }, index * 50);
    });
});

// Export for external use
window.YozilLanguage = {
    manager: null,
    init: function() {
        this.manager = new EnhancedLanguageManager();
        return this.manager;
    },
    setLanguage: function(lang) {
        if (this.manager) {
            this.manager.setLanguage(lang);
        }
    },
    getCurrentLanguage: function() {
        return this.manager ? this.manager.getCurrentLanguage() : 'ru';
    },
    getTranslation: function(key) {
        return this.manager ? this.manager.getTranslation(key) : key;
    }
};