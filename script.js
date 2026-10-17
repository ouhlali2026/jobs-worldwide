// =============================================
// script.js - إدارة الدول (نسخة مبسطة مثل countries.html)
// الإصدار: 4.2 - تاريخ: 16 أكتوبر 2026
// إضافة: المقالات الأمريكية الثلاثة
// =============================================

(function() {
    'use strict';

    const featuredCountries = [
        // ===== أمريكا (جديد - أكتوبر 2026) =====
        { url: "countries/usa-work-visa-h1b-2026.html", title: "🇺🇸 فيزا H-1B للمهنيين", desc: "نظام الأجور الجديد، رسوم USCIS، ومسار الغرين كارد – حصري.", tag: "جديد 🔥" },
        { url: "countries/usa-visa-algerians-iraqis-saudis-2026.html", title: "🇺🇸 أمريكا للجزائريين والعراقيين والسعوديين", desc: "مواعيد السفارات، تأشيرات SIV، وكرت العائلة – دليل حصري.", tag: "جديد 🔥" },
        { url: "countries/usa-visa-moroccans-2026.html", title: "🇺🇸 فيزا أمريكا للمغاربة", desc: "الأوراق، رسوم 185$، نسبة القبول، وقرعة DV – دليل شامل.", tag: "جديد 🔥" },

        // ===== النرويج (أكتوبر 2026) =====
        { url: "countries/norway-job-seeker-visa-2026.html", title: "🇳🇴 فيزا البحث عن عمل", desc: "6 أشهر للبحث عن عمل داخل النرويج للخريجين – دليل خطوة بخطوة.", tag: "جديد" },
        { url: "countries/norway-jobs-guide-2026.html", title: "🇳🇴 النرويج", desc: "رواتب النفط والسلمون وتأشيرة UDI – دليل حصري للعرب.", tag: "جديد" },

        // ===== فنلندا ومالطا (أكتوبر 2026) =====
        { url: "countries/finland-jobs-guide-2026.html", title: "🇫🇮 فنلندا", desc: "عقود موسمية، قطف التوت، وكنز لابلاند الشتوي – رواتب تبدأ من 1,800 يورو.", tag: "جديد" },
        { url: "countries/malta-jobs-guide-2026.html", title: "🇲🇹 مالطا", desc: "أوروبا بدون حاجز اللغة – تأشيرة Single Permit ورواتب تبدأ 1,200 يورو.", tag: "جديد" },

        // ===== آسيا وأوروبا الشرقية =====
        { url: "countries/singapore-jobs-guide-2026.html", title: "🇸🇬 سنغافورة", desc: "فيزا عمل، رواتب تنافسية، وفرص للمهنيين العرب في قلب آسيا.", tag: "جديد" },
        { url: "countries/poland-jobs-guide-2026.html", title: "🇵🇱 بولندا", desc: "عقود عمل، رواتب تنافسية، وفرص للعرب والمغاربة في أوروبا الشرقية.", tag: "جديد" },

        // ===== أستراليا وأفريقيا =====
        { url: "countries/australia.html", title: "🇦🇺 أستراليا", desc: "دليل شامل لتأشيرة العمل، المهن المطلوبة، الرواتب، وشروط التقديم.", tag: "جديد" },
        { url: "countries/morocco-jobs-guide-2026.html", title: "🇲🇦 المغرب", desc: "أفضل مواقع التوظيف، المهن المطلوبة، الرواتب، وظائف بدون شهادة.", tag: "جديد" },
        { url: "countries/sweden-job-seeker-visa-2026.html", title: "🇸🇪 السويد", desc: "تأشيرة بحث عن عمل لمدة 9 أشهر بدون عقد مسبق، المهن المطلوبة.", tag: "جديد" }
    ];

    const container = document.getElementById('countriesContainer');
    if (!container) return;

    // ===== إنشاء البطاقة =====
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

    // ===== جلب صورة البطاقة =====
    async function loadImageForCard(card) {
        const imgDiv = card.querySelector('.card-img.loading-placeholder');
        if (!imgDiv) return;
        const url = imgDiv.getAttribute('data-url');
        if (!url) return;

        const cacheKey = 'imageCacheHomeV3';
        let cache = {};
        try {
            const saved = localStorage.getItem(cacheKey);
            if (saved) cache = JSON.parse(saved);
        } catch(e) {}

        // من الكاش
        if (cache[url] && cache[url].expiry > Date.now()) {
            if (cache[url].imgUrl) {
                replaceWithImage(imgDiv, cache[url].imgUrl);
            } else {
                replaceWithFallback(imgDiv);
            }
            return;
        }

        // جلب جديد
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

    // ===== عرض البطاقات =====
    container.innerHTML = '';
    const cards = featuredCountries.slice(0, 7).map(c => {
        const card = createCard(c);
        container.appendChild(card);
        return card;
    });

    // تحميل الصور بشكل متوازي
    setTimeout(() => cards.forEach(card => loadImageForCard(card)), 100);

})();