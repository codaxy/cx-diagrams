/** @jsxImportSource cx */
import {
  ArrowHead,
  Cell,
  Diagram,
  Draggable,
  ElbowLine,
  Flow,
  Shape,
} from "cx-diagrams";
import { createModel } from "cx/data";
import { Svg } from "cx/svg";
import { bind } from "cx/ui";

interface Position {
  offsetX: number;
  offsetY: number;
}

interface Model {
  s1: Position;
  s2: Position;
  s3: Position;
  s4: Position;
  s5: Position;
}

const m = createModel<Model>();

export default () => (
  <cx>
    <Svg class="w-full h-full min-h-[450px] min-w-[500px] bg-white border-t border-b">
      <Diagram unitSize={48} center showGrid>
        <Flow direction="down" gap={2} align="center">
          <Flow gap={2}>
            <Draggable offsetX={bind(m.s1.offsetX, 0)} offsetY={bind(m.s1.offsetY, 0)}>
              <Cell>
                <Shape fill="lightgray" text="1" id="1" />
              </Cell>
            </Draggable>
            <Draggable offsetX={bind(m.s2.offsetX, 0)} offsetY={bind(m.s2.offsetY, 0)}>
              <Cell>
                <Shape fill="lightgray" text="2" id="2" />
              </Cell>
            </Draggable>
            <Draggable offsetX={bind(m.s3.offsetX, 0)} offsetY={bind(m.s3.offsetY, 0)}>
              <Cell>
                <Shape fill="lightgray" text="3" id="3" />
              </Cell>
            </Draggable>
          </Flow>
          <Flow gap={2}>
            <Draggable offsetX={bind(m.s4.offsetX, 0)} offsetY={bind(m.s4.offsetY, 0)}>
              <Cell>
                <Shape fill="lightgray" text="4" id="4" />
              </Cell>
            </Draggable>
            <Draggable offsetX={bind(m.s5.offsetX, 0)} offsetY={bind(m.s5.offsetY, 0)}>
              <Cell>
                <Shape fill="lightgray" text="5" id="5" />
              </Cell>
            </Draggable>
          </Flow>
        </Flow>

        {/* one segment */}
        <ElbowLine from="4" to="5" stroke="black">
          <ArrowHead size={7} fill="black" />
        </ElbowLine>

        {/* two segments */}
        <ElbowLine from="1" to="4" startDirection="down" endDirection="right" stroke="green">
          <ArrowHead size={7} fill="green" />
        </ElbowLine>

        {/* three segments */}
        <ElbowLine from="2" to="5" startDirection="down" startOffset={8} stroke="blue">
          <ArrowHead size={7} fill="blue" />
        </ElbowLine>
        <ElbowLine from="2" to="3" startDirection="up" endDirection="down" stroke="purple" cornerRadius={8}>
          <ArrowHead size={7} fill="purple" />
        </ElbowLine>

        {/* four segments */}
        <ElbowLine from="5" to="3" startDirection="down" endDirection="left" stroke="red" cornerRadius={8}>
          <ArrowHead size={7} fill="red" />
        </ElbowLine>

        {/* five segments */}
        <ElbowLine from="4" to="1" startDirection="down" endDirection="down" stroke="orange" cornerRadius={8}>
          <ArrowHead size={7} fill="orange" />
        </ElbowLine>

        {/* smooth */}
        <ElbowLine from="2" to="4" startDirection="down" endDirection="left" startOffset={-8} stroke="teal" smooth>
          <ArrowHead size={7} fill="teal" />
        </ElbowLine>
      </Diagram>
    </Svg>
  </cx>
);
