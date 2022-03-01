import { Rect } from "cx/svg";
import { PureContainer } from "cx/ui";

export class Node extends PureContainer {
   declareData(...args) {
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

   prepareData(context, instance) {
      let { data } = instance;
      data.ml = data.ml ?? data.mx ?? data.m ?? data.margin;
      data.mr = data.mr ?? data.mx ?? data.m ?? data.margin;
      data.mt = data.mt ?? data.my ?? data.m ?? data.margin;
      data.mb = data.mb ?? data.my ?? data.m ?? data.margin;
      super.prepareData(context, instance);
   }

   explore(context, instance) {
      instance.diagram = context.diagram;
      instance.nodes = [];
      if (context.registerDiagramNode) context.registerDiagramNode(instance);
      context.push("registerDiagramNode", (node) => instance.nodes.push(node));
      super.explore(context, instance);
   }

   exploreCleanup(context, instance) {
      context.pop("registerDiagramNode");
   }

   calculateBounds(context, instance) {
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

   prepare(context, instance) {
      instance.bounds = this.calculateBounds(context, instance);
      context.push("parentRect", instance.bounds);
   }

   prepareCleanup(context, instance) {
      context.pop("parentRect");
   }
}

Node.prototype.margin = 0;
Node.prototype.m = null;
Node.prototype.ml = null;
Node.prototype.mr = null;
Node.prototype.mt = null;
Node.prototype.mb = null;
Node.prototype.mx = null;
Node.prototype.my = null;
Node.prototype.ms = 0;
Node.prototype.me = 0;
