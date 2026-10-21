// =============================================
// script.js - إدارة الدول (نسخة مبسطة مثل countries.html)
// الإصدار: 4.3 - تاريخ: 21 أكتوبر 2026
// إضافة: مقالات الأردن الثلاثة
// =============================================

(function() {
    'use strict';

    const featuredCountries = [
        // ===== الأردن (جديد - أكتوبر 2026) =====
        { url: "countries/jordan-civil-service-guide-2026.html", title: "🇯🇴 الأردن: ديوان الخدمة المدنية", desc: "دليل الترتيب التنافسي والإعلان المفتوح والبدائل الخارجية.", tag: "جديد 🔥" },
        { url: "countries/jordan-work-abroad-2026.html", title: "🇯🇴 الأردن: الهجرة والعمل بالخارج", desc: "فرص قطر وألمانيا وكندا – رواتب بالدولار واليورو.", tag: "جديد 🔥" },
        { url: "countries/jordan-third-category-jobs-2026.html", title: "🇯🇴 الأردن: وظائف الفئة الثالثة", desc: "دليل التقديم عبر طسويق لحملة التوجيهي – الرواتب والشروط.", tag: "جديد 🔥" },

        // ===== أمريكا (أكتوبر 2026) =====
        { url: "countries/usa-work-visa-h1b-2026.html", title: "🇺🇸 فيزا H-1B للمهنيين", desc: "نظام الأجور الجديد، رسوم USCIS، ومسار الغرين كارد.", tag: "جديد" },
        { url: "countries/usa-visa-algerians-iraqis-saudis-2026.html", title: "🇺🇸 أمريكا للجزائريين والعراقيين والسعوديين", desc: "مواعيد السفارات، تأشيرات SIV، وكرت العائلة.", tag: "جديد" },
        { url: "countries/usa-visa-moroccans-2026.html", title: "🇺🇸 فيزا أمريكا للمغاربة", desc: "الأوراق، رسوم 185$، نسبة القبول، وقرعة DV.", tag: "جديد" },

        // ===== النرويج (أكتوبر 2026) =====
        { url: "countries/norway-job-seeker-visa-2026.html", title: "🇳🇴 فيزا البحث عن عمل", desc: "6 أشهر للبحث عن عمل داخل النرويج للخريجين.", tag: "جديد" },
        { url: "countries/norway-jobs-guide-2026.html", title: "🇳🇴 النرويج", desc: "رواتب النفط والسلمون وتأشيرة UDI – دليل حصري.", tag: "جديد" },

        // ===== فنلندا ومالطا (أكتوبر 2026) =====
        { url: "countries/finland-jobs-guide-2026.html", title: "🇫🇮 فنلندا", desc: "عقود موسمية، قطف التوت، وكنز لابلاند الشتوي.", tag: "جديد" },
        { url: "countries/malta-jobs-guide-2026.html", title: "🇲🇹 مالطا", desc: "أوروبا بدون حاجز اللغة – تأشيرة Single Permit.", tag: "جديد" }
    ];

    const container = document.getElementById('countriesContainer');
    if (!container) return;

    function createCard(c) {
        const card = document.createElement('a');
        card.href = c.url;
        card.className = 'country-card';
        card.innerHTML = `
            <div class="card-img loading-placeholder" data-url="${c.url}">⏳ جاري تحميل الصورة...</div>
            <div class="card-content">
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
                <span class="card-tag">${c.tag}</span>
            </div>
        `;
        return card;
    }

    async function loadImageForCard(card) {
        const imgDiv = card.querySelector('.card-img.loading-placeholder');
        if (!imgDiv) return;
        const url = imgDiv.getAttribute('data-url');
        if (!url) return;

        // تحديث مفتاح الكاش لإجبار المتصفح على تحميل الصور الجديدة
        const cacheKey = 'imageCacheHomeV4';
        let cache = {};
        try {
            const saved = localStorage.getItem(cacheKey);
            if (saved) cache = JSON.parse(saved);
        } catch(e) {}

        if (cache[url] && cache[url].expiry > Date.now()) {
            if (cache[url].imgUrl) {
                replaceWithImage(imgDiv, cache[url].imgUrl);
            } else {
                replaceWithFallback(imgDiv);
            }
            return;
        }

        try {
            const response = await fetch(url, { cache: 'force-cache' });
            if (!response.ok) throw new Error();
            const html = await response.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');

            let imgUrl = null;
            const meta = doc.querySelector('meta[property="og:image"]');
            if (meta && meta.content) imgUrl = meta.content;
            if (!imgUrl) {
                const firstImg = doc.querySelector('img');
                if (firstImg && firstImg.src) imgUrl = firstImg.src;
            }

            if (imgUrl) {
                if (!imgUrl.startsWith('http')) imgUrl = new URL(imgUrl, window.location.origin).href;
                replaceWithImage(imgDiv, imgUrl);
                cache[url] = { imgUrl: imgUrl, expiry: Date.now() + 86400000 };
            } else {
                replaceWithFallback(imgDiv);
                cache[url] = { imgUrl: null, expiry: Date.now() + 86400000 };
            }
            localStorage.setItem(cacheKey, JSON.stringify(cache));
        } catch(e) {
            replaceWithFallback(imgDiv);
        }
    }

    function replaceWithImage(div, imgUrl) {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = "صورة المقال";
        img.className = "card-img";
        img.loading = "lazy";
        div.parentNode.replaceChild(img, div);
    }

    function replaceWithFallback(div) {
        const fallback = document.createElement('div');
        fallback.className = "card-img";
        fallback.style.background = "#EFF6FF";
        fallback.style.display = "flex";
        fallback.style.alignItems = "center";
        fallback.style.justifyContent = "center";
        fallback.innerHTML = '<i class="fas fa-briefcase" style="font-size: 3rem; color: #2563EB;"></i>';
        div.parentNode.replaceChild(fallback, div);
    }

    container.innerHTML = '';
    // عرض أول 7 بطاقات فقط
    const cards = featuredCountries.slice(0, 7).map(c => {
        const card = createCard(c);
        container.appendChild(card);
        return card;
    });

    setTimeout(() => cards.forEach(card => loadImageForCard(card)), 100);

})();