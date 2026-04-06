// قائمة الجوال
document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.width = '100%';
                navLinks.style.padding = '20px 0';
            }
        });
    }

    // إعادة تعيين العرض عند تغيير حجم الشاشة
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navLinks) navLinks.style.display = 'flex';
        } else {
            if (navLinks && !mobileBtn?.click) navLinks.style.display = 'none';
        }
    });
});

// وظيفة بحث بسيطة (اختيارية)
function filterCountries() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const filter = input.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.country-card');
    let visible = 0;
    cards.forEach(card => {
        const name = card.querySelector('.country-name')?.innerText.toLowerCase() || '';
        if (name.includes(filter)) {
            card.style.display = 'flex';
            visible++;
        } else {
            card.style.display = 'none';
        }
    });
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}