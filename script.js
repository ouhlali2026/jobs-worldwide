// =============================================
// script.js - إدارة الدول في الصفحة الرئيسية
// الإصدار: 2.6 - تاريخ: 20 أغسطس 2026
// =============================================

(function() {
    'use strict';

    // قائمة الدول (مرتبة من الأحدث إلى الأقدم)
    const featuredCountries = [
        { url: "countries/australia.html", title: "🇦🇺 أستراليا (فيزا عقد عمل)", desc: "دليل شامل لتأشيرة العمل، المهن المطلوبة، الرواتب، وشروط التقديم للعرب.", tag: "جديد 🔥", dateAdded: "2026-08-20" },
        { url: "countries/morocco-jobs-guide-2026.html", title: "🇲🇦 المغرب (دليل وظائف)", desc: "أفضل مواقع التوظيف، المهن المطلوبة، الرواتب، وظائف بدون شهادة، والوظيفة العمومية.", tag: "جديد 🔥", dateAdded: "2026-06-13" },
        { url: "countries/sweden-job-seeker-visa-2026.html", title: "🇸🇪 السويد (فيزا البحث عن عمل)", desc: "تأشيرة بحث عن عمل لمدة 9 أشهر بدون عقد مسبق، المهن المطلوبة، والرواتب.", tag: "جديد 🔥", dateAdded: "2026-06-11" },
        { url: "countries/denmark-job-seeker-visa-2026.html", title: "🇩🇰 الدنمارك (فيزا البحث عن عمل)", desc: "تأشيرة بحث عن عمل لمدة سنتين بدون عقد مسبق، المهن المطلوبة، والرواتب.", tag: "جديد 🔥", dateAdded: "2026-06-22" },
        { url: "countries/romania-work-visa-guide-2026.html", title: "🇷🇴 رومانيا (عقود عمل)", desc: "إجابات على أسئلة العرب: الرواتب، المهن المطلوبة، وتكاليف المعيشة.", tag: "جديد", dateAdded: "2026-06-04" },
        { url: "countries/belgium-work-guide-2026.html", title: "🇧🇪 بلجيكا (تأشيرة Single Permit)", desc: "تصريح عمل وإقامة موحد، رواتب تبدأ 1,800 يورو، دليل شامل للعرب.", tag: "جديد", dateAdded: "2026-06-05" },
        { url: "countries/france-seasonal-work-moroccans-2026.html", title: "🇫🇷🇲🇦 فرنسا (موسمي للمغاربة)", desc: "عقود موسمية عبر ANAPEC، رواتب تبدأ 1,400 يورو، سكن مجاني.", tag: "عقود موسمية", dateAdded: "2026-05-28" },
        { url: "countries/spain-seasonal-work-moroccans-2026.html", title: "🇪🇸🇲🇦 إسبانيا (موسمي للمغاربة)", desc: "التسجيل عبر ANAPEC، عقود قانونية، سكن، رواتب 1,400 يورو.", tag: "موسمي", dateAdded: "2026-05-25" },
        { url: "countries/netherlands-seasonal-jobs-2026.html", title: "🇳🇱 هولندا (وظائف موسمية)", desc: "بدون شهادة، سكن مجاني، رواتب تبدأ من 1500 يورو.", tag: "للمبتدئين", dateAdded: "2026-05-20" },
        { url: "countries/france-contracts-guide-2026.html", title: "🇫🇷 فرنسا (عقود عمل)", desc: "عقود CDI و CDD، عقود موسمية في السياحة والفلاحة.", tag: "عقود رسمية", dateAdded: "2026-05-05" },
        { url: "countries/italy-contracts-guide-2026.html", title: "🇮🇹 إيطاليا (عقود موسمية)", desc: "عقود موسمية في الزراعة والسياحة عبر منصة Click Lavoro.", tag: "تأشيرة سريعة", dateAdded: "2026-05-02" },
        { url: "countries/spain-jobs-arabs-guide-2026.html", title: "🇪🇸 إسبانيا (دليل شامل للعرب)", desc: "عقود عمل، شروط، رواتب، تأشيرات، وكيفية التقديم.", tag: "دليل شامل", dateAdded: "2026-04-28" },
        { url: "countries/netherlands-jobs-arabs-2026.html", title: "🇳🇱 هولندا (دليل شامل)", desc: "تأشيرة العمل للمهرة، الرواتب، وكيفية التقديم.", tag: "رواتب تبدأ 45,000 يورو", dateAdded: "2026-04-25" },
        { url: "countries/germany.html", title: "🇩🇪 ألمانيا (دليل شامل)", desc: "تأشيرة Chancenkarte. وظائف في الطب، الهندسة والتقنية.", tag: "بطاقة الفرصة", dateAdded: "2026-04-20" },
        { url: "countries/uk.html", title: "🇬🇧 بريطانيا (تأشيرات عمل)", desc: "تأشيرة Skilled Worker Visa. نظام النقاط.", tag: "نظام النقاط", dateAdded: "2026-04-15" },
        { url: "countries/europe-jobs-without-degree-2026.html", title: "🇪🇺 أوروبا (بدون شهادة)", desc: "دليل شامل لوظائف في ألمانيا، إيطاليا، فرنسا، هولندا.", tag: "وظائف عملية", dateAdded: "2026-04-10" },
        { url: "countries/albania-jobs-guide-2026.html", title: "🇦🇱 ألبانيا (تأشيرة موحدة)", desc: "تأشيرة موحدة عبر e-Albania، فرص في السياحة والتكنولوجيا.", tag: "تصريح عمل+إقامة", dateAdded: "2026-04-05" },
        { url: "countries/qatar-jobs-for-women-2026.html", title: "🇶🇦 قطر (وظائف نسائية)", desc: "دوام جزئي وكامل، شهادة ثانوية أو بدون شهادة.", tag: "رواتب تبدأ 4,000 ريال", dateAdded: "2026-04-01" },
        { url: "countries/qatar-jobs-without-experience-degree-2026.html", title: "🇶🇦 قطر (بدون خبرة أو شهادة)", desc: "شركات تقبل مبتدئين، رواتب مع سكن.", tag: "للمبتدئين", dateAdded: "2026-03-28" },
        { url: "countries/qatar.html", title: "🇶🇦 قطر (الرواتب الحقيقية)", desc: "المهن الأعلى أجراً، الرواتب المعفاة من الضرائب.", tag: "رواتب تصل 60,000 ريال", dateAdded: "2026-03-25" },
        { url: "countries/uae-jobs-without-experience-2026.html", title: "🇦🇪 الإمارات (بدون خبرة)", desc: "أول وظيفة لك في الإمارات: قطاعات تقبل المبتدئين.", tag: "للمبتدئين", dateAdded: "2026-03-20" },
        { url: "countries/uae-jobs-without-degree-2026.html", title: "🇦🇪 الإمارات (بدون شهادة)", desc: "وظائف في دبي وأبوظبي لا تتطلب شهادة جامعية.", tag: "فرص للجميع", dateAdded: "2026-03-15" },
        { url: "countries/kuwait-jobs-beginners-no-degree-2026.html", title: "🇰🇼 الكويت (للمبتدئين)", desc: "وظائف بدون شهادة أو خبرة: سائقين، عمال بناء، مطابخ.", tag: "رواتب 200 دينار + سكن", dateAdded: "2026-03-10" },
        { url: "countries/kuwait-jobs-guide-2026.html", title: "🇰🇼 الكويت (دليل عام)", desc: "دليل شامل: الرواتب، أنواع التأشيرات، منصات التوظيف.", tag: "رواتب تبدأ من 250 دينار", dateAdded: "2026-03-05" },
        { url: "countries/saudi-arabia-jobs-egyptians-2026.html", title: "🇸🇦 السعودية (للمصريين)", desc: "دليل خاص للمصريين: عقود عمل، رواتب، منصة طاقات وقوى.", tag: "رواتب تبدأ 4,000 ريال", dateAdded: "2026-03-01" },
        { url: "countries/saudi-arabia-contracts-guide-2026.html", title: "🇸🇦 السعودية (دليل عام)", desc: "عقود عمل في مشاريع نيوم، القدية، والبحر الأحمر.", tag: "رؤية 2030", dateAdded: "2026-02-25" },
        { url: "countries/canada.html", title: "🇨🇦 كندا (Express Entry)", desc: "نظام Express Entry، رواتب بين 3500-9000 دولار كندي.", tag: "500,000 مهاجر", dateAdded: "2026-02-20" },
        { url: "countries/usa.html", title: "🇺🇸 الولايات المتحدة", desc: "تأشيرات H-1B و H-2B. رواتب بين 3000-13000 دولار شهرياً.", tag: "85,000 تأشيرة", dateAdded: "2026-02-15" },
        { url: "countries/brazil-work-visa-guide-2026.html", title: "🇧🇷 البرازيل (تأشيرة عمل)", desc: "تأشيرة VITEM V والمهن المطلوبة.", tag: "فيزا عمل", dateAdded: "2026-02-10" },
        { url: "countries/asylum-brazil-guide-2026.html", title: "🇧🇷 البرازيل (لجوء)", desc: "طلب اللجوء الإنساني والسياسي. شروط بروتوكول اللجوء.", tag: "بروتوكول اللجوء", dateAdded: "2026-02-05" }
    ];

    // ترتيب تنازلي حسب التاريخ
    const sorted = [...featuredCountries].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    const container = document.getElementById('countriesContainer');
    if (!container) return;

    // ===== عرض البطاقات =====
    function renderCards() {
        container.innerHTML = '';
        
        // 🔥 عدد الدول المعروضة في الصفحة الرئيسية
        const MAX_DISPLAY = 7; // يمكنك تغيير الرقم إلى 6 أو 8 أو أي عدد تراه مناسباً
        
        // خذ فقط أول 7 دول من القائمة المرتبة (الأحدث أولاً)
        const displayed = sorted.slice(0, MAX_DISPLAY);
        
        displayed.forEach(c => {
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
            container.appendChild(card);
        });
        
        // بدء تحميل الصور بعد عرض البطاقات مباشرة
        loadImages();
    }

    // ===== جلب الصور مع تحسينات الأداء =====
    async function loadImages() {
        const cacheKey = 'imageCacheV1';
        let cache = {};
        try {
            const saved = localStorage.getItem(cacheKey);
            if (saved) cache = JSON.parse(saved);
        } catch(e) {}

        const placeholders = document.querySelectorAll('.card-img.loading-placeholder');
        const pending = [];

        for (const div of placeholders) {
            const url = div.getAttribute('data-url');
            if (!url) continue;

            // التحقق من التخزين المؤقت
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
            pending.push({ div, url });
        }

        // معالجة متوازية بحد أقصى 5 طلبات
        const BATCH_SIZE = 5;
        for (let i = 0; i < pending.length; i += BATCH_SIZE) {
            const batch = pending.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(({ div, url }) => fetchImage(div, url, cache, cacheKey)));
        }
    }

    async function fetchImage(div, url, cache, cacheKey) {
        const TIMEOUT = 5000; // 5 ثوانٍ مهلة زمنية
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

        try {
            const res = await fetch(url, { cache: 'force-cache', signal: controller.signal });
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
                div.parentNode.replaceChild(img, div);
                cache[url] = { imgUrl: imgUrl, expiry: Date.now() + 604800000 };
                localStorage.setItem(cacheKey, JSON.stringify(cache));
            } else {
                showFallback(div);
                cache[url] = { imgUrl: null, expiry: Date.now() + 604800000 };
                localStorage.setItem(cacheKey, JSON.stringify(cache));
            }
        } catch (error) {
            showFallback(div);
        } finally {
            clearTimeout(timeoutId);
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

    // ===== تهيئة البطاقات =====
    renderCards();
})();