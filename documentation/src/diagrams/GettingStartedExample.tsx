import { Svg } from "cx/svg";
import { Diagram, Cell, Shape, Flow, StraightLine } from "cx-diagrams";

export default () => (
    <cx>
        <Svg class="w-full h-full bg-white">
            <Diagram unitSize={32} showGrid center>
                <Flow gap={1}>
                    <Cell>
                        <Shape text="Hello" fill="lightblue" id="hello" />
                    </Cell>
                    <Cell>
                        <Shape text="World" fill="lightgreen" id="world" />
                    </Cell>
                </Flow>
                <StraightLine from="hello" to="world" stroke="black" />
            </Diagram>
        </Svg>
    </cx>
);
