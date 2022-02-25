import { ContentResolver, FirstVisibleChildLayout } from 'cx/ui';
import { DocumentTitle, PureContainer, RedirectRoute, Route } from 'cx/widgets';

import { CheckerLayout } from '../layout/CheckerLayout';

import { SandboxedRoute } from '../components/SandboxedRoute';

import { PageNotImplemented } from '../components/PageNotImplemented';
import Diagram from './diagram';

export default () => (
   <cx>
      <FirstVisibleChildLayout>
         <RedirectRoute route="~/" redirect="~/components/diagram" url-bind="url" />

         <CheckerLayout>
            <FirstVisibleChildLayout>
               <SandboxedRoute route="~/components/diagram">
                  <Diagram />
               </SandboxedRoute>

               <PageNotImplemented />
            </FirstVisibleChildLayout>
         </CheckerLayout>
      </FirstVisibleChildLayout>

      <ContentResolver
         params={1}
         onResolve={() => import(/* webpackChunkName: "overlays" */ '../overlays').then((x) => x.default)}
      />
      <DocumentTitle append text="Demo App" separator=" | " />
   </cx>
);
