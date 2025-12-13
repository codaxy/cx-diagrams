/** @jsxImportSource cx */
import {
  Cell,
  Diagram,
  Flow,
  FourSides,
  Rotate,
  Shape,
  StraightLine,
  ThreeSegmentLine,
} from "cx-diagrams";
import { Rectangle, Svg, Text } from "cx/svg";
import { bind, Controller } from "cx/ui";
import { ContentPlaceholder, PureContainer, Repeater } from "cx/widgets";

function uid() {
  return Math.random().toString(36).substring(2, 9);
}

function generateNetwork() {
  let connections: { from: string; to: string }[] = [];
  let firewalls: { id: string; name: string }[] = [];
  let switches: { id: string; name: string }[] = [];
  let pcs: { id: string; name: string }[] = [];

  let fw1 = {
    id: uid(),
    name: "FW1",
  };

  let fw2 = {
    id: uid(),
    name: "FW2",
  };

  let sw1 = {
    id: uid(),
    name: "SW1",
  };

  let sw2 = {
    id: uid(),
    name: "SW2",
  };

  firewalls.push(fw1, fw2);
  switches.push(sw1, sw2);

  connections.push({ from: fw1.id, to: fw2.id });
  connections.push({ from: fw1.id, to: sw1.id });
  connections.push({ from: fw2.id, to: sw2.id });
  connections.push({ from: sw1.id, to: sw2.id });

  for (let i = 1; i <= 3; i++) {
    let pc = {
      id: uid(),
      name: `PC${i}`,
    };
    pcs.push(pc);
    connections.push({ from: pc.id, to: sw1.id });
  }

  for (let i = 4; i <= 6; i++) {
    let pc = {
      id: uid(),
      name: `PC${i}`,
    };
    pcs.push(pc);
    connections.push({ from: pc.id, to: sw2.id });
  }

  return {
    firewalls,
    switches,
    pcs,
    connections,
  };
}

class PageController extends Controller {
  onInit() {
    this.store.init("$page.networks", [
      generateNetwork(),
      generateNetwork(),
      generateNetwork(),
      generateNetwork(),
    ]);
  }
}

export default () => (
  <cx>
    <div class="w-full h-full" controller={PageController}>
      <Svg class="w-full h-full bg-white">
        <Diagram unitSize={32} showGrid center>
          <FourSides gap={-3}>
            <Cell width={7} height={6}>
              <Shape id="root" margin={50} />
              <PureContainer putInto="cloud">
                <Rectangle
                  anchors="0.35 0.35 0.65 0.65"
                  class="fill-gray-200 stroke-gray-400"
                />
                <Text
                  value="Internet"
                  class="fill-black"
                  textAnchor="middle"
                  dy="0.5em"
                />
              </PureContainer>
            </Cell>
            <Repeater records={bind("$page.networks")} recordAlias="$network">
              <Rotate turns={bind("$index")}>
                <Flow gap={1} align="center">
                  <Flow direction="down" gap={1} p={0.5}>
                    <Rectangle class="fill-gray-100" />
                    <Repeater records={bind("$network.firewalls")}>
                      <Cell width={2}>
                        <Shape
                          text={bind("$record.name")}
                          class="fill-blue-400"
                          id={bind("$record.id")}
                        />
                      </Cell>
                      <StraightLine
                        from={bind("$record.id")}
                        to="root"
                        stroke="black"
                      />
                    </Repeater>
                  </Flow>
                  <Flow direction="down" gap={1} p={0.5}>
                    <Rectangle class="fill-gray-100" />
                    <Repeater records={bind("$network.switches")}>
                      <Cell width={2}>
                        <Shape
                          text={bind("$record.name")}
                          class="fill-green-400"
                          id={bind("$record.id")}
                        />
                      </Cell>
                    </Repeater>
                  </Flow>
                  <Flow direction="down" gap={1} p={0.5}>
                    <Rectangle class="fill-gray-100" />
                    <Repeater records={bind("$network.pcs")}>
                      <Cell width={2}>
                        <Shape
                          text={bind("$record.name")}
                          class="fill-orange-400"
                          id={bind("$record.id")}
                        />
                      </Cell>
                    </Repeater>
                  </Flow>
                </Flow>
                <Repeater
                  records={bind("$network.connections")}
                  recordAlias="$conn"
                >
                  <ThreeSegmentLine
                    from={bind("$conn.from")}
                    to={bind("$conn.to")}
                    direction="right"
                    class="stroke-black"
                    stroke="black"
                  />
                </Repeater>
              </Rotate>
            </Repeater>
          </FourSides>
          <ContentPlaceholder name="cloud" />
        </Diagram>
      </Svg>
    </div>
  </cx>
);
