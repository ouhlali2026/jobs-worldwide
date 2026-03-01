document.addEventListener('DOMContentLoaded', function() {
    
    // تفعيل البحث
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchInput) {
        
        function handleSearch() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== '') {
                alert('خاصية البحث قيد التطوير');
            }
        }
        
        searchBtn.addEventListener('click', handleSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    console.log('✅ الموقع جاهز');
});
