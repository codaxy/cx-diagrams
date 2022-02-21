export function urlEncode(params) {
   return Object.keys(params)
      .filter((k) => params[k] != null)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
}
