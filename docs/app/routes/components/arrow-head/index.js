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
import config from '../../../config/Diagram';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
                # ArrowHead 

                <ImportPath path='import { ArrowHead } from "cx-diagrams"' />

                Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...
                 Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...Text...
                
                </Md>
            </Pad>
         </Split>
         <Split>
            {/* prettier-ignore */}
            <CodeSnippet class="border-b border-t h-[400px] overflow-auto" >{`
           Code here
            `}</CodeSnippet>

            <div class="h-[500px] xl:h-full xl:border-t border-b relative" putInto="right">
               <Svg class="w-auto h-full bg-white">
                  <Diagram unitSize={32} showGrid center>
                     <Flow gap={5}>
                        <Cell width={2}>
                           <Shape id="1" stroke="red" fill="white" text="Red" />
                        </Cell>
                        <Flow direction="down" gap={2}>
                           <Cell width={2}>
                              <Shape id="2" stroke="blue" fill="white" text="Blue" />
                           </Cell>
                           <Cell width={2}>
                              <Shape id="3" stroke="green" fill="white" text="Green" />
                           </Cell>
                        </Flow>
                     </Flow>
                     <StraightLine from="2" to="3" stroke="black">
                        <ArrowHead position="middle" fill="currentColor" style="font-size: 15px" size={10} />
                     </StraightLine>
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
