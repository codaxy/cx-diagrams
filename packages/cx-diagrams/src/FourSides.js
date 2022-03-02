import { Node } from "./Node";

export class FourSides extends Node {
   declareData(...args) {
      super.declareData(...args, {
         gap: undefined,
      });
   }

   exploreCleanup(context, instance) {
      let { nodes, data } = instance;
      let innerWidth = 0;
      let innerHeight = 0;

      for (let i = 0; i < this.slots.length; i++) {
         let child = nodes[i];
         let slot = this.slots[i];

         if (!child || !child.box) continue;

         switch (slot) {
            case "down":
            case "up":
            case "center":
               if (child.box.width > innerWidth) innerWidth = child.box.width;
               break;
         }

         switch (slot) {
            case "right":
            case "left":
            case "center":
               if (child.box.height > innerHeight) innerHeight = child.box.height;
               break;
         }
      }

      let col = -innerWidth / 2,
         row = -innerHeight / 2,
         width = innerWidth,
         height = innerHeight;

      for (let i = 0; i < this.slots.length; i++) {
         let child = nodes[i];
         let slot = this.slots[i];
         if (!child || !child.box) continue;

         switch (slot) {
            case "center":
               child.box.col = (-innerWidth + child.box.width) / 2;
               child.box.row = (-innerHeight + child.box.height) / 2;
               width += innerWidth;
               height += innerHeight;
               break;

            case "right":
               child.box.col = innerWidth / 2;
               child.box.row = (innerHeight - child.box.height) / 2;
               width += child.box.width;
               break;
            case "left":
               child.box.col = -innerWidth / 2 - child.box.width;
               child.box.row = (innerHeight - child.box.height) / 2;
               width += child.box.width;
               col -= child.box.width;
               break;

            case "down":
               child.box.col = (innerWidth - child.box.width) / 2;
               child.box.row = innerHeight / 2;
               height += child.box.height;
               break;

            case "up":
               child.box.col = (innerWidth - child.box.width) / 2;
               child.box.row = -innerHeight / 2 - child.box.height;
               height += child.box.height;
               row -= child.box.height;
               break;
         }
      }

      let { ml, mr, mt, mb, ms, me } = data;

      instance.box = {
         row,
         col,
         width,
         height,
         ml,
         mr,
         mb,
         mt,
         ms,
         me,
      };

      super.exploreCleanup(context, instance);
   }
}

FourSides.prototype.slots = ["center", "right", "down", "left", "up"];

FourSides.prototype.gap = 0;
