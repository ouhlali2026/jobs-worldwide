// ========== قائمة الجوال ==========
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navLinks');
    
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // ========== وظيفة البحث عن الدول (اختياري) ==========
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const filter = this.value.trim().toLowerCase();
            const cards = document.querySelectorAll('.country-card');
            let visibleCount = 0;
            
            cards.forEach(card => {
                const countryName = card.querySelector('.country-name')?.innerText.toLowerCase() || '';
                if (countryName.includes(filter) || filter === '') {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            const noResults = document.getElementById('noResults');
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    }
});