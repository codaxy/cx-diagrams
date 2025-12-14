/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape, StraightLine } from "cx-diagrams";
import { Svg } from "cx/svg";
import { Link, Menu, openContextMenu, enableTooltips } from "cx/widgets";

enableTooltips();

export default () => (
  <cx>
    <div class="overflow-x-auto">
      <Svg class="w-full h-full min-h-[400px] min-w-[600px] bg-white border-t border-b">
        <Diagram unitSize={32} center showGrid>
          <Flow direction="right" gap={2}>
            <Flow direction="down" gap={1}>
              <Cell width={4} height={2}>
                <Shape fill="lightgray" text="fill" />
              </Cell>
              <Cell width={4} height={2}>
                <Shape stroke="red" text="stroke" />
              </Cell>
              <Cell width={4} height={2}>
                <Shape
                  fill="lightgray"
                  text="Tooltip"
                  tooltip="Shapes can have tooltips"
                  id="tooltip"
                />
              </Cell>
            </Flow>

            <Flow direction="down" gap={1}>
              <Cell width={4} height={2}>
                <Shape fill="lightgray" text="Circle" shape="circle" />
              </Cell>
              <Cell width={4} height={2}>
                <Shape stroke="red" text="Connectors" fill="white">
                  <Shape
                    anchors="0 0.5 0 0.5"
                    margin={-3}
                    shape="circle"
                    stroke="black"
                    fill="white"
                    tooltip="North"
                  />
                  <Shape
                    anchors="1 0.5 1 0.5"
                    margin={-3}
                    shape="circle"
                    stroke="black"
                    fill="white"
                    tooltip="South"
                  />
                  <Shape
                    anchors="0.5 1 0.5 1"
                    margin={-3}
                    shape="circle"
                    stroke="black"
                    fill="white"
                    tooltip="East"
                  />
                  <Shape
                    anchors="0.5 0 0.5 0"
                    margin={-3}
                    shape="circle"
                    stroke="black"
                    fill="white"
                    tooltip="West"
                  />
                </Shape>
              </Cell>
              <Cell width={4} height={2}>
                <Shape
                  fill="lightgray"
                  text="Connected"
                  id="connected"
                  tooltip="Shapes can be connected with lines"
                />
                <StraightLine from="connected" to="tooltip" stroke="black" />
              </Cell>
              <Cell width={4} height={2}>
                <Shape
                  shapeClass="fill-blue-300 stroke-blue-800"
                  shape="rhombus"
                  text="Rhombus"
                />
              </Cell>
            </Flow>

            <Flow direction="down" gap={1}>
              <Cell width={4} height={2}>
                <Shape
                  shapeClass="fill-red-300 stroke-red-800"
                  text="Tailwind CSS"
                  tooltip="Shapes can be styled using utility classes"
                />
              </Cell>
              <Cell width={4} height={2}>
                <Shape
                  shapeClass="fill-orange-300 stroke-orange-800"
                  text="Clickable"
                  onClick={() => {
                    alert("You clicked on a shape.");
                  }}
                />
              </Cell>
              <Cell width={4} height={2}>
                <Shape
                  shapeClass="fill-green-300 stroke-green-800"
                  id="green"
                  text="Context Menu"
                  onContextMenu={(e: React.MouseEvent, instance: any) => {
                    e.preventDefault();
                    openContextMenu(
                      e,
                      <cx>
                        <Menu>
                          <a href="/components/diagram">Diagram</a>
                          <a href="/components/cell">Cell</a>
                          <a href="/components/shape">Shape</a>
                          <a href="/components/flow">Flow</a>
                        </Menu>
                      </cx>,
                      instance
                    );
                  }}
                />
                <StraightLine from="connected" to="green" stroke="black" />
              </Cell>
            </Flow>
          </Flow>
        </Diagram>
      </Svg>
    </div>
  </cx>
);
