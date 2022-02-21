import { SandboxedRoute } from '../../components/SandboxedRoute';
import List from './list';
import Single from './single';

export default (
   <cx>
      <SandboxedRoute route="~/invoices">
         <List />
      </SandboxedRoute>
      <SandboxedRoute route="~/invoices/:id">
         <Single />
      </SandboxedRoute>
   </cx>
);
