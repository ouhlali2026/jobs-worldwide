/* ========================================
   وظائف حول العالم - الملف الرئيسي
   ======================================== */

// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ موقع وظائف حول العالم جاهز');
    
    // تفعيل البحث
    initSearch();
    
    // تفعيل القائمة المنسدلة للهواتف
    initMobileMenu();
    
    // إضافة تأثيرات للبطاقات
    initCardEffects();
    
    // تسجيل الزوار
    trackVisitor();
});

/* ========================================
   وظيفة البحث
   ======================================== */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-box button');
    
    if (!searchInput) return;
    
    function performSearch() {
        let query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            showMessage('🔍 الرجاء كتابة اسم الدولة', '#f39c12');
            return;
        }
        
        // قائمة الدول المتاحة
        if (query.includes('أمريكا') || query.includes('امريكا') || 
            query.includes('usa') || query.includes('الولايات') ||
            query.includes('america')) {
            window.location.href = 'countries/usa.html';
        } 
        else if (query.includes('كندا') || query.includes('canada')) {
            showMessage('🍁 كندا ستضاف قريباً - تابعنا', '#f39c12');
        }
        else if (query.includes('ألمانيا') || query.includes('المانيا') || query.includes('germany')) {
            showMessage('🇩🇪 ألمانيا ستضاف قريباً - تابعنا', '#f39c12');
        }
        else if (query.includes('بريطانيا') || query.includes('uk') || query.includes('england')) {
            showMessage('🇬🇧 بريطانيا ستضاف قريباً - تابعنا', '#f39c12');
        }
        else {
            showMessage('🌍 المتوفر حالياً: الولايات المتحدة الأمريكية', '#e74c3c');
        }
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/* ========================================
   عرض رسالة منبثقة
   ======================================== */
function showMessage(text, color) {
    // إزالة أي رسالة قديمة
    const oldMsg = document.querySelector('.float-message');
    if (oldMsg) oldMsg.remove();
    
    const msg = document.createElement('div');
    msg.className = 'float-message';
    msg.innerHTML = text;
    msg.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: ${color};
        color: white;
        padding: 12px 25px;
        border-radius: 50px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: fadeInUp 0.3s ease;
        direction: rtl;
        font-weight: 500;
    `;
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.style.animation = 'fadeOutDown 0.3s ease';
        setTimeout(() => msg.remove(), 300);
    }, 3000);
}

// إضافة أنيميشن للرسائل
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(style);

/* ========================================
   القائمة المنسدلة للهواتف
   ======================================== */
function initMobileMenu() {
    if (window.innerWidth > 768) return;
    
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    
    if (dropdown && dropbtn) {
        const dropdownContent = document.querySelector('.dropdown-content');
        
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'block';
            }
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownContent.style.display = 'none';
            }
        });
    }
}

/* ========================================
   تأثيرات البطاقات
   ======================================== */
function initCardEffects() {
    const cards = document.querySelectorAll('.country-card, .service-card, .tip-home-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

/* ========================================
   تتبع الزوار (محلي)
   ======================================== */
function trackVisitor() {
    const today = new Date().toDateString();
    let visits = localStorage.getItem('siteVisits') || 0;
    let lastVisit = localStorage.getItem('lastVisitDate');
    
    if (lastVisit !== today) {
        visits = parseInt(visits) + 1;
        localStorage.setItem('siteVisits', visits);
        localStorage.setItem('lastVisitDate', today);
        console.log(`📊 عدد زيارات الموقع اليوم: ${visits}`);
    }
}

/* ========================================
   زر العودة للأعلى
   ======================================== */
let backBtn = null;

window.addEventListener('scroll', function() {
    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.innerHTML = '⬆️';
        backBtn.id = 'backToTop';
        backBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 20px;
            background: #f39c12;
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            display: none;
            z-index: 999;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        `;
        backBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(backBtn);
    }
    
    if (window.scrollY > 300) {
        backBtn.style.display = 'block';
    } else {
        backBtn.style.display = 'none';
    }
});

/* ========================================
   تحسين سرعة تحميل الصفحة
   ======================================== */
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

console.log('🚀 تم تحميل جميع الوظائف بنجاح');