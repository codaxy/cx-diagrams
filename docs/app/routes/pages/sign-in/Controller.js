import { History } from 'cx/ui';
import { MsgBox } from 'cx/widgets';
import { showInfoToast } from '../../../util/toasts';

export default {
   async onSubmit(e, { store }) {
      e.preventDefault();
      let { invalid, email, password, rememberMe } = store.getData();
      console.log(store.getData());
      if (invalid) {
         store.set('visited', true);
         return;
      }

      try {
         //let data = await POST("account/sign-in", { username, password, rememberMe })
         //TODO: Display a toast
         showInfoToast('Logged in as test@example.com.');

         store.set('user', {
            firstName: 'Test',
            lastName: 'User',
            initials: 'TU',
            pictureUrl: 'https://source.unsplash.com/d-MfHM-jHwc/100x100/?face',
            email: 'test@example.com',
         });

         History.pushState({}, null, '~/dashboard');
      } catch (err) {
         console.error(err);
      }
   },
};
