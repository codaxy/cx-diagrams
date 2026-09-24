/** @jsxImportSource cx */
import { Cell, Diagram, Draggable, Flow, Shape } from "cx-diagrams";
import { createModel } from "cx/data";
import { Rectangle, Svg } from "cx/svg";
import { bind } from "cx/ui";

interface Position {
  offsetX: number;
  offsetY: number;
}

interface Model {
  cell1: Position;
  cell2: Position;
  group: Position;
}

const m = createModel<Model>();

export default () => (
  <cx>
    <Svg class="w-full h-full min-h-[400px] min-w-[600px] bg-white border-t border-b">
      <Diagram center showGrid>
        <Flow direction="down" gap={2} align="center">
          <Draggable
            offsetX={bind(m.cell1.offsetX, 0)}
            offsetY={bind(m.cell1.offsetY, 0)}
          >
            <Cell width={3}>
              <Shape
                text="Drag me"
                shapeClass="fill-blue-200 stroke-blue-600"
              />
            </Cell>
          </Draggable>
          <Draggable
            offsetX={bind(m.cell2.offsetX, 0)}
            offsetY={bind(m.cell2.offsetY, 0)}
          >
            <Cell width={3}>
              <Shape
                text="Drag me too"
                shapeClass="fill-green-200 stroke-green-600"
              />
            </Cell>
          </Draggable>
          <Draggable
            offsetX={bind(m.group.offsetX, 0)}
            offsetY={bind(m.group.offsetY, 0)}
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
