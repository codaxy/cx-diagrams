import { Line, Rectangle, Svg, Text } from 'cx/svg';
import { Diagram } from '../../../../../packages/cx-diagrams/src/Diagram';
import { Cell } from '../../../../../packages/cx-diagrams/src/Cell';
import { Flow } from '../../../../../packages/cx-diagrams/src/Flow';
import { Rotate } from '../../../../../packages/cx-diagrams/src/Rotate';
import { Shape } from '../../../../../packages/cx-diagrams/src/Shape';
import Controller from './Controller';

import { StraightLine } from '../../../../../packages/cx-diagrams/src/StraightLine';
import { TwoSegmentLine } from '../../../../../packages/cx-diagrams/src/TwoSegmentLine';
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
                <Svg class="w-auto h-[400px] border bg-white">
                  <Diagram unitSize={32} showGrid>
                     <Rotate turns={0}>
                        <Flow gap={0.5} direction="right" align="center">
                           <Flow gap={0.5} direction="down">
                              <Rectangle fill="rgba(255, 255, 255, 0.5)" stroke="gray" margin={-10} />
                              <Cell width={2} ml={1}>
                                 <Shape
                                    id="item1"
                                    text="Item1"
                                    fill="yellow"
                                    shape="circle"
                                    stroke="red"
                                    margin={-10}
                                 />
                              </Cell>
                           </Flow>

                           <Flow gap={3} direction="down" padding={0.5} align="center">
                              <Rectangle fill="rgba(255, 255, 255, 0.5)" stroke="gray" />
                              <Cell width={2}>
                                 <Shape id="item2" text="Item2" fill="yellow" stroke="red" />
                              </Cell>
                              <Cell>
                                 <Rectangle fill="red" />
                              </Cell>
                           </Flow>

                           <Flow gap={0.5} direction="down">
                              <Cell width={2}>
                                 <Shape id="item3" text="Item3" fill="yellow" stroke="red" />
                              </Cell>
                              <Cell width={2}>
                                 <Shape id="item4" text="Item4" fill="yellow" stroke="red" />
                              </Cell>
                           </Flow>
                        </Flow>

                        <StraightLine from="item1" to="item2" stroke="red" />
                        <TwoSegmentLine from="item2" to="item3" stroke="red">
                           <Shape anchors="0 0 0 0" margin={-5} stroke="black" shape="circle" />
                        </TwoSegmentLine>
                     </Rotate>
                  </Diagram>
               </Svg>
            `}</CodeSnippet>

            <div class="h-[500px] xl:h-full xl:border-t border-b relative" putInto="right">
               <Svg class="w-auto h-full bg-white">
                  <Diagram
                     unitSize={32}
                     showGrid
                     zoom-bind="$page.view.zoom"
                     offsetX-bind="$page.view.offsetX"
                     offsetY-bind="$page.view.offsetY"
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
                  class="absolute border bottom-2 left-2 bg-white text-[10px] uppercase p-1"
                  text-tpl="Zoom: {$page.view.zoom:p;0} Center ({$page.view.offsetX:n;0},  {$page.view.offsetY:n;0})"
               ></div>
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
