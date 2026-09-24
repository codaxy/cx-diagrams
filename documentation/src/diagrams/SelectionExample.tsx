/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape } from "cx-diagrams";
import { createModel } from "cx/data";
import { Svg } from "cx/svg";
import { KeySelection, tpl } from "cx/ui";
import { Repeater } from "cx/widgets";

interface ShapeRecord {
  id: string;
  text: string;
  shape: "rectangle" | "circle" | "rhombus";
}

interface Model {
  selection: string[];
  $shape: ShapeRecord;
}

const m = createModel<Model>();

const shapes: ShapeRecord[] = [
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
        text={tpl(m.selection, "Selected: {0:s}")}
      />
      <Svg class="w-full h-full min-h-[360px] min-w-[600px] bg-white border-t border-b">
        <Diagram center showGrid>
          <Flow direction="right" gap={2}>
            <Repeater records={shapes} recordAlias={m.$shape}>
              <Cell width={3} height={2}>
                <Shape
                  id={m.$shape.id}
                  text={m.$shape.text}
                  shape={m.$shape.shape}
                  stroke="gray"
                  fill="white"
                  selection={{
                    type: KeySelection,
                    bind: m.selection,
                    keyField: "id",
                    multiple: true,
                    record: m.$shape,
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
