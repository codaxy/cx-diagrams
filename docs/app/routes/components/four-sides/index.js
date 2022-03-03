import { Rectangle, Svg, Text } from 'cx/svg';
import { computable } from 'cx/ui';
import { Label, Radio } from 'cx/widgets';
import { FourSides } from '../../../../../packages/cx-diagrams/src/FourSides';
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
import config from '../../../config/FourSides';
import Controller from './Controller';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                    # FourSides 

                    <ImportPath path='import { FourSides } from "cx-diagrams"' />
                    
                    The `FourSides` component is used to lay out diagram components into four directions. This is commonly used in combination with [`Rotate`](~/components/rotate) 
                    to assemble the parts into a single structure.
                    
                </Md>
            </Pad>
         </Split>
         <Split>
            <div class="border-t border-b h-[400px] bg-white xl:h-full relative" putInto="right">
               <Svg class="w-auto h-full">
                  <Diagram center showGrid>
                     <FourSides
                        slots={computable('$page.order', (order) => {
                           switch (order) {
                              case 0:
                                 return ['center', 'right', 'down', 'left', 'up'];
                              case 1:
                                 return ['center', 'down', 'left', 'up', 'right'];
                              case 2:
                                 return ['center', 'left', 'up', 'right', 'down'];
                              case 3:
                                 return ['center', 'up', 'right', 'down', 'left'];
                           }
                        })}
                     >
                        <Cell width={2} height={2}>
                           <Shape text="center" fill="lightgreen" />
                        </Cell>
                        <Flow gap={0.5} p={0.5} align="center">
                           <Rectangle stroke="red" />
                           <Cell>
                              <Shape fill="lightgray" text="1" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="2" />
                           </Cell>
                           <Cell w={2} h={2}>
                              <Shape fill="lightgray" text="3" />
                           </Cell>
                        </Flow>
                        <Flow direction="down" gap={0.5} p={0.5} align="center">
                           <Rectangle stroke="red" />
                           <Cell>
                              <Shape fill="lightgray" text="1" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="2" />
                           </Cell>
                           <Cell w={2} h={2}>
                              <Shape fill="lightgray" text="3" />
                           </Cell>
                        </Flow>

                        <Flow direction="left" gap={0.5} p={0.5} align="center">
                           <Rectangle stroke="red" />
                           <Cell>
                              <Shape fill="lightgray" text="1" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="2" />
                           </Cell>
                           <Cell w={2} h={2}>
                              <Shape fill="lightgray" text="3" />
                           </Cell>
                        </Flow>

                        <Flow direction="up" gap={0.5} p={0.5} align="center">
                           <Rectangle stroke="red" />
                           <Cell>
                              <Shape fill="lightgray" text="1" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="2" />
                           </Cell>
                           <Cell w={2} h={2}>
                              <Shape fill="lightgray" text="3" />
                           </Cell>
                        </Flow>
                     </FourSides>
                  </Diagram>
               </Svg>
               <div class="absolute bottom-2 left-2 border px-2 bg-white shadow-sm space-x-2">
                  <Label>Setup: </Label>
                  <Radio value-bind="$page.order" option={0}>
                     1
                  </Radio>
                  <Radio value-bind="$page.order" option={1}>
                     2
                  </Radio>
                  <Radio value-bind="$page.order" option={2}>
                     3
                  </Radio>
                  <Radio value-bind="$page.order" option={3}>
                     4
                  </Radio>
               </div>
            </div>

            {/* prettier-ignore */}
            <CodeSnippet class="border-t border-b py-4 h-[500px] overflow-auto">{`
               <Svg class="w-auto h-full">
                  <Diagram center showGrid>
                     <FourSides
                        slots={computable('$page.order', (order) => {
                           switch (order) {
                              case 0:
                                 return ['center', 'right', 'down', 'left', 'up'];
                              case 1:
                                 return ['center', 'down', 'left', 'up', 'right'];
                              case 2:
                                 return ['center', 'left', 'up', 'right', 'down'];
                              case 3:
                                 return ['center', 'up', 'right', 'down', 'left'];
                           }
                        })}
                     >
                        <Cell width={2} height={2}>
                           <Shape text="center" fill="lightgreen" />
                        </Cell>
                        <Flow gap={0.5} p={0.5} align="center">
                           <Rectangle stroke="red" />
                           <Cell>
                              <Shape fill="lightgray" text="1" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="2" />
                           </Cell>
                           <Cell w={2} h={2}>
                              <Shape fill="lightgray" text="3" />
                           </Cell>
                        </Flow>
                        <Flow direction="down" gap={0.5} p={0.5} align="center">
                           <Rectangle stroke="red" />
                           <Cell>
                              <Shape fill="lightgray" text="1" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="2" />
                           </Cell>
                           <Cell w={2} h={2}>
                              <Shape fill="lightgray" text="3" />
                           </Cell>
                        </Flow>

                        <Flow direction="left" gap={0.5} p={0.5} align="center">
                           <Rectangle stroke="red" />
                           <Cell>
                              <Shape fill="lightgray" text="1" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="2" />
                           </Cell>
                           <Cell w={2} h={2}>
                              <Shape fill="lightgray" text="3" />
                           </Cell>
                        </Flow>

                        <Flow direction="up" gap={0.5} p={0.5} align="center">
                           <Rectangle stroke="red" />
                           <Cell>
                              <Shape fill="lightgray" text="1" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="2" />
                           </Cell>
                           <Cell w={2} h={2}>
                              <Shape fill="lightgray" text="3" />
                           </Cell>
                        </Flow>
                     </FourSides>
                  </Diagram>
               </Svg>
               <div class="absolute bottom-2 left-2 border px-2 bg-white shadow-sm space-x-2">
                  <Label>Setup: </Label>
                  <Radio value-bind="$page.order" option={0}>
                     1
                  </Radio>
                  <Radio value-bind="$page.order" option={1}>
                     2
                  </Radio>
                  <Radio value-bind="$page.order" option={2}>
                     3
                  </Radio>
                  <Radio value-bind="$page.order" option={3}>
                     4
                  </Radio>
               </div>
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
