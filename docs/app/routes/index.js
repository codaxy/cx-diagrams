import { ContentResolver, FirstVisibleChildLayout } from 'cx/ui';
import { DocumentTitle, PureContainer, RedirectRoute, Route } from 'cx/widgets';

import { CheckerLayout } from '../layout/CheckerLayout';

import { SandboxedRoute } from '../components/SandboxedRoute';

import { PageNotImplemented } from '../components/PageNotImplemented';
import About from './about';
import Diagram from './components/diagram';
import Cell from './components/cell';
import Shape from './components/shape';
import Flow from './components/flow';
import Rotate from './components/rotate';
import FourSides from './components/four-sides';
import StraightLine from './components/straight-line';
import TwoSegmentLine from './components/two-segment-line';
import ThreeSegmentLine from './components/three-segment-line';

import NetworkDiagram from './examples/network-diagram';
import NeuralNetwork from './examples/neural-network';

export default () => (
   <cx>
      <FirstVisibleChildLayout>
         <CheckerLayout>
            <FirstVisibleChildLayout>
               <SandboxedRoute route="~/">
                  <About />
               </SandboxedRoute>

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

               <SandboxedRoute route="~/components/four-sides">
                  <FourSides />
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

               <SandboxedRoute route="~/examples/network-diagram">
                  <NetworkDiagram />
               </SandboxedRoute>

               <SandboxedRoute route="~/examples/neural-network">
                  <NeuralNetwork />
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
