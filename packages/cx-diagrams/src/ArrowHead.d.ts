import { NumberProp, StringProp, Widget, ClassProp, StyleProp, BooleanProp } from "cx/src/core";
import { NodeProps } from "./Node";

export interface ArrowHeadProps extends NodeProps {
   position: "start" | "middle" | "end" | StringProp;
   shape: "triangle" | "line" | "vback" | StringProp;
   size?: NumberProp;
   fill?: StringProp;
   stroke?: StringProp;
   class?: ClassProp;
   className?: ClassProp;
   style?: StyleProp;
   aspectRatio?: NumberProp;
   reverse?: BooleanProp;
}

export class ArrowHead extends Widget<ArrowHeadProps> {}
