import { Svg } from 'cx/svg';
import { expr, LabelsTopLayout } from 'cx/ui';
import { Repeater, Slider } from 'cx/widgets';
import { Cell } from '../../../../../packages/cx-diagrams/src/Cell';
import { Diagram } from '../../../../../packages/cx-diagrams/src/Diagram';
import { Flow } from '../../../../../packages/cx-diagrams/src/Flow';
import { Shape } from '../../../../../packages/cx-diagrams/src/Shape';
import { StraightLine } from '../../../../../packages/cx-diagrams/src/StraightLine';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { Md } from '../../../components/Md';
import { Pad } from '../../../components/Pad';
import { Split } from '../../../components/Split';
import Controller from './Controller';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                # Neural Network Example
                </Md>
            </Pad>
         </Split>
         <Split>
            <div class="h-[700px] xl:h-full xl:border-t border-b relative flex flex-col" putInto="right">
               <Svg class="w-auto flex-grow bg-white">
                  <Diagram unitSize={48} showGrid center>
                     <Flow gap={2} align="center">
                        <Repeater records-bind="$page.network.layers" recordAlias="$layer">
                           <Flow direction="down" gap={0.5}>
                              <Repeater records-bind="$layer.nodes">
                                 <Cell>
                                    <Shape
                                       text-bind="$record.name"
                                       id-bind="$record.id"
                                       shape="circle"
                                       class={{
                                          'fill-blue-200 stroke-blue-600': expr('{$layer.type} == "input"'),
                                          'fill-orange-200 stroke-orange-600': expr('{$layer.type} == "hidden"'),
                                          'fill-green-200 stroke-green-600': expr('{$layer.type} == "output"'),
                                       }}
                                    />
                                 </Cell>
                              </Repeater>
                           </Flow>
                        </Repeater>
                     </Flow>
                     <Repeater records-bind="$page.network.connections" recordAlias="$conn">
                        <StraightLine from-bind="$conn.from" to-bind="$conn.to" stroke="black" />
                     </Repeater>
                  </Diagram>
               </Svg>
               <div class="border-t bg-white px-2 flex justify-center">
                  <LabelsTopLayout class="-mt-2">
                     <Slider
                        value-bind="$page.options.inputs"
                        min={1}
                        max={5}
                        step={1}
                        label="Inputs"
                        class="w-32"
                        help-bind="$page.options.inputs"
                     />
                     <Slider
                        value-bind="$page.options.hiddenLayers"
                        min={1}
                        max={4}
                        step={1}
                        label="Hidden Layers"
                        class="w-32"
                        help-bind="$page.options.hiddenLayers"
                     />
                     <Slider
                        value-bind="$page.options.hiddenNodes"
                        min={1}
                        max={8}
                        step={1}
                        label="Hidden Layer Size"
                        class="w-32"
                        help-bind="$page.options.hiddenNodes"
                     />
                     <Slider
                        value-bind="$page.options.outputs"
                        min={1}
                        max={5}
                        step={1}
                        label="Outputs"
                        class="w-32"
                        help-bind="$page.options.outputs"
                     />
                  </LabelsTopLayout>
               </div>
            </div>
            {/* prettier-ignore */}
            <CodeSnippet class="border-b border-t h-[700px] overflow-auto">{`
            <Diagram unitSize={48} showGrid center>
                <Flow gap={2} align="center">
                    <Repeater records-bind="$page.network.layers" recordAlias="$layer">
                        <Flow direction="down" gap={0.5}>
                            <Repeater records-bind="$layer.nodes">
                                <Cell>
                                    <Shape
                                        text-bind="$record.name"
                                        id-bind="$record.id"
                                        shape="circle"
                                        class={{
                                            'fill-blue-200 stroke-blue-600': expr('{$layer.type} == "input"'),
                                            'fill-orange-200 stroke-orange-600': expr('{$layer.type} == "hidden"'),
                                            'fill-green-200 stroke-green-600': expr('{$layer.type} == "output"'),
                                        }}
                                    />
                                </Cell>
                            </Repeater>
                        </Flow>
                    </Repeater>
                </Flow>
                <Repeater records-bind="$page.network.connections" recordAlias="$conn">
                    <StraightLine from-bind="$conn.from" to-bind="$conn.to" stroke="black" />
                </Repeater>
            </Diagram>
            `}</CodeSnippet>
         </Split>
      </div>
   </cx>
);
