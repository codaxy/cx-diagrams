export function checkSignedIn(store) {
   if (store.get('user')) return true;

   store.set('signin.visible', true);
   return false;
}
