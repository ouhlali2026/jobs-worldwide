// تفعيل القائمة للجوال (للإصدارات القادمة)
console.log('مرحباً بكم في موقع وظائف حول العالم');

// بيانات الدول (مؤقتة)
const countries = [
    { name: 'الإمارات', page: 'uae.html' },
    { name: 'السعودية', page: '#' },
    { name: 'قطر', page: '#' },
    { name: 'الكويت', page: '#' },
    { name: 'بريطانيا', page: '#' },
    { name: 'أمريكا', page: '#' },
    { name: 'كندا', page: '#' },
    { name: 'ألمانيا', page: '#' },
    { name: 'فرنسا', page: '#' },
    { name: 'أستراليا', page: '#' }
];

// وظيفة البحث (للتطبيق المستقبلي)
function searchJobs() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert('خاصية البحث قيد التطوير قريباً');
            }
        });
    }
}

// تشغيل الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    searchJobs();
    
    // رسالة ترحيب
    console.log('تم تحميل الموقع بنجاح ✅');
});
