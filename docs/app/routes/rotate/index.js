import { Rectangle, Svg, Text } from 'cx/svg';
import { Slider } from 'cx/widgets';
import { Cell } from '../../../../packages/cx-diagrams/src/Cell';
import { Diagram } from '../../../../packages/cx-diagrams/src/Diagram';
import { Flow } from '../../../../packages/cx-diagrams/src/Flow';
import { Rotate } from '../../../../packages/cx-diagrams/src/Rotate';
import { Shape } from '../../../../packages/cx-diagrams/src/Shape';
import { StraightLine } from '../../../../packages/cx-diagrams/src/StraightLine';
import { CodeSnippet } from '../../components/CodeSnippet';
import { ConfigTable } from '../../components/ConfigTable';
import { ImportPath } from '../../components/ImportPath';
import { Md } from '../../components/Md';
import { Pad } from '../../components/Pad';
import { Split } from '../../components/Split';
import config from '../../config/Rotate';
import Controller from './Controller';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                    # Rotate 

                    <ImportPath path='import { Flow } from "cx-diagrams"' />
                    
                    The `Rotate` component is commonly used with network diagrams to lay out repeatitive parts in different direction.
                    
                </Md>
            </Pad>
         </Split>
         <Split>
            <div class="flex flex-col h-full min-h-[300px] xl:min-h-0" putInto="right">
               <Svg class="w-auto h-auto flex-grow border-t border-b bg-white  ">
                  <Diagram center>
                     <Rotate turns-bind="$page.rotate">
                        <Flow gap={1} p={1} align="center">
                           <Rectangle stroke="red" />

                           <Cell>
                              <Shape fill="lightgray" text="1" id="1" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="2" id="2" />
                           </Cell>
                           <Cell>
                              <Shape fill="lightgray" text="3" id="3" />
                           </Cell>
                           <Flow direction="down" gap={1}>
                              <Cell>
                                 <Shape fill="lightgray" text="4" id="4" />
                              </Cell>
                              <Cell>
                                 <Shape fill="lightgray" text="5" id="5" />
                              </Cell>
                              <Cell>
                                 <Shape fill="lightgray" text="6" id="6" />
                              </Cell>
                           </Flow>
                           <StraightLine from="1" to="2" stroke="black" />
                           <StraightLine from="2" to="3" stroke="black" />
                           <StraightLine from="3" to="4" stroke="black" />
                           <StraightLine from="3" to="5" stroke="black" />
                           <StraightLine from="3" to="6" stroke="black" />
                        </Flow>
                     </Rotate>
                  </Diagram>
               </Svg>
               <div class="absolute left-2 bottom-2">
                  <Slider
                     value-bind="$page.rotate"
                     increment={1}
                     minValue={0}
                     maxValue={4}
                     step={1}
                     help-tpl="{$page.rotate} turn(s)"
                  />
               </div>
            </div>

            {/* prettier-ignore */}
            <CodeSnippet class="border-t border-b py-4 max-h-[500px] overflow-auto">{`
                <Diagram center>
                    <Rotate turns-bind="$page.rotate">
                        <Flow gap={1} p={0.5} align="center">
                            <Rectangle stroke="red" />
                            <Cell>
                                <Shape fill="lightgray" text="1" id="1" />
                            </Cell>
                            <Cell>
                                <Shape fill="lightgray" text="2" id="2" />
                            </Cell>
                            <Cell>
                                <Shape fill="lightgray" text="3" id="3" />
                            </Cell>
                            <Flow direction="down" gap={1}>
                                <Cell>
                                    <Shape fill="lightgray" text="4" id="4" />
                                </Cell>
                                <Cell>
                                    <Shape fill="lightgray" text="5" id="5" />
                                </Cell>
                                <Cell>
                                    <Shape fill="lightgray" text="6" id="6" />
                                </Cell>
                            </Flow>
                            <StraightLine from="1" to="2" stroke="black" />
                            <StraightLine from="2" to="3" stroke="black" />
                            <StraightLine from="3" to="4" stroke="black" />
                            <StraightLine from="3" to="5" stroke="black" />
                            <StraightLine from="3" to="6" stroke="black" />
                        </Flow>
                    </Rotate>
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
