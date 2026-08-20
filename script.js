// =============================================
// script.js - إدارة الدول في الصفحة الرئيسية
// الإصدار: 2.2 - تاريخ: 20 أغسطس 2026
// =============================================

(function() {
    'use strict';

    // قائمة الدول مع روابط الصور المباشرة
    const featuredCountries = [
        { 
            url: "countries/australia.html", 
            title: "🇦🇺 أستراليا (فيزا عقد عمل)", 
            desc: "دليل شامل لتأشيرة العمل، المهن المطلوبة، الرواتب، وشروط التقديم للعرب.", 
            tag: "جديد 🔥", 
            dateAdded: "2026-08-20",
            img: "https://i.ibb.co/your-image-australia.jpg"  // ⬅️ استبدل برابط الصورة الفعلي
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
        { 
            url: "countries/romania-work-visa-guide-2026.html", 
            title: "🇷🇴 رومانيا (عقود عمل)", 
            desc: "إجابات على أسئلة العرب: الرواتب، المهن المطلوبة، وتكاليف المعيشة.", 
            tag: "جديد", 
            dateAdded: "2026-06-04",
            img: "https://i.ibb.co/your-image-romania.jpg"
        },
        { 
            url: "countries/belgium-work-guide-2026.html", 
            title: "🇧🇪 بلجيكا (تأشيرة Single Permit)", 
            desc: "تصريح عمل وإقامة موحد، رواتب تبدأ 1,800 يورو، دليل شامل للعرب.", 
            tag: "جديد", 
            dateAdded: "2026-06-05",
            img: "https://i.ibb.co/your-image-belgium.jpg"
        },
        { 
            url: "countries/france-seasonal-work-moroccans-2026.html", 
            title: "🇫🇷🇲🇦 فرنسا (موسمي للمغاربة)", 
            desc: "عقود موسمية عبر ANAPEC، رواتب تبدأ 1,400 يورو، سكن مجاني.", 
            tag: "عقود موسمية", 
            dateAdded: "2026-05-28",
            img: "https://i.ibb.co/your-image-france-seasonal.jpg"
        },
        { 
            url: "countries/spain-seasonal-work-moroccans-2026.html", 
            title: "🇪🇸🇲🇦 إسبانيا (موسمي للمغاربة)", 
            desc: "التسجيل عبر ANAPEC، عقود قانونية، سكن، رواتب 1,400 يورو.", 
            tag: "موسمي", 
            dateAdded: "2026-05-25",
            img: "https://i.ibb.co/your-image-spain-seasonal.jpg"
        },
        { 
            url: "countries/netherlands-seasonal-jobs-2026.html", 
            title: "🇳🇱 هولندا (وظائف موسمية)", 
            desc: "بدون شهادة، سكن مجاني، رواتب تبدأ من 1500 يورو.", 
            tag: "للمبتدئين", 
            dateAdded: "2026-05-20",
            img: "https://i.ibb.co/your-image-netherlands-seasonal.jpg"
        },
        { 
            url: "countries/france-contracts-guide-2026.html", 
            title: "🇫🇷 فرنسا (عقود عمل)", 
            desc: "عقود CDI و CDD، عقود موسمية في السياحة والفلاحة.", 
            tag: "عقود رسمية", 
            dateAdded: "2026-05-05",
            img: "https://i.ibb.co/your-image-france.jpg"
        },
        { 
            url: "countries/italy-contracts-guide-2026.html", 
            title: "🇮🇹 إيطاليا (عقود موسمية)", 
            desc: "عقود موسمية في الزراعة والسياحة عبر منصة Click Lavoro.", 
            tag: "تأشيرة سريعة", 
            dateAdded: "2026-05-02",
            img: "https://i.ibb.co/your-image-italy.jpg"
        },
        { 
            url: "countries/spain-jobs-arabs-guide-2026.html", 
            title: "🇪🇸 إسبانيا (دليل شامل للعرب)", 
            desc: "عقود عمل، شروط، رواتب، تأشيرات، وكيفية التقديم.", 
            tag: "دليل شامل", 
            dateAdded: "2026-04-28",
            img: "https://i.ibb.co/your-image-spain.jpg"
        },
        { 
            url: "countries/netherlands-jobs-arabs-2026.html", 
            title: "🇳🇱 هولندا (دليل شامل)", 
            desc: "تأشيرة العمل للمهرة، الرواتب، وكيفية التقديم.", 
            tag: "رواتب تبدأ 45,000 يورو", 
            dateAdded: "2026-04-25",
            img: "https://i.ibb.co/your-image-netherlands.jpg"
        },
        { 
            url: "countries/germany.html", 
            title: "🇩🇪 ألمانيا (دليل شامل)", 
            desc: "تأشيرة Chancenkarte. وظائف في الطب، الهندسة والتقنية.", 
            tag: "بطاقة الفرصة", 
            dateAdded: "2026-04-20",
            img: "https://i.ibb.co/your-image-germany.jpg"
        },
        { 
            url: "countries/uk.html", 
            title: "🇬🇧 بريطانيا (تأشيرات عمل)", 
            desc: "تأشيرة Skilled Worker Visa. نظام النقاط.", 
            tag: "نظام النقاط", 
            dateAdded: "2026-04-15",
            img: "https://i.ibb.co/your-image-uk.jpg"
        },
        { 
            url: "countries/europe-jobs-without-degree-2026.html", 
            title: "🇪🇺 أوروبا (بدون شهادة)", 
            desc: "دليل شامل لوظائف في ألمانيا، إيطاليا، فرنسا، هولندا.", 
            tag: "وظائف عملية", 
            dateAdded: "2026-04-10",
            img: "https://i.ibb.co/your-image-europe.jpg"
        },
        { 
            url: "countries/albania-jobs-guide-2026.html", 
            title: "🇦🇱 ألبانيا (تأشيرة موحدة)", 
            desc: "تأشيرة موحدة عبر e-Albania، فرص في السياحة والتكنولوجيا.", 
            tag: "تصريح عمل+إقامة", 
            dateAdded: "2026-04-05",
            img: "https://i.ibb.co/your-image-albania.jpg"
        },
        // ... باقي الدول بنفس النمط
    ];

    // ترتيب تنازلي حسب التاريخ
    const sorted = [...featuredCountries].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    const container = document.getElementById('countriesContainer');
    if (!container) return;

    function renderCards() {
        container.innerHTML = '';
        sorted.forEach(c => {
            const card = document.createElement('a');
            card.href = c.url;
            card.className = 'country-card';
            
            // استخدام الصورة المباشرة إن وجدت، وإلا استخدام placeholder
            const imgHtml = c.img 
                ? `<img src="${c.img}" alt="${c.title}" class="card-img" loading="lazy" width="300" height="169" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22169%22%3E%3Crect width=%22300%22 height=%22169%22 fill=%22%23E2E8F0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22sans-serif%22 font-size=%2216%22 text-anchor=%22middle%22 dominant-baseline=%22central%22 fill=%22%2394A3B8%22%3Eصورة%3C/text%3E%3C/svg%3E';">`
                : `<div class="card-img loading-placeholder"></div>`;

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
    }

    renderCards();
})();