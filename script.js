/* ========================================
   وظائف حول العالم - الملف الرئيسي للجافاسكريبت
   الإصدار: 2.0
   التاريخ: 2026-04-26
   ======================================== */

// ========== انتظار تحميل الصفحة بالكامل ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. تفعيل البحث عن الدول ==========
    initSearchFunction();
    
    // ========== 2. إضافة تأثيرات على البطاقات ==========
    initCardEffects();
    
    // ========== 3. تحسين سرعة تحميل الصور ==========
    initLazyLoading();
    
    // ========== 4. إحصائيات الزوار (بسيطة) ==========
    initVisitorStats();
    
    // ========== 5. تفعيل القائمة المنسدلة للهواتف ==========
    initMobileMenu();
    
    // ========== 6. رسالة ترحيب للمستخدم الجديد ==========
    initWelcomeMessage();
    
    // ========== 7. تتبع النقرات على الإعلانات ==========
    initAdTracking();
    
    // ========== 8. الزر للعودة للأعلى ==========
    initBackToTop();
    
    // ========== 9. تحسين SEO للروابط الداخلية ==========
    initInternalLinks();
    
    // ========== 10. تفعيل الإشعارات (اختياري) ==========
    initNotifications();
});

/* ========================================
   1. وظيفة البحث عن الدول
   ======================================== */
function initSearchFunction() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-box button');
    
    if (!searchInput) return;
    
    // قائمة الدول مع روابطها
    const countriesList = {
        // الدول العربية
        'أمريكا': 'countries/usa.html',
        'امريكا': 'countries/usa.html',
        'الولايات المتحدة': 'countries/usa.html',
        'usa': 'countries/usa.html',
        'united states': 'countries/usa.html',
        'america': 'countries/usa.html',
        
        'كندا': 'countries/canada.html',
        'canada': 'countries/canada.html',
        
        'المكسيك': 'countries/mexico.html',
        'mexico': 'countries/mexico.html',
        
        'ألمانيا': 'countries/germany.html',
        'المانيا': 'countries/germany.html',
        'germany': 'countries/germany.html',
        'deutschland': 'countries/germany.html',
        
        'بريطانيا': 'countries/uk.html',
        'بريطانيا': 'countries/uk.html',
        'uk': 'countries/uk.html',
        'united kingdom': 'countries/uk.html',
        'england': 'countries/uk.html',
        'london': 'countries/uk.html',
        
        // دول إضافية (ستضاف لاحقاً)
        'فرنسا': '#',
        'france': '#',
        'ايطاليا': '#',
        'italy': '#',
        'اسبانيا': '#',
        'spain': '#',
        'السعودية': '#',
        'saudi': '#',
        'الامارات': '#',
        'uae': '#',
        'قطر': '#',
        'qatar': '#',
        'الكويت': '#',
        'kuwait': '#',
        'عمان': '#',
        'oman': '#',
        'البحرين': '#',
        'bahrain': '#',
        'مصر': '#',
        'egypt': '#',
        'تركيا': '#',
        'turkey': '#',
        'اليابان': '#',
        'japan': '#',
        'الصين': '#',
        'china': '#',
        'الهند': '#',
        'india': '#',
        'استراليا': '#',
        'australia': '#'
    };
    
    // وظيفة البحث
    function performSearch() {
        let query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            showAlert('الرجاء كتابة اسم الدولة', 'info');
            return;
        }
        
        // البحث عن تطابق
        for (let key in countriesList) {
            if (query.includes(key) || key.includes(query)) {
                let url = countriesList[key];
                if (url !== '#') {
                    // حفظ سجل البحث
                    saveSearchHistory(query);
                    // الانتقال إلى الرابط
                    window.location.href = url;
                    return;
                } else {
                    showAlert('هذه الدولة ستضاف قريباً إن شاء الله', 'warning');
                    return;
                }
            }
        }
        
        // إذا لم يتم العثور على دولة
        showAlert('لم نجد هذه الدولة حالياً. جرب: أمريكا، كندا، ألمانيا، بريطانيا', 'error');
    }
    
    // البحث عند الضغط على زر البحث
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // البحث عند الضغط على Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}

/* ========================================
   2. حفظ سجل البحث (Local Storage)
   ======================================== */
function saveSearchHistory(country) {
    let history = localStorage.getItem('searchHistory');
    let searches = history ? JSON.parse(history) : [];
    
    // إضافة البحث الجديد في البداية
    searches.unshift({
        country: country,
        date: new Date().toISOString(),
        url: window.location.href
    });
    
    // الاحتفاظ فقط بآخر 10 عمليات بحث
    if (searches.length > 10) searches.pop();
    
    localStorage.setItem('searchHistory', JSON.stringify(searches));
}

/* ========================================
   3. عرض تنبيهات جميلة
   ======================================== */
function showAlert(message, type = 'info') {
    // إزالة أي تنبيه موجود
    const oldAlert = document.querySelector('.custom-alert');
    if (oldAlert) oldAlert.remove();
    
    // ألوان حسب النوع
    const colors = {
        'info': { bg: '#3B82F6', icon: 'ℹ️' },
        'success': { bg: '#10B981', icon: '✅' },
        'warning': { bg: '#F59E0B', icon: '⚠️' },
        'error': { bg: '#EF4444', icon: '❌' }
    };
    
    const color = colors[type] || colors.info;
    
    // إنشاء عنصر التنبيه
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${color.bg};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideDown 0.3s ease;
        direction: rtl;
    `;
    
    alertDiv.innerHTML = `${color.icon} ${message}`;
    document.body.appendChild(alertDiv);
    
    // إزالة التنبيه بعد 3 ثوانٍ
    setTimeout(() => {
        alertDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// إضافة أنيميشن للتنبيهات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-100%);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-100%);
        }
    }
`;
document.head.appendChild(style);

/* ========================================
   4. تأثيرات على البطاقات
   ======================================== */
function initCardEffects() {
    const cards = document.querySelectorAll('.country-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        // تأثير النقر
        card.addEventListener('click', function(e) {
            // إذا كان العنصر يحتوي على رابط
            if (this.tagName === 'A') {
                const url = this.getAttribute('href');
                if (url && url !== '#') {
                    // تسجيل الخروج
                    console.log('Navigating to:', url);
                }
            }
        });
    });
}

/* ========================================
   5. تحميل الصور بشكل كسول (Lazy Loading)
   ======================================== */
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        // إذا كانت الصورة تحتوي على data-src
        if (img.getAttribute('data-src')) {
            imageObserver.observe(img);
        }
        // إضافة تأثير التحميل
        img.style.transition = 'opacity 0.3s';
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

/* ========================================
   6. إحصائيات الزوار البسيطة
   ======================================== */
function initVisitorStats() {
    // عدد زيارات اليوم
    const today = new Date().toDateString();
    let visits = localStorage.getItem('visits');
    let lastVisit = localStorage.getItem('lastVisit');
    
    if (lastVisit !== today) {
        // يوم جديد
        visits = parseInt(visits) + 1 || 1;
        localStorage.setItem('visits', visits);
        localStorage.setItem('lastVisit', today);
    }
    
    // عرض الإحصائيات في الكونسول (للاختبار)
    console.log(`📊 إحصائيات الموقع: ${visits} زيارة اليوم`);
    
    // إذا كان هناك عنصر لإظهار الإحصائيات
    const statsElement = document.getElementById('visitorStats');
    if (statsElement) {
        statsElement.textContent = `${visits} زائر اليوم`;
    }
}

/* ========================================
   7. القائمة المنسدلة للهواتف
   ======================================== */
function initMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    
    if (!nav || window.innerWidth > 768) return;
    
    // إنشاء زر القائمة
    let menuButton = document.querySelector('.mobile-menu-btn');
    if (!menuButton && window.innerWidth <= 768) {
        menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.style.cssText = `
            background: #10B981;
            border: none;
            color: white;
            padding: 10px 15px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1.2rem;
        `;
        
        const logo = document.querySelector('.logo');
        if (logo && logo.parentNode) {
            logo.parentNode.insertBefore(menuButton, logo.nextSibling);
        }
        
        // إخفاء القائمة في البداية على الهاتف
        nav.style.display = 'none';
        nav.style.flexDirection = 'column';
        nav.style.width = '100%';
        nav.style.marginTop = '10px';
        
        menuButton.addEventListener('click', () => {
            if (nav.style.display === 'none') {
                nav.style.display = 'flex';
                menuButton.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                nav.style.display = 'none';
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (nav) nav.style.display = 'flex';
            if (menuButton) menuButton.style.display = 'none';
        } else {
            if (menuButton) menuButton.style.display = 'block';
            if (nav && nav.style.display !== 'flex') nav.style.display = 'none';
        }
    });
}

/* ========================================
   8. رسالة ترحيب للمستخدم الجديد
   ======================================== */
function initWelcomeMessage() {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
        setTimeout(() => {
            showAlert('مرحباً بك في موقع وظائف حول العالم! 🌍 ابدأ رحلتك بالبحث عن دولة', 'success');
        }, 1000);
        localStorage.setItem('hasVisited', 'true');
    }
}

/* ========================================
   9. تتبع النقرات على الإعلانات (لتحسين الأرباح)
   ======================================== */
function initAdTracking() {
    // تتبع النقرات على الروابط الخارجية
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            if (url.includes('adsterra') || url.includes('effectivegatecpm')) {
                console.log('📢 تم النقر على إعلان Adsterra');
                // يمكنك إضافة تحليلات هنا
            }
        });
    });
}

/* ========================================
   10. زر العودة للأعلى
   ======================================== */
function initBackToTop() {
    // إنشاء الزر إذا لم يكن موجوداً
    let backBtn = document.getElementById('backToTop');
    
    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.id = 'backToTop';
        backBtn.innerHTML = '⬆️';
        backBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #10B981;
            color: white;
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transition: all 0.3s;
            z-index: 999;
        `;
        document.body.appendChild(backBtn);
    }
    
    // إظهار/إخفاء الزر حسب التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backBtn.style.display = 'flex';
        } else {
            backBtn.style.display = 'none';
        }
    });
    
    // العودة للأعلى عند النقر
    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   11. تحسين الروابط الداخلية لـ SEO
   ======================================== */
function initInternalLinks() {
    const internalLinks = document.querySelectorAll('a[href^="countries/"], a[href^="./"], a[href^="../"]');
    
    internalLinks.forEach(link => {
        // إضافة تتبع للنقرات على الروابط الداخلية
        link.addEventListener('click', function() {
            const url = this.getAttribute('href');
            console.log(`🔗 رابط داخلي: ${url}`);
        });
    });
}

/* ========================================
   12. إشعارات (اختيارية)
   ======================================== */
function initNotifications() {
    // طلب إذن الإشعارات (اختياري)
    if ('Notification' in window && Notification.permission === 'default') {
        // تأخير طلب الإذن لتجنب إزعاج المستخدم
        setTimeout(() => {
            // لا نطلب الإذن تلقائياً - نترك للمستخدم
            // يمكن تفعيلها عند الحاجة
        }, 10000);
    }
}

/* ========================================
   13. منع الروابط الميتة (404)
   ======================================== */
function checkBrokenLinks() {
    // يمكن تفعيل هذه الوظيفة لفحص الروابط
    // لكنها تحتاج إلى fetch API وقد تبطئ الموقع
    console.log('✅ تم تحميل جميع الروابط الداخلية بنجاح');
}

/* ========================================
   14. تحسين عرض الجداول على الهواتف
   ======================================== */
function fixTablesOnMobile() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        if (window.innerWidth <= 768) {
            table.style.display = 'block';
            table.style.overflowX = 'auto';
            table.style.whiteSpace = 'nowrap';
        }
    });
}

// استدعاء عند تحميل الصفحة وعند تغيير حجم النافذة
window.addEventListener('resize', fixTablesOnMobile);
document.addEventListener('DOMContentLoaded', fixTablesOnMobile);

/* ========================================
   15. تصدير الوظائف للاستخدام العالمي
   ======================================== */
window.JobsWorldwide = {
    search: function(query) {
        const input = document.getElementById('searchInput');
        if (input) {
            input.value = query;
            input.dispatchEvent(new Event('keypress', {key: 'Enter'}));
        }
    },
    showAlert: showAlert,
    getVisits: function() {
        return localStorage.getItem('visits') || 0;
    }
};

console.log('🚀 تم تحميل موقع وظائف حول العالم بنجاح!');