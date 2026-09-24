/** @jsxImportSource cx */
import { Cell, Diagram, Flow, FourSides, Shape, type Slot } from "cx-diagrams";
import { createModel } from "cx/data";
import { Rectangle, Svg } from "cx/svg";
import { computable, Controller } from "cx/ui";
import { Label, Radio } from "cx/widgets";

interface Model {
  order: number;
}

const m = createModel<Model>();

const setups: Slot[][] = [
  ["center", "right", "down", "left", "up"],
  ["center", "down", "left", "up", "right"],
  ["center", "left", "up", "right", "down"],
  ["center", "up", "right", "down", "left"],
];

class PageController extends Controller {
  onInit() {
    this.store.init(m.order, 0);
  }
}

export default () => (
  <cx>
    <div class="w-full h-full relative" controller={PageController}>
      <Svg class="w-full h-full min-h-[500px] bg-white  border-t border-b">
        <Diagram center showGrid>
          <FourSides
            slots={computable(m.order, (order) => setups[order])}
          >
            <Cell width={2} height={2}>
              <Shape text="center" fill="lightgreen" />
            </Cell>
            <Flow gap={0.5} p={0.5} align="center">
              <Rectangle stroke="red" />
              <Cell>
                <Shape fill="lightgray" text="1" />
              </Cell>
              <Cell>
                <Shape fill="lightgray" text="2" />
              </Cell>
              <Cell w={2} h={2}>
                <Shape fill="lightgray" text="3" />
              </Cell>
            </Flow>
            <Flow direction="down" gap={0.5} p={0.5} align="center">
              <Rectangle stroke="red" />
              <Cell>
                <Shape fill="lightgray" text="1" />
              </Cell>
              <Cell>
                <Shape fill="lightgray" text="2" />
              </Cell>
              <Cell w={2} h={2}>
                <Shape fill="lightgray" text="3" />
              </Cell>
            </Flow>

            <Flow direction="left" gap={0.5} p={0.5} align="center">
              <Rectangle stroke="red" />
              <Cell>
                <Shape fill="lightgray" text="1" />
              </Cell>
              <Cell>
                <Shape fill="lightgray" text="2" />
              </Cell>
              <Cell w={2} h={2}>
                <Shape fill="lightgray" text="3" />
              </Cell>
            </Flow>

            <Flow direction="up" gap={0.5} p={0.5} align="center">
              <Rectangle stroke="red" />
              <Cell>
                <Shape fill="lightgray" text="1" />
              </Cell>
              <Cell>
                <Shape fill="lightgray" text="2" />
              </Cell>
              <Cell w={2} h={2}>
                <Shape fill="lightgray" text="3" />
              </Cell>
            </Flow>
          </FourSides>
        </Diagram>
      </Svg>
      <div class="absolute bottom-2 left-2 border px-2 bg-white shadow-sm space-x-2">
        <Label>Setup: </Label>
        <Radio value={m.order} option={0}>
          1
        </Radio>
        <Radio value={m.order} option={1}>
          2
        </Radio>
        <Radio value={m.order} option={2}>
          3
        </Radio>
        <Radio value={m.order} option={3}>
          4
        </Radio>
      </div>
    </div>
  </cx>
);
