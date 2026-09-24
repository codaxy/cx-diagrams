/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape } from "cx-diagrams";
import { createModel } from "cx/data";
import { Svg } from "cx/svg";
import { tpl, Controller } from "cx/ui";

interface Model {
  view: { zoom: number; offsetX: number; offsetY: number };
}

const m = createModel<Model>();

class PageController extends Controller {
  onInit() {
    this.store.init(m.view, {
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    });
  }
}

export default () => (
  <cx>
    <Svg
      class="w-full min-h-[200px] h-full bg-white  border-t border-b"
      controller={PageController}
    >
      <Diagram
        unitSize={32}
        showGrid
        zoom={m.view.zoom}
        offsetX={m.view.offsetX}
        offsetY={m.view.offsetY}
        center
      >
        <Flow gap={1}>
          <Cell width={4} height={2}>
            <Shape stroke="red" fill="white" text="Red" />
          </Cell>
          <Cell width={4} height={2}>
            <Shape stroke="blue" fill="white" text="Blue" />
          </Cell>
        </Flow>
      </Diagram>
    </Svg>
    <div
      class="absolute border bottom-2 left-2 bg-white text-[10px] uppercase p-1"
      text={tpl(
        m.view.zoom,
        m.view.offsetX,
        m.view.offsetY,
        "Zoom: {0:p;0} Center ({1:n;0}, {2:n;0})"
      )}
    />
  </cx>
);
