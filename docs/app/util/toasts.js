let impl = null;

//This crazines is added to minimize initial JavaScript bundle size.
//Toasts, message boxes, are loaded after the content is shown.
//check overlays/index.js for implementation.

export function showErrorToast(err, title) {
   if (impl) impl.showErrorToast(err, title);
   else console.error(title, err);
}

export function showInfoToast(content) {
   if (impl) impl.showInfoToast(content);
   else console.log(content);
}

export function registerToastImplementation(im) {
   impl = im;
}
