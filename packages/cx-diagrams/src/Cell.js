import { isDefined } from "cx/util";
import { Node } from "./Node";

export class Cell extends Node {
   init() {
      if (isDefined(this.w)) this.width = this.w;
      if (isDefined(this.h)) this.height = this.h;
      super.init();
   }
   declareData(...args) {
      super.declareData(...args, {
         width: undefined,
         height: undefined,
      });
   }

   explore(context, instance) {
      instance.diagram = context.diagram;
      let { data } = instance;
      instance.box = {
         row: 0,
         col: 0,
         width: data.width,
         height: data.height,
         ml: data.ml,
         mr: data.mr,
         mt: data.mt,
         mb: data.mb,
         ms: data.ms,
         me: data.me,
      };
      super.explore(context, instance);
   }
}

Cell.prototype.width = 1;
Cell.prototype.height = 1;
