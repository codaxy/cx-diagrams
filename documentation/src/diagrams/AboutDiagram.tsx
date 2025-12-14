/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape } from "cx-diagrams";
import { Rectangle, Svg, Text } from "cx/svg";

export default () => (
  <div>
    <Svg class="h-[440px] min-w-[700px] border-t border-b">
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
            <Cell w={4} h={2}>
              <Shape class="fill-lime-400" text="Astro" />
            </Cell>
            <Cell w={4} h={2}>
              <Shape class="fill-lime-500" text="React" />
            </Cell>
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
              <Shape class="fill-red-300" text="Sass" />
            </Cell>
            <Cell w={4} h={2}>
              <Shape class="fill-red-400" text="MDX" />
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
              <Shape class="fill-blue-200" text="TypeScript" />
            </Cell>
            <Cell w={4} h={2}>
              <Shape class="fill-blue-300" text="Vite" />
            </Cell>
            <Cell w={4} h={2}>
              <Shape class="fill-blue-400" text="Shiki" />
            </Cell>
          </Flow>
        </Flow>
      </Diagram>
    </Svg>
  </div>
);
