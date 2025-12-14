/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape, StraightLine } from "cx-diagrams";
import { Svg } from "cx/svg";

export default () => (
  <cx>
    <Svg class="w-full h-full bg-white">
      <Diagram unitSize={64} center showGrid>
        <Flow gap={1} align="center">
          <Cell>
            <Shape fill="lightgray" text="1" id="1" />
          </Cell>
          <Flow direction="down" gap={1}>
            <Cell>
              <Shape fill="lightgray" text="2" id="2" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="3" id="3" shape="rhombus" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="4" id="4" />
            </Cell>
          </Flow>
          <Flow direction="down" gap={1}>
            <Cell>
              <Shape fill="lightgray" text="5" id="5" shape="circle" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="6" id="6" shape="circle" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="7" id="7" shape="circle" />
            </Cell>
          </Flow>
          <Cell>
            <Shape fill="lightgray" text="8" id="8" />
          </Cell>
          <StraightLine from="1" to="2" stroke="black">
            <Shape
              anchors="0 0 0 0"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
            <Shape
              anchors="1 1 1 1"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
          </StraightLine>
          <StraightLine from="1" to="3" stroke="black">
            <Shape
              anchors="0 0 0 0"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
            <Shape
              anchors="1 1 1 1"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
          </StraightLine>
          <StraightLine from="1" to="4" stroke="black">
            <Shape
              anchors="0 0 0 0"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
            <Shape
              anchors="1 1 1 1"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
          </StraightLine>
          <StraightLine from="2" to="6" stroke="black">
            <Shape
              anchors="0 0 0 0"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
            <Shape
              anchors="1 1 1 1"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
          </StraightLine>
          <StraightLine from="3" to="5" stroke="black">
            <Shape
              anchors="0 0 0 0"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
            <Shape
              anchors="1 1 1 1"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
          </StraightLine>
          <StraightLine from="4" to="7" stroke="black">
            <Shape
              anchors="0 0 0 0"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
            <Shape
              anchors="1 1 1 1"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
          </StraightLine>
          <StraightLine from="5" to="8" stroke="black">
            <Shape
              anchors="0 0 0 0"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
            <Shape
              anchors="1 1 1 1"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
          </StraightLine>
          <StraightLine from="6" to="8" stroke="black">
            <Shape
              anchors="0 0 0 0"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
            <Shape
              anchors="1 1 1 1"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
          </StraightLine>
          <StraightLine from="7" to="8" stroke="black">
            <Shape
              anchors="0 0 0 0"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
            <Shape
              anchors="1 1 1 1"
              margin={-3}
              shape="circle"
              fill="white"
              stroke="blue"
            />
          </StraightLine>
        </Flow>
      </Diagram>
    </Svg>
  </cx>
);
