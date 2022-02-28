import { ContentResolver, FirstVisibleChildLayout } from 'cx/ui';
import { DocumentTitle, PureContainer, RedirectRoute, Route } from 'cx/widgets';

import { CheckerLayout } from '../layout/CheckerLayout';

import { SandboxedRoute } from '../components/SandboxedRoute';

import { PageNotImplemented } from '../components/PageNotImplemented';
import Diagram from './diagram';
import Cell from './cell';
import Shape from './shape';
import Flow from './flow';

export default () => (
   <cx>
      <FirstVisibleChildLayout>
         <RedirectRoute route="~/" redirect="~/components/diagram" url-bind="url" />

         <CheckerLayout>
            <FirstVisibleChildLayout>
               <SandboxedRoute route="~/components/diagram">
                  <Diagram />
               </SandboxedRoute>

               <SandboxedRoute route="~/components/cell">
                  <Cell />
               </SandboxedRoute>

               <SandboxedRoute route="~/components/shape">
                  <Shape />
               </SandboxedRoute>

               <SandboxedRoute route="~/components/flow">
                  <Flow />
               </SandboxedRoute>

               <PageNotImplemented />
            </FirstVisibleChildLayout>
         </CheckerLayout>
      </FirstVisibleChildLayout>

      <ContentResolver
         params={1}
         onResolve={() => import(/* webpackChunkName: "overlays" */ '../overlays').then((x) => x.default)}
      />
      <DocumentTitle append text="CxJS Diagrams" separator=" | " />
   </cx>
);
