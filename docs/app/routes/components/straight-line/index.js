import { Svg } from 'cx/svg';
import { Cell } from '../../../../../packages/cx-diagrams/src/Cell';
import { Diagram } from '../../../../../packages/cx-diagrams/src/Diagram';
import { Flow } from '../../../../../packages/cx-diagrams/src/Flow';
import { Shape } from '../../../../../packages/cx-diagrams/src/Shape';
import { StraightLine } from '../../../../../packages/cx-diagrams/src/StraightLine';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { ConfigTable } from '../../../components/ConfigTable';
import { ImportPath } from '../../../components/ImportPath';
import { Md } from '../../../components/Md';
import { Pad } from '../../../components/Pad';
import { Split } from '../../../components/Split';
import config from '../../../config/StraightLine';
import Controller from './Controller';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                    # StraightLine 

                    <ImportPath path='import { StraightLine } from "cx-diagrams"' />
                    
                    The `StraightLine` component is used to connect shapes with straight lines. 
                    Lines are drawn from shapes edges which allows simple placing of markers.
                </Md>
            </Pad>
         </Split>
         <Split>
            <Svg class="w-auto h-full border-t border-b bg-white min-h-[300px] xl:min-h-0" putInto="right">
               <Diagram unitSize={64} center showGrid>
                  <Flow gap={1} align="center">
                     <Cell>
                        <Shape fill="lightgray" text="1" id="1" />
                     </Cell>
                     <Flow direction="down" gap={1}>
                        <Cell>
                           <Shape fill="lightgray" text="2" id="2" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="3" id="3" shape="rhombus" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="4" id="4" />
                        </Cell>
                     </Flow>
                     <Flow direction="down" gap={1}>
                        <Cell>
                           <Shape fill="lightgray" text="5" id="5" shape="circle" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="6" id="6" shape="circle" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="7" id="7" shape="circle" />
                        </Cell>
                     </Flow>
                     <Cell>
                        <Shape fill="lightgray" text="8" id="8" />
                     </Cell>
                     <StraightLine from="1" to="2" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="1" to="3" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="1" to="4" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="2" to="6" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="3" to="5" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="4" to="7" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="5" to="8" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="6" to="8" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="7" to="8" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                  </Flow>
               </Diagram>
            </Svg>

            {/* prettier-ignore */}
            <CodeSnippet class="border-t border-b py-4 max-h-[500px] overflow-auto">{`
               <Diagram unitSize={64} center showGrid>
                  <Flow gap={1} align="center">
                     <Cell>
                        <Shape fill="lightgray" text="1" id="1" />
                     </Cell>
                     <Flow direction="down" gap={1}>
                        <Cell>
                           <Shape fill="lightgray" text="2" id="2" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="3" id="3" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="4" id="4" />
                        </Cell>
                     </Flow>
                     <Flow direction="down" gap={1}>
                        <Cell>
                           <Shape fill="lightgray" text="5" id="5" shape="circle" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="6" id="6" shape="circle" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="7" id="7" shape="circle" />
                        </Cell>
                     </Flow>
                     <Cell>
                        <Shape fill="lightgray" text="8" id="8" shape="circle" />
                     </Cell>
                     <StraightLine from="1" to="2" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="1" to="3" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="1" to="4" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="2" to="6" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="3" to="5" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="4" to="7" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="5" to="8" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="6" to="8" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                     <StraightLine from="7" to="8" stroke="black">
                        <Shape anchors="0 0 0 0" margin={-3} shape="circle" fill="white" stroke="blue" />
                        <Shape anchors="1 1 1 1" margin={-3} shape="circle" fill="white" stroke="blue" />
                     </StraightLine>
                  </Flow>
               </Diagram>
            `}</CodeSnippet>
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
