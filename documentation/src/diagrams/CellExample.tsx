/** @jsxImportSource cx */
import { Cell, Diagram, Flow } from "cx-diagrams";
import { Ellipse, Rectangle, Svg } from "cx/svg";

export default () => (
  <cx>
    <Svg class="w-full min-h-[250px] h-full bg-white  border-t border-b">
      <Diagram center showGrid unitSize={48}>
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
  </cx>
);
