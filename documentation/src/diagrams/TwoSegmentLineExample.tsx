/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape, TwoSegmentLine } from "cx-diagrams";
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
              <Shape fill="lightgray" text="3" id="3" />
            </Cell>
            <Cell>
              <Shape fill="lightgray" text="4" id="4" />
            </Cell>
          </Flow>
          <Cell>
            <Shape fill="lightgray" text="5" id="5" />
          </Cell>
          <TwoSegmentLine from="1" to="2" stroke="black" direction="up">
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
          </TwoSegmentLine>
          <TwoSegmentLine from="1" to="3" stroke="black">
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
          </TwoSegmentLine>
          <TwoSegmentLine from="1" to="4" stroke="black" direction="down">
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
          </TwoSegmentLine>
          <TwoSegmentLine from="2" to="5" stroke="black" direction="right">
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
          </TwoSegmentLine>
          <TwoSegmentLine from="2" to="3" stroke="black" direction="down">
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
          </TwoSegmentLine>
          <TwoSegmentLine from="3" to="4" stroke="black" direction="up">
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
          </TwoSegmentLine>
          <TwoSegmentLine from="3" to="5" stroke="black" direction="right">
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
          </TwoSegmentLine>
          <TwoSegmentLine from="4" to="5" stroke="black" direction="right">
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
          </TwoSegmentLine>
        </Flow>
      </Diagram>
    </Svg>
  </cx>
);
