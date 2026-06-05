// =============================================
// script.js - الوظائف التفاعلية للموقع
// الإصدار: 2.0 - تاريخ: 5 يونيو 2026
// =============================================

(function() {
    'use strict';

    // -------------------- بيانات المقالات (جميع الدول) --------------------
    // يمكنك تعديل هذه القائمة أو جلبها من مصدر خارجي.
    // الترتيب هنا هو ترتيب ظهور البطاقات على الصفحة الرئيسية (الـ 4 الأولى ستظهر)
    const allArticles = [
        { url: "countries/belgium-work-guide-2026.html", title: "🇧🇪 فرص عمل في بلجيكا 2026 (تأشيرة ورواتب بدون شهادة)", desc: "دليل شامل للعمل في بلجيكا: تأشيرة Single Permit، المهن المطلوبة، والرواتب للمغاربة والعرب.", tag: "رواتب تبدأ 1,800 يورو" },
        { url: "countries/romania-work-visa-guide-2026.html", title: "🇷🇴 عقود عمل في رومانيا 2026 (أسئلة وإجابات)", desc: "كيف تحصل على عقد عمل في رومانيا؟ تأشيرة، رواتب، ومهن مطلوبة. إجابات على أسئلة العرب.", tag: "رواتب تبدأ 600 يورو" },
        { url: "countries/kuwait-jobs-guide-2026.html", title: "🇰🇼 الكويت (دليل عام)", desc: "دليل شامل: الرواتب، أنواع التأشيرات، منصات التوظيف، وكل ما يحتاجه الباحث عن عمل في الكويت.", tag: "رواتب تبدأ من 250 دينار" },
        { url: "countries/kuwait-jobs-beginners-no-degree-2026.html", title: "🇰🇼 الكويت (للمبتدئين)", desc: "وظائف بدون شهادة أو خبرة: سائقين، عمال بناء، مطابخ، نظافة، مستودعات، فرص للنساء.", tag: "رواتب 200 دينار + سكن" },
        { url: "countries/saudi-arabia-jobs-egyptians-2026.html", title: "🇸🇦 السعودية (للمصريين)", desc: "دليل خاص للمصريين: عقود عمل، رواتب، منصة طاقات وقوى، وشروط التأشيرة بدون وسيط.", tag: "رواتب تبدأ 4,000 ريال" },
        { url: "countries/netherlands-jobs-arabs-2026.html", title: "🇳🇱 هولندا (دليل شامل)", desc: "تأشيرة العمل للمهرة، الرواتب، وكيفية التقديم من الدول العربية.", tag: "رواتب تبدأ 45,000 يورو" },
        { url: "countries/netherlands-seasonal-jobs-2026.html", title: "🇳🇱 هولندا (وظائف موسمية)", desc: "بدون شهادة، سكن مجاني، رواتب تبدأ من 1500 يورو. فرص في الزراعة والمستودعات.", tag: "للمبتدئين" },
        { url: "countries/spain-jobs-arabs-guide-2026.html", title: "🇪🇸 إسبانيا (دليل شامل للعرب)", desc: "عقود عمل، شروط، رواتب، تأشيرات، وكيفية التقديم من أي بلد عربي.", tag: "دليل شامل" },
        { url: "countries/spain-seasonal-work-moroccans-2026.html", title: "🇪🇸 إسبانيا (موسمي للمغاربة)", desc: "التسجيل عبر ANAPEC، عقود قانونية، سكن، رواتب، وشروط التقديم للمغاربة.", tag: "رواتب 1,400 يورو" },
        { url: "countries/qatar.html", title: "🇶🇦 قطر (الرواتب الحقيقية)", desc: "المهن الأعلى أجراً، الرواتب المعفاة من الضرائب، وكيفية التقديم على وظائف قطر للطاقة والمطار.", tag: "رواتب تصل 60,000 ريال" },
        { url: "countries/qatar-jobs-without-experience-degree-2026.html", title: "🇶🇦 قطر (بدون خبرة أو شهادة)", desc: "شركات تقبل مبتدئين، رواتب مع سكن، وكيف تحصل على فرصتك من المغرب أو مصر.", tag: "للمبتدئين" },
        { url: "countries/qatar-jobs-for-women-2026.html", title: "🇶🇦 قطر (وظائف نسائية)", desc: "دوام جزئي وكامل، شهادة ثانوية أو بدون شهادة. فرص في صالونات، تعليم، تمريض، شرطة.", tag: "رواتب تبدأ 4,000 ريال" },
        { url: "countries/uae-jobs-without-degree-2026.html", title: "🇦🇪 الإمارات (بدون شهادة)", desc: "وظائف في دبي وأبوظبي لا تتطلب شهادة جامعية، الرواتب وتفاصيل التأشيرات.", tag: "فرص للجميع" },
        { url: "countries/uae-jobs-without-experience-2026.html", title: "🇦🇪 الإمارات (بدون خبرة)", desc: "أول وظيفة لك في الإمارات: قطاعات تقبل المبتدئين، رواتب، ونصائح عملية.", tag: "للمبتدئين" },
        { url: "countries/saudi-arabia-contracts-guide-2026.html", title: "🇸🇦 السعودية (دليل عام)", desc: "عقود عمل في مشاريع نيوم، القدية، والبحر الأحمر. رواتب معفاة من الضرائب.", tag: "رؤية 2030" },
        { url: "countries/europe-jobs-without-degree-2026.html", title: "🇪🇺 أوروبا (بدون شهادة)", desc: "دليل شامل لوظائف في ألمانيا، إيطاليا، فرنسا، هولندا، بولندا بدون مؤهل جامعي.", tag: "وظائف عملية" },
        { url: "countries/france-contracts-guide-2026.html", title: "🇫🇷 فرنسا", desc: "عقود CDI و CDD، عقود موسمية في السياحة والفلاحة للمغاربة والعرب.", tag: "عقود رسمية" },
        { url: "countries/france-seasonal-work-moroccans-2026.html", title: "🇫🇷 فرنسا (موسمي للمغاربة)", desc: "عقود موسمية في فرنسا للمغاربة 2026: التسجيل عبر ANAPEC، رواتب SMIC 12.31€/ساعة، سكن مجاني.", tag: "عقود موسمية" },
        { url: "countries/italy-contracts-guide-2026.html", title: "🇮🇹 إيطاليا", desc: "عقود موسمية في الزراعة والسياحة عبر منصة Click Lavoro. فرص للمغاربة.", tag: "تأشيرة سريعة" },
        { url: "countries/usa.html", title: "🇺🇸 الولايات المتحدة", desc: "تأشيرات H-1B و H-2B. رواتب بين 3000-13000 دولار شهرياً.", tag: "85,000 تأشيرة" },
        { url: "countries/canada.html", title: "🇨🇦 كندا", desc: "نظام Express Entry، رواتب بين 3500-9000 دولار كندي، هجرة منظمة.", tag: "500,000 مهاجر" },
        { url: "countries/uk.html", title: "🇬🇧 بريطانيا", desc: "تأشيرة Skilled Worker Visa. نظام النقاط، الرواتب من 26,200 جنيه سنوياً.", tag: "نظام النقاط" },
        { url: "countries/germany.html", title: "🇩🇪 ألمانيا", desc: "تأشيرة Chancenkarte. وظائف في الطب، الهندسة والتقنية.", tag: "بطاقة الفرصة" },
        { url: "countries/albania-jobs-guide-2026.html", title: "🇦🇱 ألبانيا", desc: "تأشيرة موحدة عبر e-Albania، فرص في السياحة والتكنولوجيا.", tag: "تصريح عمل+إقامة" },
        { url: "countries/brazil-work-visa-guide-2026.html", title: "🇧🇷 البرازيل (عمل)", desc: "تأشيرة VITEM V والمهن المطلوبة. كيف تحصل على عرض عمل من الخارج.", tag: "فيزا عمل" },
        { url: "countries/asylum-brazil-guide-2026.html", title: "🇧🇷 البرازيل (لجوء)", desc: "طلب اللجوء الإنساني والسياسي. شروط بروتوكول اللجوء وخطوات التقديم.", tag: "بروتوكول اللجوء" }
    ];

    // عدد المقالات التي تظهر في الصفحة الرئيسية (أحدث 4 دول)
    const MAX_ARTICLES_ON_HOMEPAGE = 4;

    // -------------------- الحصول على العنصر الذي سيتم وضع البطاقات فيه --------------------
    const container = document.getElementById('countriesContainer');
    if (!container) {
        console.warn('⚠️ لم يتم العثور على عنصر countriesContainer، قد تكون في صفحة غير رئيسية');
    }

    // -------------------- دوال مساعدة --------------------
    function getArticlesToShow() {
        // نأخذ أول MAX_ARTICLES_ON_HOMEPAGE من المصفوفة (يمكن تعديلها حسب معايير "أحدث")
        return allArticles.slice(0, MAX_ARTICLES_ON_HOMEPAGE);
    }

    // إنشاء بطاقات الدول (بدون صور أولاً، ستُجلب لاحقاً)
    function renderCountryCards() {
        if (!container) return;
        const articlesToShow = getArticlesToShow();
        container.innerHTML = '';
        articlesToShow.forEach(article => {
            const card = document.createElement('a');
            card.href = article.url;
            card.className = 'country-card';
            card.innerHTML = `
                <div class="card-img loading-placeholder" data-url="${article.url}"></div>
                <div class="card-content">
                    <h3>${article.title}</h3>
                    <p>${article.desc}</p>
                    <span class="card-tag">${article.tag}</span>
                </div>
            `;
            container.appendChild(card);
        });
        return document.querySelectorAll('.country-card .card-img.loading-placeholder');
    }

    // جلب الصور باستخدام localStorage + IntersectionObserver لتحميل lazy
    async function loadImagesForCards(imgElements) {
        const cacheKey = 'imageCacheV1';
        let cache = {};
        try {
            const saved = localStorage.getItem(cacheKey);
            if (saved) cache = JSON.parse(saved);
        } catch(e) { console.warn('فشل قراءة الكاش'); }

        // استخدام IntersectionObserver لتحميل الصورة فقط عندما تظهر في الشاشة
        const observer = new IntersectionObserver(async (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const imgDiv = entry.target;
                    observer.unobserve(imgDiv);
                    const url = imgDiv.getAttribute('data-url');
                    if (!url) continue;

                    // التحقق من الكاش
                    if (cache[url] && cache[url].expiry > Date.now()) {
                        const imgUrl = cache[url].imgUrl;
                        if (imgUrl) {
                            const img = document.createElement('img');
                            img.src = imgUrl;
                            img.alt = "صورة المقال";
                            img.className = "card-img";
                            img.loading = "lazy";
                            imgDiv.parentNode.replaceChild(img, imgDiv);
                        } else {
                            // صورة غير موجودة، نعرض أيقونة افتراضية
                            const fallback = createFallbackImage();
                            imgDiv.parentNode.replaceChild(fallback, imgDiv);
                        }
                        continue;
                    }

                    // جلب الصورة من المقالة
                    try {
                        const response = await fetch(url, { cache: 'force-cache' });
                        if (!response.ok) throw new Error(`HTTP ${response.status}`);
                        const html = await response.text();
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
                            imgDiv.parentNode.replaceChild(img, imgDiv);
                            // حفظ في الكاش لمدة 7 أيام
                            cache[url] = { imgUrl: imgUrl, expiry: Date.now() + 604800000 };
                            localStorage.setItem(cacheKey, JSON.stringify(cache));
                        } else {
                            const fallback = createFallbackImage();
                            imgDiv.parentNode.replaceChild(fallback, imgDiv);
                            cache[url] = { imgUrl: null, expiry: Date.now() + 604800000 };
                            localStorage.setItem(cacheKey, JSON.stringify(cache));
                        }
                    } catch(e) {
                        console.error(`خطأ في جلب الصورة لـ ${url}`, e);
                        const fallback = createFallbackImage();
                        imgDiv.parentNode.replaceChild(fallback, imgDiv);
                    }
                }
            }
        }, { rootMargin: '100px' }); // تبدأ التحميل عندما تصبح الصورة على بعد 100px من الشاشة

        imgElements.forEach(el => observer.observe(el));
    }

    function createFallbackImage() {
        const fallback = document.createElement('div');
        fallback.className = "card-img";
        fallback.style.background = "#EFF6FF";
        fallback.style.display = "flex";
        fallback.style.alignItems = "center";
        fallback.style.justifyContent = "center";
        fallback.innerHTML = '<i class="fas fa-briefcase" style="font-size: 3rem; color: #2563EB;"></i>';
        return fallback;
    }

    // -------------------- وظيفة البحث --------------------
    function searchCountry() {
        const input = document.getElementById('searchInput');
        if (!input) return;
        const query = input.value.toLowerCase().trim();
        if (!query) return;
        // خريطة بسيطة للدول (يمكن توسيعها)
        const map = {
            'الكويت': 'countries/kuwait-jobs-guide-2026.html',
            'السعودية': 'countries/saudi-arabia-contracts-guide-2026.html',
            'هولندا': 'countries/netherlands-jobs-arabs-2026.html',
            'إسبانيا': 'countries/spain-jobs-arabs-guide-2026.html',
            'قطر': 'countries/qatar.html',
            'الإمارات': 'countries/uae-jobs-without-degree-2026.html',
            'فرنسا': 'countries/france-contracts-guide-2026.html',
            'إيطاليا': 'countries/italy-contracts-guide-2026.html',
            'أمريكا': 'countries/usa.html',
            'كندا': 'countries/canada.html',
            'ألمانيا': 'countries/germany.html',
            'بريطانيا': 'countries/uk.html',
            'ألبانيا': 'countries/albania-jobs-guide-2026.html',
            'البرازيل': 'countries/brazil-work-visa-guide-2026.html',
            'رومانيا': 'countries/romania-work-visa-guide-2026.html',
            'بلجيكا': 'countries/belgium-work-guide-2026.html'
        };
        for (let key in map) {
            if (query.includes(key)) {
                window.location.href = map[key];
                return;
            }
        }
        alert('🌍 لم نعثر على دولة مطابقة. حاول مرة أخرى.');
    }

    // إضافة مستمع لحدث Enter في مربع البحث
    function bindSearchEvents() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') searchCountry();
            });
        }
        const searchButton = document.querySelector('.search-box button');
        if (searchButton) {
            searchButton.addEventListener('click', searchCountry);
        }
    }

    // -------------------- التنفيذ الرئيسي --------------------
    function init() {
        if (container) {
            const placeholders = renderCountryCards();
            if (placeholders.length) {
                loadImagesForCards(placeholders);
            }
        }
        bindSearchEvents();
    }

    // تأخير التنفيذ حتى اكتمال تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();