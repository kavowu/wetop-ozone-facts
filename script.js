// 平滑滾動功能
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 導航欄背景透明度控制
function updateNavBackground() {
    const nav = document.querySelector('nav');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        nav.classList.add('bg-black/90');
        nav.classList.remove('bg-black/80');
    } else {
        nav.classList.add('bg-black/80');
        nav.classList.remove('bg-black/90');
    }
}

// 滾動動畫觀察器
function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // 觀察所有區塊
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 卡片懸停效果
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.hover\\:scale-105');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 表格行懸停效果
function initTableHoverEffects() {
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
    });
}

// 按鈕點擊效果
function initButtonEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 創建漣漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    createScrollObserver();
    initCardHoverEffects();
    initTableHoverEffects();
    initButtonEffects();
    
    // 監聽滾動事件
    window.addEventListener('scroll', updateNavBackground);
    
    // 初始化導航背景
    updateNavBackground();
});

// 響應式導航選單（手機版）
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// 平滑滾動到頂部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 檢測用戶偏好的動畫設定
function respectMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // 如果用戶偏好減少動畫，移除所有動畫類別
        document.documentElement.style.setProperty('--animation-duration', '0s');
    }
}

// 初始化動畫偏好檢測
respectMotionPreferences();

// 監聽偏好變化
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', respectMotionPreferences);

