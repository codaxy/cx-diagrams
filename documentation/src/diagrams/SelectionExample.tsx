/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape } from "cx-diagrams";
import { Svg } from "cx/svg";
import { KeySelection, bind, tpl } from "cx/ui";
import { Repeater } from "cx/widgets";

const shapes = [
  { id: "a", text: "A", shape: "rectangle" },
  { id: "b", text: "B", shape: "rectangle" },
  { id: "c", text: "C", shape: "circle" },
  { id: "d", text: "D", shape: "rhombus" },
];

export default () => (
  <cx>
    <div class="w-full">
      <div
        class="px-3 py-2 text-sm text-gray-600 border-t bg-gray-50"
        text={tpl("Selected: {selection:s}")}
      />
      <Svg class="w-full h-full min-h-[360px] min-w-[600px] bg-white border-t border-b">
        <Diagram center showGrid>
          <Flow direction="right" gap={2}>
            <Repeater records={shapes} recordAlias="$shape">
              <Cell width={3} height={2}>
                <Shape
                  id={bind("$shape.id")}
                  text={bind("$shape.text")}
                  shape={bind("$shape.shape")}
                  stroke="gray"
                  fill="white"
                  selection={{
                    type: KeySelection,
                    bind: "selection",
                    keyField: "id",
                    multiple: true,
                    record: { bind: "$shape" },
                  }}
                />
              </Cell>
            </Repeater>
          </Flow>
        </Diagram>
      </Svg>
    </div>
  </cx>
);
