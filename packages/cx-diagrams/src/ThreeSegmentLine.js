import { Rect } from "cx/svg";
import { Container, VDOM } from "cx/ui";

export class ThreeSegmentLine extends Container {
   declareData(...args) {
      super.declareData(...args, {
         startOffset: undefined,
         direction: undefined,
         from: undefined,
         to: undefined,
         stroke: undefined,
      });
   }

   explore(context, instance) {
      let { data } = instance;
      instance.direction = context.rotateDirection ? context.rotateDirection(data.direction) : data.direction;
      super.explore(context, instance);
   }

   calculateBounds(context, instance) {
      let { data, direction } = instance;
      let { startOffset } = data;

      if (context.rotateDirection) direction = context.rotateDirection(direction);

      if (!data.from || !data.to || !context.diagram) return new Rect();

      let { bounds: sb, shape: startShape } = context.diagram.getShape(data.from);
      let { bounds: eb, shape: endShape } = context.diagram.getShape(data.to);

      let t = (sb.t + sb.b) / 2,
         l = (sb.l + sb.r) / 2,
         b = (eb.t + eb.b) / 2,
         r = (eb.l + eb.r) / 2;

      if (direction == "right" || direction == "left") {
         if (t < b) t -= startOffset;
         else t += startOffset;
         l = l < r ? sb.r : sb.l;
         r = l < r ? eb.l : eb.r;
         data.x1 = data.x2 = (l + r) / 2;
         data.y1 = t;
         data.y2 = b;
      } else {
         if (l < r) l -= startOffset;
         else l += startOffset;
         t = t < b ? sb.b : sb.t;
         b = t < b ? eb.t : eb.b;
         data.y1 = data.y2 = (t + b) / 2;
         data.x1 = l;
         data.x2 = r;
      }
      return new Rect({ t, r, b, l });
   }

   prepare(context, instance) {
      instance.bounds = this.calculateBounds(context, instance);
      if (!instance.bounds.isEqual(instance.cached.bounds)) instance.markShouldUpdate(context);
      context.push("parentRect", instance.bounds);
   }

   prepareCleanup(context, instance) {
      context.pop("parentRect");
   }

   render(context, instance, key) {
      let { data, colorIndex, bounds } = instance;
      let { x1, y1, x2, y2 } = data;
      let { t, l, b, r } = bounds;

      return (
         <g key={key} className={data.classNames}>
            <line
               className={this.CSS.element(this.baseClass, "line", colorIndex != null && "color-" + colorIndex)}
               x1={l}
               y1={t}
               x2={x1}
               y2={y1}
               style={data.style}
               stroke={data.stroke}
            />
            <line
               className={this.CSS.element(this.baseClass, "line", colorIndex != null && "color-" + colorIndex)}
               x1={x1}
               y1={y1}
               x2={x2}
               y2={y2}
               style={data.style}
               stroke={data.stroke}
            />
            <line
               className={this.CSS.element(this.baseClass, "line", colorIndex != null && "color-" + colorIndex)}
               x1={x2}
               y1={y2}
               x2={r}
               y2={b}
               style={data.style}
               stroke={data.stroke}
            />
            {this.renderChildren(context, instance)}
         </g>
      );
   }
}

ThreeSegmentLine.prototype.startOffset = 0;
ThreeSegmentLine.prototype.direction = "right";
