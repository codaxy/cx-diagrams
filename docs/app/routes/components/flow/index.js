import { Rectangle, Svg, Text } from 'cx/svg';
import { Cell } from '../../../../../packages/cx-diagrams/src/Cell';
import { Diagram } from '../../../../../packages/cx-diagrams/src/Diagram';
import { Flow } from '../../../../../packages/cx-diagrams/src/Flow';
import { Shape } from '../../../../../packages/cx-diagrams/src/Shape';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { ConfigTable } from '../../../components/ConfigTable';
import { ImportPath } from '../../../components/ImportPath';
import { Md } from '../../../components/Md';
import { Pad } from '../../../components/Pad';
import { Split } from '../../../components/Split';
import config from '../../../config/Flow';
import Controller from './Controller';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                    # Flow 

                    <ImportPath path='import { Flow } from "cx-diagrams"' />
                    
                    The `Flow` component is used to arrange cells into directional layouts 
                    called flow. The direction of the flow is controlled by the `direction` property. 
                    Distance between elements is controlled by the assigned `gap`, or by individual margins set on the cell components.
                    Besides fixed margins (`mt`, `mr`, `mb` and `ml`), you can use start (`ms`) and end margins (`me`) to distance elements 
                    in the direction of the flow which will work nicely if you introduce rotation.

                    > Please note the SVG elements such as `Rectangle` do not affect the flow. Only `Cell` elements affect the flow.
                    
                </Md>
            </Pad>
         </Split>
         <Split>
            <Svg class="w-auto h-full border-t border-b bg-white min-h-[300px] xl:min-h-0" putInto="right">
               <Diagram center showGrid>
                  <Flow direction="right" gap={1} align="center">
                     <Flow gap={0.5} p={0.5}>
                        <Rectangle stroke="red">
                           <Text anchors={0} dy="-5px" value="right" fill="currentColor" style="font-size: 12px" />
                        </Rectangle>
                        <Cell>
                           <Shape fill="lightgray" text="1" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="2" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="3" />
                        </Cell>
                     </Flow>
                     <Flow direction="down" gap={0.5} p={0.5}>
                        <Rectangle stroke="red">
                           <Text anchors={0} dy="-5px" value="down" fill="currentColor" style="font-size: 12px" />
                        </Rectangle>
                        <Cell>
                           <Shape fill="lightgray" text="1" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="2" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="3" />
                        </Cell>
                     </Flow>

                     <Flow direction="left" gap={0.5} p={0.5}>
                        <Rectangle stroke="red">
                           <Text anchors={0} dy="-5px" value="left" fill="currentColor" style="font-size: 12px" />
                        </Rectangle>
                        <Cell>
                           <Shape fill="lightgray" text="1" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="2" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="3" />
                        </Cell>
                     </Flow>

                     <Flow direction="up" gap={0.5} p={0.5}>
                        <Rectangle stroke="red">
                           <Text anchors={0} dy="-5px" value="up" fill="currentColor" style="font-size: 12px" />
                        </Rectangle>
                        <Cell>
                           <Shape fill="lightgray" text="1" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="2" />
                        </Cell>
                        <Cell>
                           <Shape fill="lightgray" text="3" />
                        </Cell>
                     </Flow>
                  </Flow>
               </Diagram>
            </Svg>

            {/* prettier-ignore */}
            <CodeSnippet class="border-t border-b py-4 max-h-[500px] overflow-auto">{`
            <Diagram center showGrid>
                <Flow direction="right" gap={1} align="center">
                    <Flow gap={0.5} p={0.5}>
                        <Rectangle stroke="red">
                            <Text anchors={0} dy="-5px" value="right" fill="currentColor" style="font-size: 12px" />
                        </Rectangle>
                        <Cell>
                            <Shape fill="lightgray" text="1" />
                        </Cell>
                        <Cell>
                            <Shape fill="lightgray" text="2" />
                        </Cell>
                        <Cell>
                            <Shape fill="lightgray" text="3" />
                        </Cell>
                    </Flow>
                    <Flow direction="down" gap={0.5} p={0.5}>
                        <Rectangle stroke="red">
                            <Text anchors={0} dy="-5px" value="down" fill="currentColor" style="font-size: 12px" />
                        </Rectangle>
                        <Cell>
                            <Shape fill="lightgray" text="1" />
                        </Cell>
                        <Cell>
                            <Shape fill="lightgray" text="2" />
                        </Cell>
                        <Cell>
                            <Shape fill="lightgray" text="3" />
                        </Cell>
                    </Flow>

                    <Flow direction="left" gap={0.5} p={0.5}>
                        <Rectangle stroke="red">
                            <Text anchors={0} dy="-5px" value="left" fill="currentColor" style="font-size: 12px" />
                        </Rectangle>
                        <Cell>
                            <Shape fill="lightgray" text="1" />
                        </Cell>
                        <Cell>
                            <Shape fill="lightgray" text="2" />
                        </Cell>
                        <Cell>
                            <Shape fill="lightgray" text="3" />
                        </Cell>
                    </Flow>

                    <Flow direction="up" gap={0.5} p={0.5}>
                        <Rectangle stroke="red">
                            <Text anchors={0} dy="-5px" value="up" fill="currentColor" style="font-size: 12px" />
                        </Rectangle>
                        <Cell>
                            <Shape fill="lightgray" text="1" />
                        </Cell>
                        <Cell>
                            <Shape fill="lightgray" text="2" />
                        </Cell>
                        <Cell>
                            <Shape fill="lightgray" text="3" />
                        </Cell>
                    </Flow>
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
