(async function() {
    const key = 'jobs-worldwide-2026';
    const pageUrl = window.location.href;
    const today = new Date().toISOString().slice(0,10);
    const alreadySent = localStorage.getItem(`indexnow_${pageUrl}_${today}`);
    if (alreadySent) return;
    try {
        await fetch('https://api.indexnow.org/IndexNow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                host: 'jobs-worldwide.for-us.workers.dev',
                key: key,
                keyLocation: `https://jobs-worldwide.for-us.workers.dev/${key}.txt`,
                urlList: [pageUrl]
            })
        });
        localStorage.setItem(`indexnow_${pageUrl}_${today}`, 'sent');
        console.log('✅ IndexNow notified for:', pageUrl);
    } catch(e) {
        console.error('❌ IndexNow error:', e);
    }
})();