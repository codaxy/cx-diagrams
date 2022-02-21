import { Node } from "./Node";

export class Rotate extends Node {
   declareData(...args) {
      super.declareData(...args, {
         steps: undefined,
      });
   }

   explore(context, instance) {
      let steps = (context.rotationSteps || 0) + instance.data.steps;
      context.push("rotationSteps", this.steps);
      context.push("rotateDirection", (dir) => {
         let directions = ["right", "down", "left", "up"];
         let index = directions.indexOf(dir);
         let direction = (instance.direction = directions[(index + steps) % 4]);
         return direction;
      });
      super.explore(context, instance);
   }

   exploreCleanup(context, instance) {
      context.pop("rotateDirection");
      context.pop("rotationSteps");
   }
}

Rotate.prototype.steps = 0;
