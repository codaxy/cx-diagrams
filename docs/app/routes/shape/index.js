import { Ellipse, Line, Rectangle, Svg, Text } from 'cx/svg';
import { Diagram } from '../../../../packages/cx-diagrams/src/Diagram';
import { Cell } from '../../../../packages/cx-diagrams/src/Cell';
import { Flow } from '../../../../packages/cx-diagrams/src/Flow';
import { Rotate } from '../../../../packages/cx-diagrams/src/Rotate';
import { Shape } from '../../../../packages/cx-diagrams/src/Shape';
import Controller from './Controller';

import { StraightLine } from '../../../../packages/cx-diagrams/src/StraightLine';
import { Md } from '../../components/Md';
import { Split } from '../../components/Split';
import { Pad } from '../../components/Pad';
import { ConfigTable } from '../../components/ConfigTable';
import config from '../../config/Shape';
import { ImportPath } from '../../components/ImportPath';
import { CodeSnippet } from '../../components/CodeSnippet';
import { Link, Menu, openContextMenu } from 'cx/widgets';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                    # Shape 

                    <ImportPath path='import { Shape } from "cx-diagrams"' />
                    
                    The `Shape` component is used to shapes appearing on the diagram. Shapes are usually `circles` or `rectangles` 
                    and can represent various things such as network devices and interfaces, departments, roles, etc. 
                    Shapes support the `text` property and can easily be interconnected using lines. Shapes are clickable and support context menus.
                </Md>
            </Pad>
         </Split>
         <Split>
            <Svg class="w-auto h-full border-t border-b bg-white min-h-[300px] lg:min-h-0" putInto="right">
               <Diagram unitSize={24} center>
                  <Flow direction="right" gap={2}>
                     <Flow direction="down" gap={1}>
                        <Cell width={4} height={2}>
                           <Shape fill="lightgray" text="fill" />
                        </Cell>
                        <Cell width={4} height={2}>
                           <Shape stroke="red" text="stroke" />
                        </Cell>
                        <Cell width={4} height={2}>
                           <Shape fill="lightgray" text="Tooltip" tooltip="Shapes can have tooltips" id="tooltip" />
                        </Cell>
                     </Flow>

                     <Flow direction="down" gap={1}>
                        <Cell width={4} height={2}>
                           <Shape fill="lightgray" text="Circle" shape="circle" />
                        </Cell>
                        <Cell width={4} height={2}>
                           <Shape stroke="red" text="Connectors" fill="white">
                              <Shape
                                 anchors="0 0.5 0 0.5"
                                 margin={-3}
                                 shape="circle"
                                 stroke="black"
                                 fill="white"
                                 tooltip="North"
                              />
                              <Shape
                                 anchors="1 0.5 1 0.5"
                                 margin={-3}
                                 shape="circle"
                                 stroke="black"
                                 fill="white"
                                 tooltip="South"
                              />
                              <Shape
                                 anchors="0.5 1 0.5 1"
                                 margin={-3}
                                 shape="circle"
                                 stroke="black"
                                 fill="white"
                                 tooltip="East"
                              />
                              <Shape
                                 anchors="0.5 0 0.5 0"
                                 margin={-3}
                                 shape="circle"
                                 stroke="black"
                                 fill="white"
                                 tooltip="West"
                              />
                           </Shape>
                        </Cell>
                        <Cell width={4} height={2}>
                           <Shape
                              fill="lightgray"
                              text="Connected"
                              id="connected"
                              tooltip="Shapes can be connected with lines"
                           />
                           <StraightLine from="connected" to="tooltip" stroke="black" />
                        </Cell>
                     </Flow>

                     <Flow direction="down" gap={1}>
                        <Cell width={4} height={2}>
                           <Shape
                              shapeClass="fill-red-300 stroke-red-800"
                              text="Tailwind CSS"
                              tooltip="Shapes can be styled using utility classes"
                           />
                        </Cell>
                        <Cell width={4} height={2}>
                           <Shape
                              shapeClass="fill-orange-300 stroke-orange-800"
                              text="Clickable"
                              onClick={() => {
                                 alert('You clicked on a shape.');
                              }}
                           />
                        </Cell>
                        <Cell width={4} height={2}>
                           <Shape
                              shapeClass="fill-green-300 stroke-green-800"
                              id="green"
                              text="Context Menu"
                              onContextMenu={(e, instance) => {
                                 e.preventDefault();
                                 openContextMenu(
                                    e,
                                    <cx>
                                       <Menu>
                                          <Link href="~/components/diagram">Diagram</Link>
                                          <Link href="~/components/cell">Cell</Link>
                                          <Link href="~/components/shape">Shape</Link>
                                          <Link href="~/components/flow">Flow</Link>
                                       </Menu>
                                    </cx>,
                                    instance
                                 );
                              }}
                           />
                           <StraightLine from="connected" to="green" stroke="black" />
                        </Cell>
                     </Flow>
                  </Flow>
               </Diagram>
            </Svg>

            {/* prettier-ignore */}
            <CodeSnippet class="border-t border-b py-4 max-h-[500px] overflow-auto">{`
            <Diagram unitSize={24} center>                
                <Flow direction="right" gap={2}>
                    <Flow direction="down" gap={1}>
                        <Cell width={4} height={2}>
                            <Shape fill="lightgray" text="fill" />
                        </Cell>
                        <Cell width={4} height={2}>
                            <Shape stroke="red" text="stroke" />
                        </Cell>
                        <Cell width={4} height={2}>
                            <Shape fill="lightgray" text="Tooltip" tooltip="Shapes can have tooltips" id="tooltip" />
                        </Cell>
                    </Flow>

                    <Flow direction="down" gap={1}>
                        <Cell width={4} height={2}>
                            <Shape fill="lightgray" text="Circle" shape="circle" />
                        </Cell>
                        <Cell width={4} height={2}>
                            <Shape stroke="red" text="Connectors" fill="white">
                                <Shape
                                    anchors="0 0.5 0 0.5"
                                    margin={-3}
                                    shape="circle"
                                    stroke="black"
                                    fill="white"
                                    tooltip="North"
                                />
                                <Shape
                                    anchors="1 0.5 1 0.5"
                                    margin={-3}
                                    shape="circle"
                                    stroke="black"
                                    fill="white"
                                    tooltip="South"
                                />
                                <Shape
                                    anchors="0.5 1 0.5 1"
                                    margin={-3}
                                    shape="circle"
                                    stroke="black"
                                    fill="white"
                                    tooltip="East"
                                />
                                <Shape
                                    anchors="0.5 0 0.5 0"
                                    margin={-3}
                                    shape="circle"
                                    stroke="black"
                                    fill="white"
                                    tooltip="West"
                                />
                            </Shape>
                        </Cell>
                        <Cell width={4} height={2}>
                            <Shape
                                fill="lightgray"
                                text="Connected"
                                id="connected"
                                tooltip="Shapes can be connected with lines"
                            />
                            <StraightLine from="connected" to="tooltip" stroke="black" />
                        </Cell>
                    </Flow>

                    <Flow direction="down" gap={1}>
                        <Cell width={4} height={2}>
                            <Shape
                                shapeClass="fill-red-300 stroke-red-800"
                                text="Tailwind CSS"
                                tooltip="Shapes can be styled using utility classes"
                            />
                        </Cell>
                        <Cell width={4} height={2}>
                            <Shape
                                shapeClass="fill-orange-300 stroke-orange-800"
                                text="Clickable"
                                onClick={() => {
                                    alert('You clicked on a shape.');
                                }}
                            />
                        </Cell>
                        <Cell width={4} height={2}>
                            <Shape
                                shapeClass="fill-green-300 stroke-green-800"
                                id="green"
                                text="Context Menu"
                                onContextMenu={(e, instance) => {
                                    e.preventDefault();
                                    openContextMenu(
                                    e,
                                    <cx>
                                        <Menu>
                                            <Link href="~/components/diagram">Diagram</Link>
                                            <Link href="~/components/cell">Cell</Link>
                                            <Link href="~/components/shape">Shape</Link>
                                            <Link href="~/components/flow">Flow</Link>
                                        </Menu>
                                    </cx>,
                                    instance
                                    );
                                }}
                            />
                            <StraightLine from="connected" to="green" stroke="black" />
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
