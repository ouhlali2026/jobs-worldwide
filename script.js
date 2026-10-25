// =============================================
// script.js - التصميم النصي فائق السرعة (بدون صور)
// =============================================

(function() {
    'use strict';

    // قائمة الدول (الأحدث أولاً) - جميع الروابط تنتهي بـ .html
    const featuredCountries = [
        { url: "countries/jordan-civil-service-guide-2026.html", title: "🇯🇴 الأردن: ديوان الخدمة المدنية", desc: "دليل الترتيب التنافسي والإعلان المفتوح والبدائل الخارجية.", tag: "جديد 🔥" },
        { url: "countries/jordan-work-abroad-2026.html", title: "🇯🇴 الأردن: الهجرة للخارج", desc: "فرص قطر، ألمانيا، وكندا برواتب بالدولار واليورو.", tag: "جديد 🔥" },
        { url: "countries/jordan-third-category-jobs-2026.html", title: "🇯🇴 الأردن: وظائف الفئة الثالثة", desc: "دليل التقديم عبر طسويق لحملة التوجيهي والرواتب والشروط.", tag: "جديد 🔥" },
        { url: "countries/usa-work-visa-h1b-2026.html", title: "🇺🇸 أمريكا: فيزا H-1B", desc: "نظام الأجور الجديد، رسوم USCIS، ومسار الغرين كارد.", tag: "جديد 🔥" },
        { url: "countries/usa-visa-algerians-iraqis-saudis-2026.html", title: "🇺🇸 أمريكا: للجزائريين والعراقيين والسعوديين", desc: "مواعيد السفارات، تأشيرات SIV، وكرت العائلة.", tag: "جديد 🔥" },
        { url: "countries/usa-visa-moroccans-2026.html", title: "🇺🇸 أمريكا: للمغاربة", desc: "الأوراق، رسوم 185 دولار، وقرعة DV.", tag: "جديد 🔥" },
        { url: "countries/norway-jobs-guide-2026.html", title: "🇳🇴 النرويج: النفط والسلمون", desc: "رواتب النفط والسلمون وتأشيرة UDI.", tag: "جديد" }
    ];

    const container = document.getElementById('countriesContainer');
    if (!container) return;

    // دالة إنشاء البطاقة النصية (سريعة جداً)
    function createCard(c) {
        const card = document.createElement('a');
        card.href = c.url;
        card.className = 'country-card';
        
        // نستخدم innerHTML لبناء البطاقة دفعة واحدة لسرعة الأداء
        card.innerHTML = `
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <span class="card-tag">${c.tag}</span>
        `;
        return card;
    }

    // عرض أول 7 بطاقات فقط في الصفحة الرئيسية
    container.innerHTML = '';
    featuredCountries.slice(0, 7).forEach(c => {
        container.appendChild(createCard(c));
    });

})();