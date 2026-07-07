import { Line, Rectangle, Svg, Text } from 'cx/svg';
import { LabelsTopLayout } from 'cx/ui';
import { NumberField } from 'cx/widgets';
import { Diagram } from 'cx-diagrams/Diagram';
import { Cell } from 'cx-diagrams/Cell';
import { Flow } from 'cx-diagrams/Flow';
import { Rotate } from 'cx-diagrams/Rotate';
import { Shape } from 'cx-diagrams/Shape';
import Controller from './Controller';

import { StraightLine } from 'cx-diagrams/StraightLine';
import { TwoSegmentLine } from 'cx-diagrams/TwoSegmentLine';
import { Md } from '../../../components/Md';
import { Split } from '../../../components/Split';
import { Pad } from '../../../components/Pad';
import { ConfigTable } from '../../../components/ConfigTable';
import config from '../../../config/Diagram';
import { ImportPath } from '../../../components/ImportPath';
import { CodeSnippet } from '../../../components/CodeSnippet';
import shape from '../shape';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                # Diagram 

                <ImportPath path='import { Diagram } from "cx-diagrams"' />

                The `Diagram` component is used to mark the area of the diagram and provide zooming and panning functions. It's required that all diagrams use
                 this component as a top-level parent element.

                
                </Md>
            </Pad>
         </Split>
         <Split>
            {/* prettier-ignore */}
            <CodeSnippet class="border-b border-t h-[400px] overflow-auto" >{`
            <Svg class="w-auto flex-grow bg-white">
                <Diagram
                    unitSize={32}
                    showGrid
                    zoom-bind="$page.view.zoom"
                    offsetX-bind="$page.view.offsetX"
                    offsetY-bind="$page.view.offsetY"
                    zoomStep-bind="$page.view.zoomStep"
                    minZoom-bind="$page.view.minZoom"
                    maxZoom-bind="$page.view.maxZoom"
                    center
                >
                    <Flow gap={1}>
                        <Cell width={2}>
                            <Shape stroke="red" fill="white" text="Red" />
                        </Cell>
                        <Cell width={2}>
                            <Shape stroke="blue" fill="white" text="Blue" />
                        </Cell>
                    </Flow>
                </Diagram>
            </Svg>
            <div
                class="absolute border bottom-14 left-2 bg-white text-[10px] uppercase p-1"
                text-tpl="Zoom: {$page.view.zoom:p;0} Center ({$page.view.offsetX:n;0},  {$page.view.offsetY:n;0})"
            />
            <div class="border-t bg-white px-2 flex justify-center">
                <LabelsTopLayout class="-mt-2">
                    <NumberField
                        value-bind="$page.view.zoomStep"
                        label="Zoom Step"
                        step={0.01}
                        minValue={0.01}
                        class="w-24"
                    />
                    <NumberField
                        value-bind="$page.view.minZoom"
                        label="Min Zoom"
                        step={0.05}
                        minValue={0.05}
                        class="w-24"
                    />
                    <NumberField
                        value-bind="$page.view.maxZoom"
                        label="Max Zoom"
                        step={0.5}
                        minValue={1}
                        class="w-24"
                    />
                </LabelsTopLayout>
            </div>
            `}</CodeSnippet>

            <div class="h-[500px] xl:h-full xl:border-t border-b relative flex flex-col" putInto="right">
               <Svg class="w-auto flex-grow bg-white">
                  <Diagram
                     unitSize={32}
                     showGrid
                     zoom-bind="$page.view.zoom"
                     offsetX-bind="$page.view.offsetX"
                     offsetY-bind="$page.view.offsetY"
                     zoomStep-bind="$page.view.zoomStep"
                     minZoom-bind="$page.view.minZoom"
                     maxZoom-bind="$page.view.maxZoom"
                     center
                  >
                     <Flow gap={1}>
                        <Cell width={2}>
                           <Shape stroke="red" fill="white" text="Red" />
                        </Cell>
                        <Cell width={2}>
                           <Shape stroke="blue" fill="white" text="Blue" />
                        </Cell>
                     </Flow>
                  </Diagram>
               </Svg>
               <div
                  class="absolute border bottom-14 left-2 bg-white text-[10px] uppercase p-1"
                  text-tpl="Zoom: {$page.view.zoom:p;0} Center ({$page.view.offsetX:n;0},  {$page.view.offsetY:n;0})"
               />
               <div class="border-t bg-white px-2 flex justify-center">
                  <LabelsTopLayout class="-mt-2">
                     <NumberField
                        value-bind="$page.view.zoomStep"
                        label="Zoom Step"
                        step={0.01}
                        minValue={0.01}
                        class="w-24"
                     />
                     <NumberField
                        value-bind="$page.view.minZoom"
                        label="Min Zoom"
                        step={0.05}
                        minValue={0.05}
                        class="w-24"
                     />
                     <NumberField
                        value-bind="$page.view.maxZoom"
                        label="Max Zoom"
                        step={0.5}
                        minValue={1}
                        class="w-24"
                     />
                  </LabelsTopLayout>
               </div>
            </div>
         </Split>
         <Split>
            <Pad className="pb-0">
               <Md>## Configuration</Md>
            </Pad>
            <ConfigTable props={config} />
         </Split>
      </div>
   </cx>
);
