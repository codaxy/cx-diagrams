import { Route } from 'cx/widgets';
import { SandboxedRoute } from '../../components/SandboxedRoute';
import Profile from './profile';

export default (
   <cx>
      <Route route="~/user" url-bind="url" prefix>
         <SandboxedRoute route="~/user/profile">
            <Profile />
         </SandboxedRoute>
      </Route>
   </cx>
);
