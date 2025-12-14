import { Rect } from "cx/svg";
import {
  PureContainer,
  PureContainerConfig,
  Instance,
  RenderingContext,
  NumberProp,
  StringProp,
  PureContainerBase,
} from "cx/ui";
import { DiagramState } from "./DiagramState";

export interface NodeConfig extends PureContainerConfig {
  /** Unique identifier of the node. */
  id?: StringProp;

  /** Margin. */
  margin?: NumberProp;

  /** Margin. */
  m?: NumberProp;

  /** Left margin. */
  ml?: NumberProp;

  /** Right margin. */
  mr?: NumberProp;

  /** Top margin. */
  mt?: NumberProp;

  /** Bottom margin. */
  mb?: NumberProp;

  /** Horizontal margin. */
  mx?: NumberProp;

  /** Vertical margin. */
  my?: NumberProp;

  /** Start margin (margin before the element in the direction of the flow). */
  ms?: NumberProp;

  /** End margin (margin after the element in the direction of the flow). */
  me?: NumberProp;
}

export interface NodeData {
  id?: string;
  margin?: number;
  m?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  mx?: number;
  my?: number;
  ms?: number;
  me?: number;
}

export interface Box {
  row: number;
  col: number;
  width: number;
  height: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  ms?: number;
  me?: number;
  selfAlign?: string;
}

export interface NodeInstance extends Instance {
  data: NodeData;
  diagram: DiagramState;
  nodes: NodeInstance[];
  box?: Box;
  bounds?: Rect;
}

export class Node extends PureContainerBase<NodeConfig> {
  constructor(config?: NodeConfig) {
    super(config);
  }

  declare margin: number;
  declare m?: number;
  declare ml?: number;
  declare mr?: number;
  declare mt?: number;
  declare mb?: number;
  declare mx?: number;
  declare my?: number;
  declare ms: number;
  declare me: number;

  declareData(...args: any[]) {
    super.declareData(...args, {
      id: undefined,
      margin: undefined,
      m: undefined,
      ml: undefined,
      mr: undefined,
      mt: undefined,
      mb: undefined,
      mx: undefined,
      my: undefined,
      ms: undefined,
      me: undefined,
    });
  }

  prepareData(context: RenderingContext, instance: NodeInstance) {
    let { data } = instance;
    data.ml = data.ml ?? data.mx ?? data.m ?? data.margin;
    data.mr = data.mr ?? data.mx ?? data.m ?? data.margin;
    data.mt = data.mt ?? data.my ?? data.m ?? data.margin;
    data.mb = data.mb ?? data.my ?? data.m ?? data.margin;
    super.prepareData(context, instance);
  }

  explore(context: RenderingContext, instance: NodeInstance) {
    instance.diagram = context.diagram;
    instance.nodes = [];
    if (context.registerDiagramNode) context.registerDiagramNode(instance);
    context.push("registerDiagramNode", (node: NodeInstance) =>
      instance.nodes.push(node)
    );
    super.explore(context, instance);
  }

  exploreCleanup(context: RenderingContext, instance: NodeInstance) {
    context.pop("registerDiagramNode");
  }

  calculateBounds(context: RenderingContext, instance: NodeInstance): Rect {
    let { diagram, box } = instance;

    if (!box) return new Rect();

    var p1 = diagram.map(box.col, box.row);
    var p2 = diagram.map(box.col + box.width, box.row + box.height);

    return new Rect({
      t: p1.y,
      l: p1.x,
      b: p2.y,
      r: p2.x,
    });
  }

  prepare(context: RenderingContext, instance: NodeInstance) {
    instance.bounds = this.calculateBounds(context, instance);
    context.push("parentRect", instance.bounds);
  }

  prepareCleanup(context: RenderingContext, instance: NodeInstance) {
    context.pop("parentRect");
  }
}

Node.prototype.margin = 0;
Node.prototype.m = undefined;
Node.prototype.ml = undefined;
Node.prototype.mr = undefined;
Node.prototype.mt = undefined;
Node.prototype.mb = undefined;
Node.prototype.mx = undefined;
Node.prototype.my = undefined;
Node.prototype.ms = 0;
Node.prototype.me = 0;
