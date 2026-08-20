// =============================================
// script.js - إدارة الدول في الصفحة الرئيسية
// الإصدار: 2.1 - تاريخ: 20 أغسطس 2026
// =============================================

(function() {
    'use strict';

    // قائمة الدول (مرتبة من الأحدث إلى الأقدم حسب dateAdded)
    const featuredCountries = [
        // 1. أستراليا (أحدث دولة)
        { 
            url: "countries/australia.html", 
            title: "🇦🇺 أستراليا (فيزا عقد عمل)", 
            desc: "دليل شامل لتأشيرة العمل، المهن المطلوبة، الرواتب، وشروط التقديم للعرب.", 
            tag: "جديد 🔥", 
            dateAdded: "2026-08-20" 
        },
        // 2. المغرب
        { 
            url: "countries/morocco-jobs-guide-2026.html", 
            title: "🇲🇦 المغرب (دليل وظائف)", 
            desc: "أفضل مواقع التوظيف، المهن المطلوبة، الرواتب، وظائف بدون شهادة، والوظيفة العمومية.", 
            tag: "جديد 🔥", 
            dateAdded: "2026-06-13" 
        },
        // 3. السويد
        { 
            url: "countries/sweden-job-seeker-visa-2026.html", 
            title: "🇸🇪 السويد (فيزا البحث عن عمل)", 
            desc: "تأشيرة بحث عن عمل لمدة 9 أشهر بدون عقد مسبق، المهن المطلوبة، والرواتب.", 
            tag: "جديد 🔥", 
            dateAdded: "2026-06-11" 
        },
        // 4. الدنمارك
        { 
            url: "countries/denmark-job-seeker-visa-2026.html", 
            title: "🇩🇰 الدنمارك (فيزا البحث عن عمل)", 
            desc: "تأشيرة بحث عن عمل لمدة سنتين بدون عقد مسبق، المهن المطلوبة، والرواتب.", 
            tag: "جديد 🔥", 
            dateAdded: "2026-06-22" 
        },
        // 5. رومانيا
        { 
            url: "countries/romania-work-visa-guide-2026.html", 
            title: "🇷🇴 رومانيا (عقود عمل)", 
            desc: "إجابات على أسئلة العرب: الرواتب، المهن المطلوبة، وتكاليف المعيشة.", 
            tag: "جديد", 
            dateAdded: "2026-06-04" 
        },
        // 6. بلجيكا
        { 
            url: "countries/belgium-work-guide-2026.html", 
            title: "🇧🇪 بلجيكا (تأشيرة Single Permit)", 
            desc: "تصريح عمل وإقامة موحد، رواتب تبدأ 1,800 يورو، دليل شامل للعرب.", 
            tag: "جديد", 
            dateAdded: "2026-06-05" 
        },
        // 7. فرنسا (موسمي للمغاربة)
        { 
            url: "countries/france-seasonal-work-moroccans-2026.html", 
            title: "🇫🇷🇲🇦 فرنسا (موسمي للمغاربة)", 
            desc: "عقود موسمية عبر ANAPEC، رواتب تبدأ 1,400 يورو، سكن مجاني.", 
            tag: "عقود موسمية", 
            dateAdded: "2026-05-28" 
        },
        // 8. إسبانيا (موسمي للمغاربة)
        { 
            url: "countries/spain-seasonal-work-moroccans-2026.html", 
            title: "🇪🇸🇲🇦 إسبانيا (موسمي للمغاربة)", 
            desc: "التسجيل عبر ANAPEC، عقود قانونية، سكن، رواتب 1,400 يورو.", 
            tag: "موسمي", 
            dateAdded: "2026-05-25" 
        },
        // 9. هولندا (موسمي)
        { 
            url: "countries/netherlands-seasonal-jobs-2026.html", 
            title: "🇳🇱 هولندا (وظائف موسمية)", 
            desc: "بدون شهادة، سكن مجاني، رواتب تبدأ من 1500 يورو.", 
            tag: "للمبتدئين", 
            dateAdded: "2026-05-20" 
        },
        // 10. فرنسا (عام)
        { 
            url: "countries/france-contracts-guide-2026.html", 
            title: "🇫🇷 فرنسا (عقود عمل)", 
            desc: "عقود CDI و CDD، عقود موسمية في السياحة والفلاحة.", 
            tag: "عقود رسمية", 
            dateAdded: "2026-05-05" 
        },
        // 11. إيطاليا
        { 
            url: "countries/italy-contracts-guide-2026.html", 
            title: "🇮🇹 إيطاليا (عقود موسمية)", 
            desc: "عقود موسمية في الزراعة والسياحة عبر منصة Click Lavoro.", 
            tag: "تأشيرة سريعة", 
            dateAdded: "2026-05-02" 
        },
        // 12. إسبانيا (دليل شامل)
        { 
            url: "countries/spain-jobs-arabs-guide-2026.html", 
            title: "🇪🇸 إسبانيا (دليل شامل للعرب)", 
            desc: "عقود عمل، شروط، رواتب، تأشيرات، وكيفية التقديم.", 
            tag: "دليل شامل", 
            dateAdded: "2026-04-28" 
        },
        // 13. هولندا (دليل شامل)
        { 
            url: "countries/netherlands-jobs-arabs-2026.html", 
            title: "🇳🇱 هولندا (دليل شامل)", 
            desc: "تأشيرة العمل للمهرة، الرواتب، وكيفية التقديم.", 
            tag: "رواتب تبدأ 45,000 يورو", 
            dateAdded: "2026-04-25" 
        },
        // 14. ألمانيا
        { 
            url: "countries/germany.html", 
            title: "🇩🇪 ألمانيا (دليل شامل)", 
            desc: "تأشيرة Chancenkarte. وظائف في الطب، الهندسة والتقنية.", 
            tag: "بطاقة الفرصة", 
            dateAdded: "2026-04-20" 
        },
        // 15. بريطانيا
        { 
            url: "countries/uk.html", 
            title: "🇬🇧 بريطانيا (تأشيرات عمل)", 
            desc: "تأشيرة Skilled Worker Visa. نظام النقاط.", 
            tag: "نظام النقاط", 
            dateAdded: "2026-04-15" 
        },
        // 16. أوروبا بدون شهادة
        { 
            url: "countries/europe-jobs-without-degree-2026.html", 
            title: "🇪🇺 أوروبا (بدون شهادة)", 
            desc: "دليل شامل لوظائف في ألمانيا، إيطاليا، فرنسا، هولندا.", 
            tag: "وظائف عملية", 
            dateAdded: "2026-04-10" 
        },
        // 17. ألبانيا
        { 
            url: "countries/albania-jobs-guide-2026.html", 
            title: "🇦🇱 ألبانيا (تأشيرة موحدة)", 
            desc: "تأشيرة موحدة عبر e-Albania، فرص في السياحة والتكنولوجيا.", 
            tag: "تصريح عمل+إقامة", 
            dateAdded: "2026-04-05" 
        },
        // 18-20. قطر
        { 
            url: "countries/qatar-jobs-for-women-2026.html", 
            title: "🇶🇦 قطر (وظائف نسائية)", 
            desc: "دوام جزئي وكامل، شهادة ثانوية أو بدون شهادة.", 
            tag: "رواتب تبدأ 4,000 ريال", 
            dateAdded: "2026-04-01" 
        },
        { 
            url: "countries/qatar-jobs-without-experience-degree-2026.html", 
            title: "🇶🇦 قطر (بدون خبرة أو شهادة)", 
            desc: "شركات تقبل مبتدئين، رواتب مع سكن.", 
            tag: "للمبتدئين", 
            dateAdded: "2026-03-28" 
        },
        { 
            url: "countries/qatar.html", 
            title: "🇶🇦 قطر (الرواتب الحقيقية)", 
            desc: "المهن الأعلى أجراً، الرواتب المعفاة من الضرائب.", 
            tag: "رواتب تصل 60,000 ريال", 
            dateAdded: "2026-03-25" 
        },
        // 21-22. الإمارات
        { 
            url: "countries/uae-jobs-without-experience-2026.html", 
            title: "🇦🇪 الإمارات (بدون خبرة)", 
            desc: "أول وظيفة لك في الإمارات: قطاعات تقبل المبتدئين.", 
            tag: "للمبتدئين", 
            dateAdded: "2026-03-20" 
        },
        { 
            url: "countries/uae-jobs-without-degree-2026.html", 
            title: "🇦🇪 الإمارات (بدون شهادة)", 
            desc: "وظائف في دبي وأبوظبي لا تتطلب شهادة جامعية.", 
            tag: "فرص للجميع", 
            dateAdded: "2026-03-15" 
        },
        // 23-24. الكويت
        { 
            url: "countries/kuwait-jobs-beginners-no-degree-2026.html", 
            title: "🇰🇼 الكويت (للمبتدئين)", 
            desc: "وظائف بدون شهادة أو خبرة: سائقين، عمال بناء، مطابخ.", 
            tag: "رواتب 200 دينار + سكن", 
            dateAdded: "2026-03-10" 
        },
        { 
            url: "countries/kuwait-jobs-guide-2026.html", 
            title: "🇰🇼 الكويت (دليل عام)", 
            desc: "دليل شامل: الرواتب، أنواع التأشيرات، منصات التوظيف.", 
            tag: "رواتب تبدأ من 250 دينار", 
            dateAdded: "2026-03-05" 
        },
        // 25-26. السعودية
        { 
            url: "countries/saudi-arabia-jobs-egyptians-2026.html", 
            title: "🇸🇦 السعودية (للمصريين)", 
            desc: "دليل خاص للمصريين: عقود عمل، رواتب، منصة طاقات وقوى.", 
            tag: "رواتب تبدأ 4,000 ريال", 
            dateAdded: "2026-03-01" 
        },
        { 
            url: "countries/saudi-arabia-contracts-guide-2026.html", 
            title: "🇸🇦 السعودية (دليل عام)", 
            desc: "عقود عمل في مشاريع نيوم، القدية، والبحر الأحمر.", 
            tag: "رؤية 2030", 
            dateAdded: "2026-02-25" 
        },
        // 27-28. كندا وأمريكا
        { 
            url: "countries/canada.html", 
            title: "🇨🇦 كندا (Express Entry)", 
            desc: "نظام Express Entry، رواتب بين 3500-9000 دولار كندي.", 
            tag: "500,000 مهاجر", 
            dateAdded: "2026-02-20" 
        },
        { 
            url: "countries/usa.html", 
            title: "🇺🇸 الولايات المتحدة", 
            desc: "تأشيرات H-1B و H-2B. رواتب بين 3000-13000 دولار شهرياً.", 
            tag: "85,000 تأشيرة", 
            dateAdded: "2026-02-15" 
        },
        // 29-30. البرازيل
        { 
            url: "countries/brazil-work-visa-guide-2026.html", 
            title: "🇧🇷 البرازيل (تأشيرة عمل)", 
            desc: "تأشيرة VITEM V والمهن المطلوبة.", 
            tag: "فيزا عمل", 
            dateAdded: "2026-02-10" 
        },
        { 
            url: "countries/asylum-brazil-guide-2026.html", 
            title: "🇧🇷 البرازيل (لجوء)", 
            desc: "طلب اللجوء الإنساني والسياسي. شروط بروتوكول اللجوء.", 
            tag: "بروتوكول اللجوء", 
            dateAdded: "2026-02-05" 
        }
    ];

    // ترتيب تنازلي حسب التاريخ (الأحدث أولاً) – مضمون بالفعل
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
        // تحميل الصور بعد إنشاء البطاقات
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
                continue;
            }

            try {
                const res = await fetch(url, { cache: 'force-cache' });
                if (!res.ok) throw new Error();
                const html = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                let imgUrl = null;
                
                // محاولة جلب og:image
                const meta = doc.querySelector('meta[property="og:image"]');
                if (meta && meta.content) imgUrl = meta.content;
                
                // محاولة جلب الصورة الأولى
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

    // تهيئة البطاقات
    renderCards();
})();