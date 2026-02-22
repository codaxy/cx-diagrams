/** @jsxImportSource cx */
import { Cell, Diagram, Draggable, Flow, Shape } from "cx-diagrams";
import { Rectangle, Svg } from "cx/svg";
import { bind } from "cx/ui";

export default () => (
  <cx>
    <Svg class="w-full h-full min-h-[400px] min-w-[600px] bg-white border-t border-b">
      <Diagram center showGrid>
        <Flow direction="down" gap={2} align="center">
          <Draggable
            offsetX={bind("$page.cell1.offsetX", 0)}
            offsetY={bind("$page.cell1.offsetY", 0)}
          >
            <Cell width={3}>
              <Shape
                text="Drag me"
                shapeClass="fill-blue-200 stroke-blue-600"
              />
            </Cell>
          </Draggable>
          <Draggable
            offsetX={bind("$page.cell2.offsetX", 0)}
            offsetY={bind("$page.cell2.offsetY", 0)}
          >
            <Cell width={3}>
              <Shape
                text="Drag me too"
                shapeClass="fill-green-200 stroke-green-600"
              />
            </Cell>
          </Draggable>
          <Draggable
            offsetX={bind("$page.group.offsetX", 0)}
            offsetY={bind("$page.group.offsetY", 0)}
          >
            <Flow direction="right" gap={1} p={0.5}>
              <Rectangle class="fill-gray-100 stroke-gray-300" />
              <Cell width={3}>
                <Shape
                  text="Group A"
                  shapeClass="fill-orange-200 stroke-orange-600"
                />
              </Cell>
              <Cell width={3}>
                <Shape
                  text="Group B"
                  shapeClass="fill-orange-200 stroke-orange-600"
                />
              </Cell>
            </Flow>
          </Draggable>
        </Flow>
      </Diagram>
    </Svg>
  </cx>
);
