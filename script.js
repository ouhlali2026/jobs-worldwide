// =============================================
// script.js - إدارة الدول في الصفحة الرئيسية
// الإصدار: 2.3 - تاريخ: 20 أغسطس 2026
// =============================================

(function() {
    'use strict';

    // قائمة الدول مع روابط الصور المباشرة (إن وجدت)
    const featuredCountries = [
        { 
            url: "countries/australia.html", 
            title: "🇦🇺 أستراليا (فيزا عقد عمل)", 
            desc: "دليل شامل لتأشيرة العمل، المهن المطلوبة، الرواتب، وشروط التقديم للعرب.", 
            tag: "جديد 🔥", 
            dateAdded: "2026-08-20",
            img: "https://i.ibb.co/your-image-australia.jpg" // ⬅️ ضع الرابط الحقيقي هنا
        },
        { 
            url: "countries/morocco-jobs-guide-2026.html", 
            title: "🇲🇦 المغرب (دليل وظائف)", 
            desc: "أفضل مواقع التوظيف، المهن المطلوبة، الرواتب، وظائف بدون شهادة، والوظيفة العمومية.", 
            tag: "جديد 🔥", 
            dateAdded: "2026-06-13",
            img: "https://i.ibb.co/your-image-morocco.jpg"
        },
        { 
            url: "countries/sweden-job-seeker-visa-2026.html", 
            title: "🇸🇪 السويد (فيزا البحث عن عمل)", 
            desc: "تأشيرة بحث عن عمل لمدة 9 أشهر بدون عقد مسبق، المهن المطلوبة، والرواتب.", 
            tag: "جديد 🔥", 
            dateAdded: "2026-06-11",
            img: "https://i.ibb.co/your-image-sweden.jpg"
        },
        { 
            url: "countries/denmark-job-seeker-visa-2026.html", 
            title: "🇩🇰 الدنمارك (فيزا البحث عن عمل)", 
            desc: "تأشيرة بحث عن عمل لمدة سنتين بدون عقد مسبق، المهن المطلوبة، والرواتب.", 
            tag: "جديد 🔥", 
            dateAdded: "2026-06-22",
            img: "https://i.ibb.co/your-image-denmark.jpg"
        },
        // ... باقي الدول مع إضافة خاصية img لكل منها
    ];

    // ترتيب تنازلي حسب التاريخ
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
            
            // استخدام الصورة المباشرة إن وجدت، وإلا استخدام placeholder
            let imgHtml;
            if (c.img) {
                imgHtml = `<img src="${c.img}" alt="${c.title}" class="card-img" loading="lazy" width="300" height="169" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22169%22%3E%3Crect width=%22300%22 height=%22169%22 fill=%22%23E2E8F0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22sans-serif%22 font-size=%2216%22 text-anchor=%22middle%22 dominant-baseline=%22central%22 fill=%22%2394A3B8%22%3Eصورة%3C/text%3E%3C/svg%3E';">`;
            } else {
                imgHtml = `<div class="card-img loading-placeholder" data-url="${c.url}"></div>`;
            }
            
            card.innerHTML = `
                ${imgHtml}
                <div class="card-content">
                    <h3>${c.title}</h3>
                    <p>${c.desc}</p>
                    <span class="card-tag">${c.tag}</span>
                </div>
            `;
            container.appendChild(card);
        });

        // تحميل الصور للعناصر التي لا تحتوي على img مباشر
        loadImagesFromPlaceholders();
    }

    // جلب الصور من placeholders فقط (في حال عدم وجود img مباشر)
    async function loadImagesFromPlaceholders() {
        const placeholders = document.querySelectorAll('.card-img.loading-placeholder');
        if (placeholders.length === 0) return;

        const cacheKey = 'imageCacheV1';
        let cache = {};
        try {
            const saved = localStorage.getItem(cacheKey);
            if (saved) cache = JSON.parse(saved);
        } catch(e) {}

        // جلب الصور بشكل متوازي مع حد أقصى 5 طلبات في نفس الوقت
        const queue = [];
        for (const div of placeholders) {
            const url = div.getAttribute('data-url');
            if (!url) continue;
            queue.push({ div, url });
        }

        // معالجة الطلبات بشكل متوازي مع حد أقصى 5
        const BATCH_SIZE = 5;
        for (let i = 0; i < queue.length; i += BATCH_SIZE) {
            const batch = queue.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(({ div, url }) => loadImage(div, url, cache, cacheKey)));
        }
    }

    async function loadImage(div, url, cache, cacheKey) {
        // التحقق من التخزين المؤقت
        if (cache[url] && cache[url].expiry > Date.now()) {
            const imgUrl = cache[url].imgUrl;
            if (imgUrl) {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = "صورة المقال";
                img.className = "card-img";
                img.loading = "lazy";
                img.width = 300;
                img.height = 169;
                div.parentNode.replaceChild(img, div);
            } else {
                showFallback(div);
            }
            return;
        }

        // جلب الصورة مع مهلة زمنية 10 ثوانٍ
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            const res = await fetch(url, { 
                cache: 'force-cache',
                signal: controller.signal 
            });
            clearTimeout(timeoutId);
            
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
                img.width = 300;
                img.height = 169;
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