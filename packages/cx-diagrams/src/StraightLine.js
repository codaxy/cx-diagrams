import { Rect } from "cx/svg";
import { Container, VDOM } from "cx/ui";
import { getLinesIntersectionPoint } from "./util/getLinesIntersectionPoint";

export class StraightLine extends Container {
   declareData(...args) {
      super.declareData(...args, {
         from: undefined,
         to: undefined,
         stroke: undefined,
      });
   }

   calculateBounds(context, instance) {
      let { data } = instance;

      if (!data.from || !data.to || !context.diagram) return new Rect();

      if (!context.diagram.hasShape(data.from) || !context.diagram.hasShape(data.to)) return new Rect();
      let { bounds: sb, shape: startShape } = context.diagram.getShape(data.from);
      let { bounds: eb, shape: endShape } = context.diagram.getShape(data.to);

      let t = (sb.t + sb.b) / 2,
         l = (sb.l + sb.r) / 2,
         b = (eb.t + eb.b) / 2,
         r = (eb.l + eb.r) / 2;

      if (startShape == "circle") {
         let radius = Math.min(sb.width() / 2, sb.height() / 2);
         let { x, y } = circleIntersection(t, l, b, r, radius);
         l = x;
         t = y;
      } else if (startShape == "rectangle") {
         let { x, y } = rectIntersection(t, l, b, r, sb.width() / 2, sb.height() / 2);
         l = x;
         t = y;
      } else if (startShape == "rhombus") {
         let { x, y } = rhombusIntersection(l, t, r, b, sb.width() / 2, sb.height() / 2);
         l = x;
         t = y;
      }
      if (endShape == "circle") {
         let radius = Math.min(eb.width() / 2, eb.height() / 2);
         let { x, y } = circleIntersection(b, r, t, l, radius);
         b = y;
         r = x;
      } else if (endShape == "rectangle") {
         let { x, y } = rectIntersection(b, r, t, l, eb.width() / 2, eb.height() / 2);
         b = y;
         r = x;
      } else if (endShape == "rhombus") {
         let { x, y } = rhombusIntersection(r, b, l, t, eb.width() / 2, eb.height() / 2);
         b = y;
         r = x;
      }
      instance.lines = [{ y1: t, x1: l, y2: b, x2: r }];
      return new Rect({ t, r, b, l });
   }

   prepare(context, instance) {
      instance.bounds = this.calculateBounds(context, instance);
      if (!instance.bounds.isEqual(instance.cached.bounds)) instance.markShouldUpdate(context);
      context.push("parentRect", instance.bounds);
      context.push("getLinesSegment", () => instance.lines);
   }

   prepareCleanup(context, instance) {
      context.pop("parentRect");
      context.pop("getLinesSegment");
   }

   render(context, instance, key) {
      let { data, colorIndex, bounds } = instance;
      return (
         <g key={key} className={data.classNames}>
            <line
               className={this.CSS.element(this.baseClass, "line", colorIndex != null && "color-" + colorIndex)}
               x1={bounds.l}
               y1={bounds.t}
               x2={bounds.r}
               y2={bounds.b}
               style={data.style}
               stroke={data.stroke}
            />
            {this.renderChildren(context, instance)}
         </g>
      );
   }
}

StraightLine.prototype.baseClass = "line";
StraightLine.prototype.styled = true;

function circleIntersection(t, l, b, r, radius) {
   let d = Math.sqrt(Math.pow(t - b, 2) + Math.pow(r - l, 2));
   return {
      x: l + (radius / d) * (r - l),
      y: t + (radius / d) * (b - t),
   };
}

function rhombusIntersection(x1, y1, x2, y2, halfw, halfh) {
   if (x1 == x2) {
      return {
         x: x1,
         y: y2 > y1 ? y1 + halfh : y1 - halfh,
      };
   }

   if (y1 == y2) {
      return {
         y: y1,
         x: x2 > x1 ? x1 + halfw : x1 - halfw,
      };
   }

   const v1y = y1 > y2 ? y1 - halfh : y1 + halfh;
   const v1x = x1;

   const v2y = y1;
   const v2x = x1 > x2 ? x1 - halfw : x1 + halfw;

   const { x, y } = getLinesIntersectionPoint(v1x, v1y, v2x, v2y, x1, y1, x2, y2);

   if (x === undefined || y === undefined) {
      return {
         x: x1,
         y: y1,
      };
   }

   return { x, y };
}

function rectIntersection(t, l, b, r, halfw, halfh) {
   if (l == r) {
      return {
         x: l,
         y: b > t ? t + halfh : t - halfh,
      };
   }

   if (t == b) {
      return {
         y: t,
         x: r > l ? l + halfw : l - halfw,
      };
   }

   //y = k * (x - l) + t,
   //x = l + (y - t) / k
   //n = t - k * l

   let k = (b - t) / (r - l);
   let x = r > l ? l + halfw : l - halfw;
   let y = t + k * (x - l);

   if (Math.abs(y - t) > halfh) {
      y = b > t ? t + halfh : t - halfh;
      x = l + (y - t) / k;
   }

   return {
      x,
      y,
   };
}
