import { Ellipse, Line, Rectangle, Svg, Text } from 'cx/svg';
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
import config from '../../../config/Cell';
import { ImportPath } from '../../../components/ImportPath';
import { CodeSnippet } from '../../../components/CodeSnippet';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                    # Cell 

                    <ImportPath path='import { Cell } from "cx-diagrams"' />
                    
                    The `Cell` component is used to mark a rectangular area on the diagram using its `width` and `height` properties to 
                    provide boundaries to [`Shapes`](~/components/shape) and other SVG elements . 
                    `Cells` participate in layout [`Flows`](~/components/flow).
                    Margin properties such as `ms` and `me` are used to add distance between cells.
                    
                </Md>
            </Pad>
         </Split>
         <Split>
            <Svg class="w-auto h-full border-t border-b bg-white min-h-[300px] xl:min-h-0" putInto="right">
               <Diagram center showGrid>
                  <Flow direction="right">
                     <Cell width={2}>
                        <Rectangle fill="red" />
                     </Cell>
                     <Cell height={2} ms={1}>
                        <Ellipse fill="green" />
                     </Cell>
                     <Cell height={2} ms={1} mt={-1}>
                        <Rectangle stroke="blue" fill="transparent" />
                     </Cell>
                  </Flow>
               </Diagram>
            </Svg>

            {/* prettier-ignore */}
            <CodeSnippet class="border-t border-b py-4">{`
                  <Diagram center showGrid>
                     <Flow direction="right">
                        <Cell width={2}>
                           <Rectangle fill="red" />
                        </Cell>
                        <Cell height={2} ms={1}>
                           <Ellipse fill="green" />
                        </Cell>
                        <Cell height={2} ms={1} mt={-1}>
                           <Rectangle stroke="blue" fill="transparent" />
                        </Cell>
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
