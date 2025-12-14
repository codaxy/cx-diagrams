/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Rotate, Shape, StraightLine } from "cx-diagrams";
import { Rectangle, Svg } from "cx/svg";
import { bind, tpl, Controller } from "cx/ui";
import { Slider } from "cx/widgets";

class PageController extends Controller {
  onInit() {
    this.store.init("$page.rotate", 0);
  }
}

export default () => (
  <cx>
    <div class="flex flex-col w-full h-full " controller={PageController}>
      <Svg class="w-full min-h-[400px] flex-grow bg-white border-t border-b">
        <Diagram center showGrid>
          <Rotate turns={bind("$page.rotate")}>
            <Flow gap={1} p={1} align="center">
              <Rectangle stroke="red" />

              <Cell>
                <Shape fill="lightgray" text="1" id="1" />
              </Cell>
              <Cell>
                <Shape fill="lightgray" text="2" id="2" />
              </Cell>
              <Cell>
                <Shape fill="lightgray" text="3" id="3" />
              </Cell>
              <Flow direction="down" gap={1}>
                <Cell>
                  <Shape fill="lightgray" text="4" id="4" />
                </Cell>
                <Cell>
                  <Shape fill="lightgray" text="5" id="5" />
                </Cell>
                <Cell>
                  <Shape fill="lightgray" text="6" id="6" />
                </Cell>
              </Flow>
              <StraightLine from="1" to="2" stroke="black" />
              <StraightLine from="2" to="3" stroke="black" />
              <StraightLine from="3" to="4" stroke="black" />
              <StraightLine from="3" to="5" stroke="black" />
              <StraightLine from="3" to="6" stroke="black" />
            </Flow>
          </Rotate>
        </Diagram>
      </Svg>
      <div class="absolute left-2 bottom-2">
        <Slider
          value={bind("$page.rotate")}
          increment={1}
          minValue={0}
          maxValue={4}
          step={1}
          help={tpl("{$page.rotate} turn(s)")}
        />
      </div>
    </div>
  </cx>
);
