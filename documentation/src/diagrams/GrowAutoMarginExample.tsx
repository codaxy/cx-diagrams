import { Cell, Diagram, Flow, Shape } from "cx-diagrams";
import { Rectangle, Svg, Text } from "cx/svg";

export default () => (
  <cx>
    <Svg class="w-full h-full min-h-[600px] min-w-[600px] bg-white border-t border-b">
      <Diagram center showGrid>
        <Flow direction="down" gap={1}>
          <Flow direction="right" gap={1} p={0.5}>
            <Rectangle stroke="red" style="stroke-dasharray: 4 2">
              <Text
                anchors={0}
                dy="-5px"
                value="3 cells (reference width)"
                fill="currentColor"
                style="font-size: 10px"
              />
            </Rectangle>
            <Cell w={2}>
              <Shape fill="#e0e7ff" text="A" />
            </Cell>
            <Cell w={2}>
              <Shape fill="#e0e7ff" text="B" />
            </Cell>
            <Cell w={2}>
              <Shape fill="#e0e7ff" text="C" />
            </Cell>
          </Flow>

          <Flow direction="right" p={0.5} selfAlign="stretch">
            <Rectangle stroke="red" style="stroke-dasharray: 4 2">
              <Text
                anchors={0}
                dy="-5px"
                value="grow"
                fill="currentColor"
                style="font-size: 10px"
              />
            </Rectangle>
            <Cell w={2} grow>
              <Shape fill="#bbf7d0" text="D (grow)" />
            </Cell>
          </Flow>

          <Flow direction="right" gap={1} p={0.5} selfAlign="stretch">
            <Rectangle stroke="red" style="stroke-dasharray: 4 2">
              <Text
                anchors={0}
                dy="-5px"
                value="2x grow"
                fill="currentColor"
                style="font-size: 10px"
              />
            </Rectangle>
            <Cell w={2} grow>
              <Shape fill="#bbf7d0" text="E (grow)" />
            </Cell>
            <Cell w={2} grow>
              <Shape fill="#bbf7d0" text="F (grow)" />
            </Cell>
          </Flow>

          <Flow direction="right" p={0.5} selfAlign="stretch">
            <Rectangle stroke="red" style="stroke-dasharray: 4 2">
              <Text
                anchors={0}
                dy="-5px"
                value="msAuto + meAuto (centered)"
                fill="currentColor"
                style="font-size: 10px"
              />
            </Rectangle>
            <Cell w={2} msAuto meAuto>
              <Shape fill="#fef08a" text="G" />
            </Cell>
          </Flow>

          <Flow direction="right" p={0.5} selfAlign="stretch">
            <Rectangle stroke="red" style="stroke-dasharray: 4 2">
              <Text
                anchors={0}
                dy="-5px"
                value="msAuto (end)"
                fill="currentColor"
                style="font-size: 10px"
              />
            </Rectangle>
            <Cell w={2} msAuto>
              <Shape fill="#fed7aa" text="H" />
            </Cell>
          </Flow>

          <Flow direction="right" p={0.5} selfAlign="stretch">
            <Rectangle stroke="red" style="stroke-dasharray: 4 2">
              <Text
                anchors={0}
                dy="-5px"
                value="meAuto (start)"
                fill="currentColor"
                style="font-size: 10px"
              />
            </Rectangle>
            <Cell w={2} meAuto>
              <Shape fill="#fed7aa" text="I" />
            </Cell>
          </Flow>

          <Flow direction="right" gap={1} p={0.5} selfAlign="stretch">
            <Rectangle stroke="red" style="stroke-dasharray: 4 2">
              <Text
                anchors={0}
                dy="-5px"
                value="fixed + grow"
                fill="currentColor"
                style="font-size: 10px"
              />
            </Rectangle>
            <Cell w={1}>
              <Shape fill="#e0e7ff" text="J" />
            </Cell>
            <Cell w={2} grow>
              <Shape fill="#bbf7d0" text="K (grow)" />
            </Cell>
          </Flow>
        </Flow>
      </Diagram>
    </Svg>
  </cx>
);
