import { Rectangle, Svg, Text } from 'cx/svg';
import { Cell } from '../../../../packages/cx-diagrams/src/Cell';
import { Diagram } from '../../../../packages/cx-diagrams/src/Diagram';
import { Flow } from '../../../../packages/cx-diagrams/src/Flow';
import { Shape } from '../../../../packages/cx-diagrams/src/Shape';
import { Md } from '../../components/Md';
import { Pad } from '../../components/Pad';
import { Split } from '../../components/Split';
import Controller from './Controller';

export default (
   <cx>
      <div controller={Controller} class="bg-gray-50 overflow-auto rleative">
         <Split>
            <Pad>
               {/* prettier-ignore */}
               <Md>
               # About CxJS Diagrams

               This library allows you to create interactive diagrams in [CxJS](https://cxjs.io) applications.
               The [Shape](~/components/shape) component is used to represent visual elements such as circles and rectangles and allows
               rich styling, click handlers, tooltips and context menus. Elements are easily connected with [Lines](~/components/straight-line) by simply specifying 
               identifiers of the beginning and the end shape.
               Layout components, such as [Flow](~/components/flow), make it easy to position elements on the diagram automatically, such as in the example below 
               which represents the tech stack of this documentation project.
               </Md>
            </Pad>
         </Split>

         <Split>
            <div class="overflow-x-auto">
               <Svg class="h-[420px] min-w-[700px]">
                  <Diagram center unitSize={32} fixed>
                     <Flow direction="right" gap={1}>
                        <Flow direction="down" gap={0.5} p={1}>
                           <Rectangle class="stroke-gray-400 fill-white" />
                           <Text anchors={0} value="Frameworks" dy="-0.5em" class="fill-gray-600" />
                           <Cell w={4} h={2}>
                              <Shape class="fill-lime-200" text="CxJS Diagrams" />
                           </Cell>
                           <Cell w={4} h={2}>
                              <Shape class="fill-lime-300" text="CxJS" />
                           </Cell>
                           <Flow gap={0.5}>
                              <Cell w={4} h={2}>
                                 <Shape class="fill-lime-400" text="React" />
                              </Cell>
                           </Flow>
                        </Flow>
                        <Flow direction="down" gap={0.5} p={1}>
                           <Rectangle class="stroke-gray-400 fill-white" />
                           <Text anchors={0} value="Libraries" dy="-0.5em" class="fill-gray-600" />
                           <Cell w={4} h={2}>
                              <Shape class="fill-red-200" text="Tailwind CSS" />
                           </Cell>
                           <Cell w={4} h={2}>
                              <Shape class="fill-red-300" text="marked" />
                           </Cell>
                           <Cell w={4} h={2}>
                              <Shape class="fill-red-400" text="highlight.js" />
                           </Cell>
                           <Cell w={4} h={2}>
                              <Shape class="fill-red-500" text="Heroicons" />
                           </Cell>
                        </Flow>
                        <Flow direction="down" gap={0.5} p={1}>
                           <Rectangle class="stroke-gray-400 fill-white" />
                           <Text anchors={0} value="Dev Tools" dy="-0.5em" class="fill-gray-600" />
                           <Cell w={4} h={2}>
                              <Shape class="fill-blue-200" text="Babel" />
                           </Cell>
                           <Cell w={4} h={2}>
                              <Shape class="fill-blue-300" text="Webpack" />
                           </Cell>
                           <Cell w={4} h={2}>
                              <Shape class="fill-blue-400" text="Esbuild" />
                           </Cell>
                        </Flow>
                     </Flow>
                  </Diagram>
               </Svg>
            </div>
         </Split>

         <Split>
            <Pad className="pt-0">
               {/* prettier-ignore */}
               <Md>
               ## Links

               - [GitHub](https://github.com/codaxy/cx-diagrams)
               - [`npm` package](https://www.npmjs.com/package/cx-diagrams)
               - [CxJS](https://cxjs.io)

               ## License

               This project is licensed under the [MIT license](https://github.com/codaxy/cx-diagrams/blob/master/LICENSE.md.
               </Md>
            </Pad>
         </Split>
      </div>
   </cx>
);
