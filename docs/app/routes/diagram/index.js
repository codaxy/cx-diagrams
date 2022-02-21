import { Line, Rectangle, Svg, Text } from 'cx/svg';
import { Diagram } from '../../../../packages/cx-diagrams/src/Diagram';
import { Box } from '../../../../packages/cx-diagrams/src/Box';
import { Flow } from '../../../../packages/cx-diagrams/src/Flow';
import { Rotate } from '../../../../packages/cx-diagrams/src/Rotate';
import { Shape } from '../../../../packages/cx-diagrams/src/Shape';
import Controller from './Controller';
import { ConnectionBox } from '../../../../packages/cx-diagrams/src/ConnectionBox';
import { StraightLine } from '../../../../packages/cx-diagrams/src/StraightLine';
import { TwoSegmentLine } from '../../../../packages/cx-diagrams/src/TwoSegmentLine';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto" controller={Controller}>
         <Svg class="w-[900px] h-[900px] border m-20 bg-white">
            <Diagram ticks={16}>
               <Rotate steps={0}>
                  <Flow gap={0.5} direction="right" align="center">
                     <Flow gap={0.5} direction="down">
                        <Rectangle fill="rgba(255, 255, 255, 0.5)" stroke="gray" margin={-10} />
                        <Box width={2} ml={1}>
                           <Shape id="item1" text="Item1" fill="yellow" shape="circle" stroke="red" margin={-10} />
                        </Box>
                     </Flow>

                     <Flow gap={3} direction="down" padding={0.5} align="center">
                        <Rectangle fill="rgba(255, 255, 255, 0.5)" stroke="gray" />
                        <Box width={2}>
                           <Shape id="item2" text="Item2" fill="yellow" stroke="red" />
                        </Box>
                        <Box>
                           <Rectangle fill="red" />
                        </Box>
                     </Flow>

                     <Flow gap={0.5} direction="down">
                        <Box width={2}>
                           <Shape id="item3" text="Item3" fill="yellow" stroke="red" />
                        </Box>
                        <Box width={2}>
                           <Shape id="item4" text="Item4" fill="yellow" stroke="red" />
                        </Box>
                     </Flow>
                  </Flow>

                  <StraightLine from="item1" to="item2" stroke="red" />
                  <TwoSegmentLine from="item2" to="item3" stroke="red">
                     <Shape anchors="0 0 0 0" margin={-5} stroke="black" shape="circle" />
                  </TwoSegmentLine>
               </Rotate>
            </Diagram>
         </Svg>
      </div>
   </cx>
);
