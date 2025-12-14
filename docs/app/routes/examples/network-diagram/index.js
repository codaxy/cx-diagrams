import { Cell, Diagram, Flow, FourSides, Rotate, Shape, StraightLine, ThreeSegmentLine } from 'cx-diagrams';
import { Rectangle, Svg, Text } from 'cx/svg';
import { ContentPlaceholder, PureContainer, Repeater } from 'cx/widgets';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { Image } from '../../../components/Image';
import { Md } from '../../../components/Md';
import { Pad } from '../../../components/Pad';
import { Split } from '../../../components/Split';
import Controller from './Controller';

import CloudUrl from './cloud.png';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                # Network Diagram Example 
                </Md>
            </Pad>
         </Split>
         <Split>
            <div class="h-[700px] xl:h-full xl:border-t border-b relative" putInto="right">
               <Svg class="w-auto h-full bg-white">
                  <Diagram unitSize={32} showGrid center>
                     <FourSides gap={-3}>
                        <Cell width={7} height={6}>
                           <Shape id="root" margin={50} />
                           <PureContainer putInto="cloud">
                              <Image href={CloudUrl} />
                              <Text value="Internet" class="fill-black" textAnchor="middle" dy="0.5em" />
                           </PureContainer>
                        </Cell>
                        <Repeater records-bind="$page.networks" recordAlias="$network">
                           <Rotate turns-bind="$index">
                              <Flow gap={1} align="center">
                                 <Flow direction="down" gap={1} p={0.5}>
                                    <Rectangle class="fill-gray-100" />
                                    <Repeater records-bind="$network.firewalls">
                                       <Cell width={2}>
                                          <Shape text-bind="$record.name" class="fill-blue-400" id-bind="$record.id" />
                                       </Cell>
                                       <StraightLine from-bind="$record.id" to="root" stroke="black" />
                                    </Repeater>
                                 </Flow>
                                 <Flow direction="down" gap={1} p={0.5}>
                                    <Rectangle class="fill-gray-100" />
                                    <Repeater records-bind="$network.switches">
                                       <Cell width={2}>
                                          <Shape text-bind="$record.name" class="fill-green-400" id-bind="$record.id" />
                                       </Cell>
                                    </Repeater>
                                 </Flow>
                                 <Flow direction="down" gap={1} p={0.5}>
                                    <Rectangle class="fill-gray-100" />
                                    <Repeater records-bind="$network.pcs">
                                       <Cell width={2}>
                                          <Shape
                                             text-bind="$record.name"
                                             class="fill-orange-400"
                                             id-bind="$record.id"
                                          />
                                       </Cell>
                                    </Repeater>
                                 </Flow>
                              </Flow>
                              <Repeater records-bind="$network.connections" recordAlias="$conn">
                                 <ThreeSegmentLine
                                    from-bind="$conn.from"
                                    to-bind="$conn.to"
                                    direction="right"
                                    class="stroke-black"
                                    stroke="black"
                                 />
                              </Repeater>
                           </Rotate>
                        </Repeater>
                     </FourSides>
                     <ContentPlaceholder name="cloud" />
                  </Diagram>
               </Svg>
            </div>
            {/* prettier-ignore */}
            <CodeSnippet class="border-b border-t h-[700px] overflow-auto">{`
               <Diagram unitSize={32} showGrid center>
                  <FourSides gap={-3}>
                     <Cell width={7} height={6}>
                        <Shape id="root" margin={50} />
                        <PureContainer putInto="cloud">
                           <Image href={CloudUrl} />
                           <Text value="Internet" class="fill-black" textAnchor="middle" dy="0.5em" />
                        </PureContainer>
                     </Cell>
                     <Repeater records-bind="$page.networks" recordAlias="$network">
                        <Rotate turns-bind="$index">
                           <Flow gap={1} align="center">
                              <Flow direction="down" gap={1} p={0.5}>
                                 <Rectangle class="fill-gray-100" />
                                 <Repeater records-bind="$network.firewalls">
                                    <Cell width={2}>
                                       <Shape text-bind="$record.name" class="fill-blue-400" id-bind="$record.id" />
                                    </Cell>
                                    <StraightLine from-bind="$record.id" to="root" stroke="black" />
                                 </Repeater>
                              </Flow>
                              <Flow direction="down" gap={1} p={0.5}>
                                 <Rectangle class="fill-gray-100" />
                                 <Repeater records-bind="$network.switches">
                                    <Cell width={2}>
                                       <Shape text-bind="$record.name" class="fill-green-400" id-bind="$record.id" />
                                    </Cell>
                                 </Repeater>
                              </Flow>
                              <Flow direction="down" gap={1} p={0.5}>
                                 <Rectangle class="fill-gray-100" />
                                 <Repeater records-bind="$network.pcs">
                                    <Cell width={2}>
                                       <Shape text-bind="$record.name" class="fill-orange-400" id-bind="$record.id" />
                                    </Cell>
                                 </Repeater>
                              </Flow>
                           </Flow>
                           <Repeater records-bind="$network.connections" recordAlias="$conn">
                              <ThreeSegmentLine
                                 from-bind="$conn.from"
                                 to-bind="$conn.to"
                                 direction="right"
                                 class="stroke-black"
                                 stroke="black"
                              />
                           </Repeater>
                        </Rotate>
                     </Repeater>
                  </FourSides>
                  <ContentPlaceholder name="cloud" />
               </Diagram>
            `}</CodeSnippet>
         </Split>
      </div>
   </cx>
);
