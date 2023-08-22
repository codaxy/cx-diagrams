import { NumberProp, StringProp, Widget } from "cx/src/core";
import { NodeProps } from "./Node";

export interface ArrowHeadProps extends NodeProps {
   position: "start" | "middle" | "end" | StringProp;
   type: "triangle" | "opened" | "default" | StringProp;
   size?: NumberProp;
   fill?: StringProp;
   stroke?: StringProp;
}

export class ArrowHead extends Widget<ArrowHeadProps> {}
