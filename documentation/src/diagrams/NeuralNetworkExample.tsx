/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape, StraightLine } from "cx-diagrams";
import { Svg } from "cx/svg";
import { bind, expr, LabelsTopLayout, Controller } from "cx/ui";
import { Repeater, Slider } from "cx/widgets";

function uid() {
  return Math.random().toString(36).substring(2, 9);
}

interface NetworkNode {
  id: string;
  name: string;
}

interface NetworkLayer {
  nodes: NetworkNode[];
  type: string;
}

interface Network {
  layers: NetworkLayer[];
  connections: { from: string; to: string }[];
}

interface Options {
  inputs: number;
  outputs: number;
  hiddenLayers: number;
  hiddenNodes: number;
}

class PageController extends Controller {
  onInit() {
    this.store.init("$page.options", {
      inputs: 3,
      outputs: 1,
      hiddenLayers: 2,
      hiddenNodes: 5,
    });

    this.addComputable(
      "$page.network",
      ["$page.options"],
      (options: Options): Network => {
        let network: Network = {
          layers: [],
          connections: [],
        };

        let inputLayer: NetworkLayer = {
          nodes: [],
          type: "input",
        };

        for (let i = 1; i <= options.inputs; i++) {
          inputLayer.nodes.push({
            id: uid(),
            name: `I-${i}`,
          });
        }

        network.layers.push(inputLayer);

        for (let h = 1; h <= options.hiddenLayers; h++) {
          let hiddenLayer: NetworkLayer = {
            nodes: [],
            type: "hidden",
          };
          for (let i = 1; i <= options.hiddenNodes; i++) {
            hiddenLayer.nodes.push({
              id: uid(),
              name: `H-${h}-${i}`,
            });
          }
          network.layers.push(hiddenLayer);
        }

        let outputLayer: NetworkLayer = {
          nodes: [],
          type: "output",
        };

        for (let i = 1; i <= options.outputs; i++) {
          outputLayer.nodes.push({
            id: uid(),
            name: `O-${i}`,
          });
        }

        network.layers.push(outputLayer);

        for (let l = 1; l < network.layers.length; l++) {
          let l1 = network.layers[l - 1];
          let l2 = network.layers[l];

          for (let i = 0; i < l1.nodes.length; i++)
            for (let j = 0; j < l2.nodes.length; j++)
              network.connections.push({
                from: l1.nodes[i].id,
                to: l2.nodes[j].id,
              });
        }

        return network;
      }
    );
  }
}

export default () => (
  <cx>
    <div class="w-full h-full flex flex-col" controller={PageController}>
      <Svg class="w-full flex-grow bg-white">
        <Diagram unitSize={48} showGrid center>
          <Flow gap={2} align="center">
            <Repeater
              records={bind("$page.network.layers")}
              recordAlias="$layer"
            >
              <Flow direction="down" gap={0.5}>
                <Repeater records={bind("$layer.nodes")}>
                  <Cell>
                    <Shape
                      text={bind("$record.name")}
                      id={bind("$record.id")}
                      shape="circle"
                      class={{
                        "fill-blue-200 stroke-blue-600": expr(
                          '{$layer.type} == "input"'
                        ),
                        "fill-orange-200 stroke-orange-600": expr(
                          '{$layer.type} == "hidden"'
                        ),
                        "fill-green-200 stroke-green-600": expr(
                          '{$layer.type} == "output"'
                        ),
                      }}
                    />
                  </Cell>
                </Repeater>
              </Flow>
            </Repeater>
          </Flow>
          <Repeater
            records={bind("$page.network.connections")}
            recordAlias="$conn"
          >
            <StraightLine
              from={bind("$conn.from")}
              to={bind("$conn.to")}
              stroke="black"
            />
          </Repeater>
        </Diagram>
      </Svg>
      <div class="border-t bg-white px-2 flex justify-center">
        <LabelsTopLayout class="-mt-2">
          <Slider
            value={bind("$page.options.inputs")}
            min={1}
            max={5}
            step={1}
            label="Inputs"
            class="w-32"
            help={bind("$page.options.inputs")}
          />
          <Slider
            value={bind("$page.options.hiddenLayers")}
            min={1}
            max={4}
            step={1}
            label="Hidden Layers"
            class="w-32"
            help={bind("$page.options.hiddenLayers")}
          />
          <Slider
            value={bind("$page.options.hiddenNodes")}
            min={1}
            max={8}
            step={1}
            label="Hidden Layer Size"
            class="w-32"
            help={bind("$page.options.hiddenNodes")}
          />
          <Slider
            value={bind("$page.options.outputs")}
            min={1}
            max={5}
            step={1}
            label="Outputs"
            class="w-32"
            help={bind("$page.options.outputs")}
          />
        </LabelsTopLayout>
      </div>
    </div>
  </cx>
);
