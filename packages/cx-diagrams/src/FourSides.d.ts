import { NumberProp, Prop, Widget } from "cx/src/core";
import { NodeProps } from "./Node";

export interface FourSidesProps extends NodeProps {
   /** Gap between elements. */
   gap?: NumberProp;

   /** Order of slots. Default is ['center', 'right', 'down', 'left', 'up']. */
   slots?: Prop<string[]>;
}

export class FourSides extends Widget<FourSidesProps> {}
