/** @jsxImportSource cx */
import { Cell, Diagram, Flow, Shape, StraightLine } from "cx-diagrams";
import { createModel } from "cx/data";
import { Svg } from "cx/svg";
import { bind, equal, LabelsTopLayout, Controller } from "cx/ui";
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

interface Model {
  options: Options;
  network: Network;
  $layer: NetworkLayer;
  $record: NetworkNode;
  $conn: { from: string; to: string };
}

const m = createModel<Model>();

class PageController extends Controller {
  onInit() {
    this.store.init(m.options, {
      inputs: 3,
      outputs: 1,
      hiddenLayers: 2,
      hiddenNodes: 5,
    });

    this.addComputable(
      m.network,
      [m.options],
      (options): Network => {
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
    <div
      class="w-full h-full flex flex-col min-h-[500px] min-w-[600px]  border-t border-b"
      controller={PageController}
    >
      <div class="bg-white px-2 flex justify-center border-b">
        <LabelsTopLayout class="-mt-2">
          <Slider
            value={m.options.inputs}
            min={1}
            max={5}
            step={1}
            label="Inputs"
            class="w-32"
            help={bind(m.options.inputs)}
          />
          <Slider
            value={m.options.hiddenLayers}
            min={1}
            max={4}
            step={1}
            label="Hidden Layers"
            class="w-32"
            help={bind(m.options.hiddenLayers)}
          />
          <Slider
            value={m.options.hiddenNodes}
            min={1}
            max={8}
            step={1}
            label="Hidden Layer Size"
            class="w-32"
            help={bind(m.options.hiddenNodes)}
          />
          <Slider
            value={m.options.outputs}
            min={1}
            max={5}
            step={1}
            label="Outputs"
            class="w-32"
            help={bind(m.options.outputs)}
          />
        </LabelsTopLayout>
      </div>
      <Svg class="w-full flex-grow bg-white">
        <Diagram unitSize={48} showGrid center>
          <Flow gap={2} align="center">
            <Repeater
              records={m.network.layers}
              recordAlias={m.$layer}
            >
              <Flow direction="down" gap={0.5}>
                <Repeater records={m.$layer.nodes}>
                  <Cell>
                    <Shape
                      text={m.$record.name}
                      id={m.$record.id}
                      shape="circle"
                      class={{
                        "fill-blue-200 stroke-blue-600": equal(m.$layer.type, "input"),
                        "fill-orange-200 stroke-orange-600": equal(m.$layer.type, "hidden"),
                        "fill-green-200 stroke-green-600": equal(m.$layer.type, "output"),
                      }}
                    />
                  </Cell>
                </Repeater>
              </Flow>
            </Repeater>
          </Flow>
          <Repeater
            records={m.network.connections}
            recordAlias={m.$conn}
          >
            <StraightLine
              from={m.$conn.from}
              to={m.$conn.to}
              stroke="black"
            />
          </Repeater>
        </Diagram>
      </Svg>
    </div>
  </cx>
);
