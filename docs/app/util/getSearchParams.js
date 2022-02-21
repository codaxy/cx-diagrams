export function getSearchParams(url) {
   var index = url.indexOf('?');
   if (index > 0) url = url.substring(index);
   return new URLSearchParams(url);
}
