/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape } from "cx-diagrams";
import { Rectangle, Svg, Text } from "cx/svg";

export default () => (
  <div>
    <Svg class="h-[440px] min-w-[700px]">
      <Diagram center unitSize={32} fixed showGrid>
        <Flow direction="right" gap={1}>
          <Flow direction="down" gap={0.5} p={1}>
            <Rectangle class="stroke-gray-400 fill-white" />
            <Text
              anchors={0}
              value="Frameworks"
              dy="-0.5em"
              class="fill-gray-600"
            />
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
            <Text
              anchors={0}
              value="Libraries"
              dy="-0.5em"
              class="fill-gray-600"
            />
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
            <Text
              anchors={0}
              value="Dev Tools"
              dy="-0.5em"
              class="fill-gray-600"
            />
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
);
