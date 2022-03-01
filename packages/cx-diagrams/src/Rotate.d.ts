import { NumberProp, Widget } from "cx/src/core";
import { NodeProps } from "./Node";

export interface RotateProps extends NodeProps {
   /** Number of rotation turns. One turn equals 90 degrees. */
   turns?: NumberProp;
}

export class Rotate extends Widget<RotateProps> {}
