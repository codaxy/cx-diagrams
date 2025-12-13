/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape } from "cx-diagrams";
import { Rectangle, Svg, Text } from "cx/svg";

export default () => (
  <cx>
    <Svg class="w-full h-full bg-white">
      <Diagram center showGrid>
        <Flow direction="right" gap={1} align="center">
          <Flow gap={0.5} p={0.5}>
            <Rectangle stroke="red">
              <Text
                anchors={0}
                dy="-5px"
                value="right"
                fill="currentColor"
                style="font-size: 12px"
              />
            </Rectangle>
            <Cell>
              <Shape fill="lightgray" text="1" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="2" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="3" />
            </Cell>
          </Flow>
          <Flow direction="down" gap={0.5} p={0.5}>
            <Rectangle stroke="red">
              <Text
                anchors={0}
                dy="-5px"
                value="down"
                fill="currentColor"
                style="font-size: 12px"
              />
            </Rectangle>
            <Cell>
              <Shape fill="lightgray" text="1" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="2" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="3" />
            </Cell>
          </Flow>

          <Flow direction="left" gap={0.5} p={0.5}>
            <Rectangle stroke="red">
              <Text
                anchors={0}
                dy="-5px"
                value="left"
                fill="currentColor"
                style="font-size: 12px"
              />
            </Rectangle>
            <Cell>
              <Shape fill="lightgray" text="1" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="2" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="3" />
            </Cell>
          </Flow>

          <Flow direction="up" gap={0.5} p={0.5}>
            <Rectangle stroke="red">
              <Text
                anchors={0}
                dy="-5px"
                value="up"
                fill="currentColor"
                style="font-size: 12px"
              />
            </Rectangle>
            <Cell>
              <Shape fill="lightgray" text="1" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="2" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="3" />
            </Cell>
          </Flow>
        </Flow>
      </Diagram>
    </Svg>
  </cx>
);
