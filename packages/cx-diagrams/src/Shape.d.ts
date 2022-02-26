import { ClassProp, Config, NumberProp, StringProp, Widget } from "cx/src/core";
import { BoundedObjectProps } from "cx/src/svg/BoundedObject";
import { Instance } from "cx/src/ui/Instance";

interface DiagramBoxProps extends BoundedObjectProps {
   text?: StringProp;
   shape?: "rect" | "circle";
   tooltip?: StringProp | Config;
   textClass?: ClassProp;
   shapeClass?: ClassProp;
   stroke?: StringProp;
   strokeWidth?: NumberProp;
   fill?: StringProp;

   onContextMenu?: (e: MouseEvent, instance: Instance) => void;
   onClick?: (e: MouseEvent, instance: Instance) => void;
}

export class DiagramBox extends Widget<DiagramBoxProps> {}
