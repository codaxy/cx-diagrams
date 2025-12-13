/** @jsxImportSource cx */
import {
  ArrowHead,
  Cell,
  Diagram,
  Flow,
  Shape,
  StraightLine,
  ThreeSegmentLine,
} from "cx-diagrams";
import { Svg } from "cx/svg";

export default () => (
  <cx>
    <Svg class="w-full h-full bg-white">
      <Diagram unitSize={32} showGrid center>
        <Flow direction="down">
          <Flow direction="down" gap={4}>
            <Flow gap={5}>
              <Cell width={3}>
                <Shape
                  id="scm"
                  text="SCM"
                  shapeClass="fill-green-300 stroke-green-800"
                />
              </Cell>
              <Cell width={3}>
                <Shape
                  id="ghw"
                  shapeClass="fill-green-300 stroke-green-800"
                  text="GIT Webhook"
                />
              </Cell>
            </Flow>
            <Flow gap={2}>
              <Cell width={3}>
                <Shape
                  id="docker"
                  text="Docker Build"
                  shapeClass="fill-green-300 stroke-green-800"
                />
              </Cell>
              <Cell width={3}>
                <Shape
                  id="publish"
                  text="Publish Image"
                  shapeClass="fill-red-300 stroke-red-800"
                />
              </Cell>
              <Cell width={3}>
                <Shape id="run" text="Run app" shapeClass="stroke-red-800" />
              </Cell>
            </Flow>
          </Flow>
        </Flow>
        <StraightLine from="scm" to="ghw" stroke="black">
          <ArrowHead size={7} class="fill-red-600 stroke-black" />
        </StraightLine>
        <ThreeSegmentLine direction="down" from="ghw" to="docker" stroke="black">
          <ArrowHead position="middle" stroke="black" fill="white" size={7} />
        </ThreeSegmentLine>
        <StraightLine from="docker" to="publish" stroke="black">
          <ArrowHead shape="line" stroke="black" size={7} />
        </StraightLine>
        <StraightLine from="publish" to="run" stroke="black">
          <ArrowHead fill="black" size={10} shape="vback" />
          <ArrowHead fill="black" size={10} reverse shape="vback" />
        </StraightLine>
      </Diagram>
    </Svg>
  </cx>
);
