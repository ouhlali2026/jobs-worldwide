export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // 1. إذا كان الرابط ينتهي بـ .html، قم بعرض الملف مباشرة
  // هذا يمنع Cloudflare من تحويل الرابط إلى نسخة بدون .html
  if (pathname.endsWith('.html')) {
    return context.env.ASSETS.fetch(context.request);
  }

  // 2. إذا كان الرابط لا ينتهي بامتداد (مثل /countries/canada)
  // قم بتحويله تلقائياً (301 Redirect) إلى النسخة التي تنتهي بـ .html
  const lastSegment = pathname.split('/').pop();
  if (lastSegment && !lastSegment.includes('.')) {
    url.pathname = pathname + '.html';
    return Response.redirect(url.toString(), 301);
  }

  // 3. بقية الملفات (صور، CSS، JS) تمر بشكل طبيعي
  return context.next();
}