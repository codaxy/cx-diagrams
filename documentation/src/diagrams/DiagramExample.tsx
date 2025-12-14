/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape } from "cx-diagrams";
import { Svg } from "cx/svg";
import { bind, tpl, Controller } from "cx/ui";

class PageController extends Controller {
  onInit() {
    this.store.init("$page.view", {
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    });
  }
}

export default () => (
  <cx>
    <div class="w-full h-full relative" controller={PageController}>
      <Svg class="w-full h-full bg-white">
        <Diagram
          unitSize={32}
          showGrid
          zoom={bind("$page.view.zoom")}
          offsetX={bind("$page.view.offsetX")}
          offsetY={bind("$page.view.offsetY")}
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
          "Zoom: {$page.view.zoom:p;0} Center ({$page.view.offsetX:n;0}, {$page.view.offsetY:n;0})"
        )}
      />
    </div>
  </cx>
);
