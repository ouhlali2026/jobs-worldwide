// =============================================
// script.js - إدارة الدول في الصفحة الرئيسية
// =============================================

(function() {
    'use strict';

    // قائمة الدول (أضف أي دولة جديدة هنا مع تاريخ اليوم)
    const featuredCountries = [

{ url: "countries/morocco-jobs-guide-2026.html", title: "🇲🇦 وظائف في المغرب (دليل شامل)", desc: "أفضل مواقع التوظيف، المهن المطلوبة، الرواتب، وظائف بدون شهادة، والوظيفة العمومية.", tag: "جديد", dateAdded: "2026-06-13" },


        { url: "countries/belgium-work-guide-2026.html", title: "🇧🇪 بلجيكا 2026", desc: "تأشيرة Single Permit، رواتب تبدأ 1,800 يورو – دليل شامل للمغاربة والعرب.", tag: "جديد", dateAdded: "2026-06-05" },
        { url: "countries/romania-work-visa-guide-2026.html", title: "🇷🇴 رومانيا 2026", desc: "عقود عمل برواتب 600-1,500 يورو – إجابات على أسئلة العرب.", tag: "جديد", dateAdded: "2026-06-04" },
        { url: "countries/canada.html", title: "🇨🇦 كندا 2026", desc: "نظام Express Entry، رواتب بين 3500-9000 دولار كندي، هجرة منظمة.", tag: "500,000 مهاجر", dateAdded: "2026-05-23" },
        { url: "countries/germany.html", title: "🇩🇪 ألمانيا 2026", desc: "تأشيرة Chancenkarte. وظائف في الطب، الهندسة والتقنية.", tag: "بطاقة الفرصة", dateAdded: "2026-05-20" },
        { url: "countries/europe-jobs-without-degree-2026.html", title: "🇪🇺 أوروبا (بدون شهادة)", desc: "دليل شامل لوظائف في ألمانيا، إيطاليا، فرنسا، هولندا، بولندا بدون مؤهل جامعي.", tag: "وظائف عملية", dateAdded: "2026-05-15" },
        { url: "countries/uae-jobs-without-degree-2026.html", title: "🇦🇪 الإمارات (بدون شهادة)", desc: "وظائف في دبي وأبوظبي لا تتطلب شهادة جامعية، الرواتب وتفاصيل التأشيرات.", tag: "فرص للجميع", dateAdded: "2026-05-10" },
        { url: "countries/france-contracts-guide-2026.html", title: "🇫🇷 فرنسا 2026", desc: "عقود CDI و CDD، عقود موسمية في السياحة والفلاحة للمغاربة والعرب.", tag: "عقود رسمية", dateAdded: "2026-05-05" },
        { url: "countries/saudi-arabia-jobs-egyptians-2026.html", title: "🇸🇦 السعودية (للمصريين)", desc: "دليل خاص للمصريين: عقود عمل، رواتب، منصة طاقات وقوى، وشروط التأشيرة بدون وسيط.", tag: "رواتب تبدأ 4,000 ريال", dateAdded: "2026-05-01" }
    ];

    // ترتيب تنازلي حسب التاريخ (الأحدث أولاً)
    const sorted = [...featuredCountries].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    const container = document.getElementById('countriesContainer');
    if (!container) return;

    // عرض البطاقات
    function renderCards() {
        container.innerHTML = '';
        sorted.forEach(c => {
            const card = document.createElement('a');
            card.href = c.url;
            card.className = 'country-card';
            card.innerHTML = `
                <div class="card-img loading-placeholder" data-url="${c.url}"></div>
                <div class="card-content">
                    <h3>${c.title}</h3>
                    <p>${c.desc}</p>
                    <span class="card-tag">${c.tag}</span>
                </div>
            `;
            container.appendChild(card);
        });
        loadImages();
    }

    // جلب الصور مع تخزين مؤقت
    async function loadImages() {
        const cacheKey = 'imageCacheV1';
        let cache = {};
        try {
            const saved = localStorage.getItem(cacheKey);
            if (saved) cache = JSON.parse(saved);
        } catch(e) {}

        const placeholders = document.querySelectorAll('.card-img.loading-placeholder');
        for (const div of placeholders) {
            const url = div.getAttribute('data-url');
            if (!url) continue;

            if (cache[url] && cache[url].expiry > Date.now()) {
                const imgUrl = cache[url].imgUrl;
                if (imgUrl) {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = "صورة المقال";
                    img.className = "card-img";
                    img.loading = "lazy";
                    div.parentNode.replaceChild(img, div);
                } else {
                    showFallback(div);
                }
                continue;
            }

            try {
                const res = await fetch(url, { cache: 'force-cache' });
                if (!res.ok) throw new Error();
                const html = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                let imgUrl = null;
                const meta = doc.querySelector('meta[property="og:image"]');
                if (meta && meta.content) imgUrl = meta.content;
                if (!imgUrl) {
                    const firstImg = doc.querySelector('img');
                    if (firstImg && firstImg.src) imgUrl = firstImg.src;
                }
                if (imgUrl) {
                    if (!imgUrl.startsWith('http')) imgUrl = new URL(imgUrl, window.location.origin).href;
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = "صورة المقال";
                    img.className = "card-img";
                    img.loading = "lazy";
                    div.parentNode.replaceChild(img, div);
                    cache[url] = { imgUrl: imgUrl, expiry: Date.now() + 604800000 };
                    localStorage.setItem(cacheKey, JSON.stringify(cache));
                } else {
                    showFallback(div);
                    cache[url] = { imgUrl: null, expiry: Date.now() + 604800000 };
                    localStorage.setItem(cacheKey, JSON.stringify(cache));
                }
            } catch(e) {
                showFallback(div);
            }
        }
    }

    function showFallback(div) {
        const fallback = document.createElement('div');
        fallback.className = "card-img";
        fallback.style.background = "#EFF6FF";
        fallback.style.display = "flex";
        fallback.style.alignItems = "center";
        fallback.style.justifyContent = "center";
        fallback.innerHTML = '<i class="fas fa-briefcase" style="font-size: 3rem; color: #2563EB;"></i>';
        div.parentNode.replaceChild(fallback, div);
    }

    renderCards();
})();