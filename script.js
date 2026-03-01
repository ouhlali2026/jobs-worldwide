// تفعيل القائمة للجوال
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // وظيفة البحث البسيطة
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (searchInput && searchInput.value.trim() !== '') {
                alert(`جاري البحث عن وظائف في: ${searchInput.value}`);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                alert(`جاري البحث عن وظائف في: ${this.value}`);
            }
        });
    }
});
