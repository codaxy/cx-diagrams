/** @jsxImportSource cx */
import { Cell, Diagram, Flow, FourSides, Shape } from "cx-diagrams";
import { Rectangle, Svg } from "cx/svg";
import { bind, computable, Controller } from "cx/ui";
import { Label, Radio } from "cx/widgets";

class PageController extends Controller {
  onInit() {
    this.store.init("$page.order", 0);
  }
}

export default () => (
  <cx>
    <div class="w-full h-full relative" controller={PageController}>
      <Svg class="w-full h-full min-h-[500px] bg-white  border-t border-b">
        <Diagram center showGrid>
          <FourSides
            slots={computable("$page.order", (order: number) => {
              switch (order) {
                case 0:
                  return ["center", "right", "down", "left", "up"];
                case 1:
                  return ["center", "down", "left", "up", "right"];
                case 2:
                  return ["center", "left", "up", "right", "down"];
                case 3:
                  return ["center", "up", "right", "down", "left"];
              }
            })}
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
        <Radio value={bind("$page.order")} option={0}>
          1
        </Radio>
        <Radio value={bind("$page.order")} option={1}>
          2
        </Radio>
        <Radio value={bind("$page.order")} option={2}>
          3
        </Radio>
        <Radio value={bind("$page.order")} option={3}>
          4
        </Radio>
      </div>
    </div>
  </cx>
);
