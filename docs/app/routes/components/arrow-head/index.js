import { Svg } from 'cx/svg';
import { Cell } from '../../../../../packages/cx-diagrams/src/Cell';
import { Diagram } from '../../../../../packages/cx-diagrams/src/Diagram';
import { Flow } from '../../../../../packages/cx-diagrams/src/Flow';
import { Shape } from '../../../../../packages/cx-diagrams/src/Shape';
import Controller from './Controller';

import { ArrowHead } from '../../../../../packages/cx-diagrams/src/ArrowHead';
import { StraightLine } from '../../../../../packages/cx-diagrams/src/StraightLine';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { ConfigTable } from '../../../components/ConfigTable';
import { ImportPath } from '../../../components/ImportPath';
import { Md } from '../../../components/Md';
import { Pad } from '../../../components/Pad';
import { Split } from '../../../components/Split';
import config from '../../../config/ArrowHead';
import { ThreeSegmentLine } from '../../../../../packages/cx-diagrams/src/ThreeSegmentLine';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                # ArrowHead 

                <ImportPath path='import { ArrowHead } from "cx-diagrams"' />
               The Arrow Head component is a child element for StraightLine, TwoSegmentLine, and ThreeSegmentLine components, adding arrow heads to line ends for visual directionality cues.
                </Md>
            </Pad>
         </Split>
         <Split>
            {/* prettier-ignore */}
            <CodeSnippet class="border-b border-t h-[400px] overflow-auto" >{`
               <Svg class="w-auto h-full bg-white">
                  <Diagram unitSize={32} showGrid center>
                     <Flow direction="down">
                        <Flow direction="down" gap={4}>
                           <Flow gap={5}>
                              <Cell width={3}>
                                 <Shape id="scm" text="SCM" shapeClass="fill-green-300 stroke-green-800" />
                              </Cell>
                              <Cell width={3}>
                                 <Shape id="ghw" shapeClass="fill-green-300 stroke-green-800" text="GIT Webhook" />
                              </Cell>
                           </Flow>
                           <Flow gap={2}>
                              <Cell width={3}>
                                 <Shape id="docker" text="Docker Build" shapeClass="fill-green-300 stroke-green-800" />
                              </Cell>
                              <Cell width={3}>
                                 <Shape id="publish" text="Publish Image" shapeClass="fill-red-300 stroke-red-800" />
                              </Cell>
                              <Cell width={3}>
                                 <Shape id="run" text="Run app" shapeClass="stroke-red-800" />
                              </Cell>
                           </Flow>
                        </Flow>
                     </Flow>

                     <StraightLine from="scm" to="ghw" stroke="black">
                        <ArrowHead position="end" fill="black" size={8} />
                     </StraightLine>
                     <ThreeSegmentLine direction="down" from="ghw" to="docker" stroke="black">
                        <ArrowHead position="end" fill="black" size={8} />
                     </ThreeSegmentLine>
                     <StraightLine from="docker" to="publish" stroke="black">
                        <ArrowHead type="opened" position="end" stroke="black" size={10} />
                     </StraightLine>
                     <StraightLine from="publish" to="run" stroke="black" />
                  </Diagram>
               </Svg>
            `}</CodeSnippet>

            <div class="h-[500px] xl:h-full xl:border-t border-b relative" putInto="right">
               <Svg class="w-auto h-full bg-white">
                  <Diagram unitSize={32} showGrid center>
                     <Flow direction="down">
                        <Flow direction="down" gap={4}>
                           <Flow gap={5}>
                              <Cell width={3}>
                                 <Shape id="scm" text="SCM" shapeClass="fill-green-300 stroke-green-800" />
                              </Cell>
                              <Cell width={3}>
                                 <Shape id="ghw" shapeClass="fill-green-300 stroke-green-800" text="GIT Webhook" />
                              </Cell>
                           </Flow>
                           <Flow gap={2}>
                              <Cell width={3}>
                                 <Shape id="docker" text="Docker Build" shapeClass="fill-green-300 stroke-green-800" />
                              </Cell>
                              <Cell width={3}>
                                 <Shape id="publish" text="Publish Image" shapeClass="fill-red-300 stroke-red-800" />
                              </Cell>
                              <Cell width={3}>
                                 <Shape id="run" text="Run app" shapeClass="stroke-red-800" />
                              </Cell>
                           </Flow>
                        </Flow>
                     </Flow>

                     <StraightLine from="scm" to="ghw" stroke="black">
                        <ArrowHead position="end" fill="black" size={7} />
                     </StraightLine>
                     <ThreeSegmentLine direction="down" from="ghw" to="docker" stroke="black">
                        <ArrowHead position="end" fill="black" size={7} />
                     </ThreeSegmentLine>
                     <StraightLine from="docker" to="publish" stroke="black">
                        <ArrowHead type="opened" position="end" stroke="black" size={7} />
                     </StraightLine>
                     <StraightLine from="publish" to="run" stroke="black" />
                  </Diagram>
               </Svg>
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
