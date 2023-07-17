import { ClassProp, Config, NumberProp, StringProp, Widget } from "cx/src/core";
import { BoundedObjectProps } from "cx/src/svg/BoundedObject";
import { Instance } from "cx/src/ui/Instance";

export interface ShapeProps extends BoundedObjectProps {
   id?: StringProp;
   text?: StringProp;
   shape?: "rect" | "circle" | "rhombus";
   tooltip?: StringProp | Config;
   textClass?: ClassProp;
   shapeClass?: ClassProp;
   stroke?: StringProp;
   strokeWidth?: NumberProp;
   fill?: StringProp;

   onContextMenu?: (e: MouseEvent, instance: Instance) => void;
   onClick?: (e: MouseEvent, instance: Instance) => void;
}

export class Shape extends Widget<ShapeProps> {}
