import { Node } from "./Node";

export class Rotate extends Node {
   declareData(...args) {
      super.declareData(...args, {
         turns: undefined,
      });
   }

   explore(context, instance) {
      let turns = (context.rotationSteps || 0) + instance.data.turns;
      context.push("rotationSteps", turns);
      context.push("rotateDirection", (dir) => {
         let directions = ["right", "down", "left", "up"];
         let index = directions.indexOf(dir);
         let direction = (instance.direction = directions[(index + turns) % 4]);
         return direction;
      });
      super.explore(context, instance);
   }

   exploreCleanup(context, instance) {
      context.pop("rotateDirection");
      context.pop("rotationSteps");
      if (instance.nodes.length > 0) instance.box = instance.nodes[0].box;
      super.exploreCleanup(context, instance);
   }
}

Rotate.prototype.turns = 0;
