import { History } from 'cx/ui';
import { MsgBox } from 'cx/widgets';
import { showInfoToast } from '../../../util/toasts';

export default {
   async onSubmit(e, { store }) {
      e.preventDefault();
      let { invalid, email } = store.getData();
      console.log(store.getData());
      if (invalid) {
         store.set('visited', true);
         return;
      }

      try {
         //let data = await POST("account/password-recovery", { email })
         //TODO: Display a toast
         showInfoToast(`Instructions for password recovery sent to ${email}.`);
         History.pushState({}, null, '~/pages/sign-in');
      } catch (err) {
         console.error(err);
      }
   },
};
