import { Sandbox, Route } from 'cx/widgets';

/**
 * SandboxedRoute adds a Sandbox within the route for the page to have private data - $page.
 * See https://docs.cxjs.io/concepts/data-views#sandbox
 */

export const SandboxedRoute = ({ route, children, prefix }) => (
   <cx>
      <Route route={route} url-bind="url" prefix={prefix}>
         <Sandbox key-bind="url" storage-bind="pages">
            {children}
         </Sandbox>
      </Route>
   </cx>
);
