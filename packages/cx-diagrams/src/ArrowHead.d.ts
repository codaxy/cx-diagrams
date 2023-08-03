import { Widget } from "cx/src/core";
import { NodeProps } from "./Node";

export interface ArrowHeadProps extends NodeProps {
   position?: "start" | "middle" | "end";
}

export class ArrowHead extends Widget<ArrowHeadProps> {}
