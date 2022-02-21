import { Route } from 'cx/widgets';
import SignIn from './sign-in';
import PasswordRecovery from './password-recovery';

export default (
   <cx>
      <Route route="+/sign-in" url-bind="url">
         <SignIn />
      </Route>
      <Route route="+/password-recovery" url-bind="url">
         <PasswordRecovery />
      </Route>
   </cx>
);
