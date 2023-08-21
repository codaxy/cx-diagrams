import { BoundedObject } from "cx/svg";
import { VDOM } from "cx/ui";

export class ArrowHead extends BoundedObject {
   declareData() {
      return super.declareData(...arguments, {
         position: undefined,
         shapeType: undefined,
         fill: undefined,
         size: undefined,
         width: undefined,
      });
   }

   explore(context, instance) {
      super.explore(context, instance);
   }

   prepare(context, instance) {
      let { data } = instance;

      data.lines = context.getLinesSegment();
   }

   calculatePositions(context, instance) {
      const { data } = instance;
      const { position, size } = data;

      if (data.lines.length === 0) {
         throw new Error("Arrow Head must have at least one parent line");
      }

      if (position === "start" || position === "end") {
         const lineIndex = position === "start" ? 0 : data.lines.length - 1;
         const line = data.lines[lineIndex];
         const dx = line.x2 - line.x1;
         const dy = line.y2 - line.y1;
         const length = Math.sqrt(dx * dx + dy * dy);
         const angleRadians = Math.atan2(line.x2 - line.x1, line.y2 - line.y1);
         const angleDegrees = -angleRadians * (180 / Math.PI);

         let x;
         let y;
         if (position === "start") {
            x = line.x1 + (size / length) * dx;
            y = line.y1 + (size / length) * dy;
         } else {
            x = line.x2;
            y = line.y2;
         }

         return [
            {
               x,
               y,
               angle: angleDegrees,
            },
         ];
      } else if (position === "middle") {
         const arrowPositions = [];

         for (const line of data.lines) {
            const midX = (line.x1 + line.x2) / 2;
            const midY = (line.y1 + line.y2) / 2;

            const dx = line.x2 - line.x1;
            const dy = line.y2 - line.y1;
            const length = Math.sqrt(dx * dx + dy * dy);

            const offsetX = (size / 2) * (dx / length);
            const offsetY = (size / 2) * (dy / length) * -1; // Invert y-coordinate

            const angleRadians = Math.atan2(line.x2 - line.x1, line.y2 - line.y1);
            const angleDegrees = -angleRadians * (180 / Math.PI);

            arrowPositions.push({
               x: midX + offsetX,
               y: midY - offsetY,
               angle: angleDegrees,
            });
         }

         return arrowPositions;
      }

      return [];
   }

   getPathDefinition(shapeType, x, y, size, halfWidth) {
      switch (shapeType) {
         case "triangle":
            return `M${x},${y} L${x - 0.5 * size},${y - 0.5 * size} L${x},${y - 0.4 * size} L${x + 0.5 * size},${
               y - 0.5 * size
            } L${x},${y}`;

         default:
            return `M${x},${y} L${x - size + halfWidth},${y - size} L${x + size - halfWidth},${y - size} Z`;
      }
   }

   render(context, instance, key) {
      const { data } = instance;
      const positions = this.calculatePositions(context, instance);

      const lines = positions.map((p, index) => {
         const path = this.getPathDefinition(data.shapeType, p.x, p.y, data.size, data.width / 2);
         return <path key={index} d={path} fill="currentColor" transform={`rotate(${p.angle} ${p.x} ${p.y})`} />;
      });

      return lines;
   }
}

ArrowHead.prototype.baseClass = "arrow-head";
ArrowHead.prototype.size = 12;
ArrowHead.prototype.width = 10;
