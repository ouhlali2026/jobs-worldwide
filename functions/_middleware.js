export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // التحقق من وجود امتداد مثل .html أو .css أو .jpg
  const hasExtension = /\.\w+$/.test(path);
  // التحقق مما إذا كان الرابط ينتهي بـ /
  const isDirectory = path.endsWith('/');

  // إذا لم يكن هناك امتداد، ولم يكن مجلداً، ولم يكن الصفحة الرئيسية
  if (!hasExtension && !isDirectory && path !== '/') {
    // إضافة .html إلى الرابط وإعادة التوجيه الدائم
    url.pathname = path + '.html';
    return Response.redirect(url.toString(), 301);
  }

  // إذا كان الرابط صحيحاً، أكمل العمل بشكل طبيعي
  return context.next();
}