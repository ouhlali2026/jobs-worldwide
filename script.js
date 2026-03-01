// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== تفعيل خاصية البحث =====
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchInput) {
        
        function handleSearch() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== '') {
                alert(`جاري البحث عن وظائف في: ${searchTerm}\nهذه الخاصية قيد التطوير حالياً`);
            } else {
                alert('الرجاء إدخال كلمة للبحث');
            }
        }
        
        searchBtn.addEventListener('click', handleSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // ===== تأثيرات بسيطة للبطاقات =====
    const cards = document.querySelectorAll('.country-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== رسالة ترحيب في الكونسول (للمطورين) =====
    console.log('✅ موقع وظائف على مستوى العالم جاهز');
    console.log('📅 الإصدار: 1.0.0');
});
