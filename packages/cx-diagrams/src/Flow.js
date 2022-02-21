import { Node } from "./Node";

export class Flow extends Node {
   declareData(...args) {
      super.declareData(...args, {
         padding: undefined,
         gap: undefined,
         p: undefined,
         pl: undefined,
         pr: undefined,
         pt: undefined,
         pb: undefined,
         px: undefined,
         py: undefined,
         fixed: undefined,
      });
   }

   prepareData(context, instance) {
      let { data } = instance;
      data.pl = data.pl ?? data.px ?? data.p ?? data.padding;
      data.pr = data.pr ?? data.px ?? data.p ?? data.padding;
      data.pt = data.pt ?? data.py ?? data.p ?? data.padding;
      data.pb = data.pb ?? data.py ?? data.p ?? data.padding;
      super.prepareData(context, instance);
   }

   exploreCleanup(context, instance) {
      let { data, children } = instance;
      let width = 0,
         height = 0,
         row = 0,
         col = 0;

      let direction = (instance.direction =
         context.rotateDirection && !data.fixed ? context.rotateDirection(this.direction) : this.direction);

      let { pl, pr, pt, pb, gap, ml, mr, mt, mb, ms, me } = data;
      if (direction == "right") {
         width += pl;
         for (let { box } of children) {
            if (!box) continue;
            if (width > pl) width += gap;
            width += box.ml;
            width += box.ms;
            box.col += width;
            box.row += pt + box.mt;
            width += box.width;
            width += box.mr;
            width += box.me;
            height = Math.max(height, box.row + box.height + box.mb + pb);
         }
         width += pr;
      }
      if (direction == "left") {
         width += pr;
         for (let { box } of children) {
            if (!box) continue;
            if (width > pr) width += gap;
            width += box.mr;
            width += box.ms;
            box.col -= width + box.width;
            box.row += pt + box.mt;
            width += box.width;
            width += box.ml;
            width += box.me;
            height = Math.max(height, box.row + box.height + box.mb + pb);
         }
         width += pl;
         col = -width;
      } else if (direction == "down") {
         height += pt;
         for (let { box } of children) {
            if (!box) continue;
            if (height > pt) height += gap;
            height += box.mt;
            box.col += pl + box.ml;
            box.row += height;
            height += box.height;
            height += box.mb;
            width = Math.max(width, box.col + box.width + box.mr + pr);
         }
         height += pb;
      } else if (direction == "up") {
         height += pb;
         for (let { box } of children) {
            if (!box) continue;
            if (height > pb) height += gap;
            height += box.mb;
            height += box.ms;
            box.col += pl + box.ml;
            box.row -= height + box.height;
            height += box.height;
            height += box.mt;
            height += box.me;
            width = Math.max(width, box.col + box.width + box.mr + pr);
         }
         height += pt;
         row -= height;
      }

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
   }

   prepare(context, instance) {
      let { box, children, data } = instance;
      let innerWidth = box.width - data.pl - data.pr;
      let innerHeight = box.height - data.pt - data.pb;

      for (let child of children) {
         if (!child.box) continue;

         switch (instance.direction) {
            case "right":
               child.box.col += box.col;
               child.box.row += box.row;

               if (this.align == "center") child.box.row += (innerHeight - child.box.height) / 2;

               break;

            case "down":
               child.box.col += box.col;
               child.box.row += box.row;

               if (this.align == "center") child.box.col += (innerWidth - child.box.width) / 2;
               break;

            case "left":
               child.box.col += box.col + box.width;
               child.box.row += box.row;

               if (this.align == "center") child.box.row += (innerHeight - child.box.height) / 2;
               break;

            case "up":
               child.box.col += box.col;
               child.box.row += box.row + box.height;

               if (this.align == "center") child.box.col += (innerWidth - child.box.width) / 2;
               break;
         }
      }
      super.prepare(context, instance);
   }
}

Flow.prototype.direction = "right";
Flow.prototype.align = "start";
Flow.prototype.gap = 0;
Flow.prototype.padding = 0;
Flow.prototype.margin = 0;
Flow.prototype.fixed = false;

Flow.prototype.pl = null;
Flow.prototype.pr = null;
Flow.prototype.pt = null;
Flow.prototype.pb = null;
Flow.prototype.px = null;
Flow.prototype.py = null;
