import { BoundedObject } from "cx/svg";
import { VDOM } from "cx/ui";

export class ArrowHead extends BoundedObject {
   declareData() {
      return super.declareData(...arguments, {
         position: undefined,
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

         return [
            {
               x: line.x1 + (size / length) * dx,
               y: line.y1 + (size / length) * dy,
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

   render(context, instance, key) {
      const { data } = instance;

      const positions = this.calculatePositions(context, instance);
      const halfWidth = data.width / 2;

      const lines = positions.map((p, index) => {
         return (
            <path
               key={index}
               d={`M${p.x},${p.y} L${p.x - data.size + halfWidth},${p.y - data.size} L${p.x + data.size - halfWidth},${
                  p.y - data.size
               } Z`}
               fill="currentColor"
               transform={`rotate(${p.angle} ${p.x} ${p.y})`}
            />
         );
      });

      return lines;
   }
}

ArrowHead.prototype.baseClass = "arrow-head";
ArrowHead.prototype.size = 12;
ArrowHead.prototype.width = 10;
