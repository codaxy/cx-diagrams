/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape, ThreeSegmentLine } from "cx-diagrams";
import { Svg } from "cx/svg";

export default () => (
  <cx>
    <Svg class="w-full h-full min-h-[300px] bg-white border-t border-b">
      <Diagram unitSize={48} center showGrid>
        <Flow gap={1} align="center" direction="down">
          <Cell>
            <Shape fill="lightgray" text="1" id="1" />
          </Cell>
          <Flow direction="right" gap={1}>
            <Flow direction="down" gap={1} align="center">
              <Cell>
                <Shape fill="lightgray" text="2" id="2" />
              </Cell>
              <Flow direction="right" gap={1} align="center">
                <Cell>
                  <Shape fill="lightgray" text="3" id="3" />
                </Cell>
                <Cell>
                  <Shape fill="lightgray" text="4" id="4" />
                </Cell>
              </Flow>
            </Flow>

            <Flow direction="down" gap={1} align="center">
              <Cell>
                <Shape fill="lightgray" text="5" id="5" />
              </Cell>
              <Flow direction="right" gap={1} align="center">
                <Cell>
                  <Shape fill="lightgray" text="6" id="6" />
                </Cell>
                <Cell>
                  <Shape fill="lightgray" text="7" id="7" />
                </Cell>
              </Flow>
            </Flow>
          </Flow>
          <ThreeSegmentLine from="1" to="2" stroke="black" direction="down">
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
          </ThreeSegmentLine>
          <ThreeSegmentLine from="1" to="5" stroke="black" direction="down">
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
          </ThreeSegmentLine>
          <ThreeSegmentLine from="2" to="3" stroke="black" direction="down">
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
          </ThreeSegmentLine>
          <ThreeSegmentLine from="2" to="4" stroke="black" direction="down">
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
          </ThreeSegmentLine>
          <ThreeSegmentLine from="5" to="6" stroke="black" direction="down">
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
          </ThreeSegmentLine>
          <ThreeSegmentLine from="5" to="7" stroke="black" direction="down">
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
          </ThreeSegmentLine>
        </Flow>
      </Diagram>
    </Svg>
  </cx>
);
