import { ContentResolver, FirstVisibleChildLayout } from 'cx/ui';
import { DocumentTitle, PureContainer, RedirectRoute, Route } from 'cx/widgets';

import { CheckerLayout } from '../layout/CheckerLayout';

import { SandboxedRoute } from '../components/SandboxedRoute';

import { PageNotImplemented } from '../components/PageNotImplemented';
import Diagram from './components/diagram';
import Cell from './components/cell';
import Shape from './components/shape';
import Flow from './components/flow';
import Rotate from './components/rotate';
import StraightLine from './components/straight-line';
import TwoSegmentLine from './components/two-segment-line';
import ThreeSegmentLine from './components/three-segment-line';

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

               <SandboxedRoute route="~/components/rotate">
                  <Rotate />
               </SandboxedRoute>

               <SandboxedRoute route="~/components/straight-line">
                  <StraightLine />
               </SandboxedRoute>

               <SandboxedRoute route="~/components/two-segment-line">
                  <TwoSegmentLine />
               </SandboxedRoute>

               <SandboxedRoute route="~/components/three-segment-line">
                  <ThreeSegmentLine />
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
