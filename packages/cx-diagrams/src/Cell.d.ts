import { NumberProp, Widget } from "cx/src/core";
import { NodeProps } from "./Node";

export interface CellProps extends NodeProps {
   /**Width of the cell. */
   width?: NumberProp;

   /**Width of the cell. */
   w?: NumberProp;

   /**Height of the cell. */
   height?: NumberProp;

   /**Height of the cell. */
   h?: NumberProp;
}

export class Cell extends Widget<CellProps> {}
