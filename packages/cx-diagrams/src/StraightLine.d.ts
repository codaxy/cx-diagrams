import { StringProp, Widget } from "cx/src/core";
import { LineProps } from "cx/src/svg/Line";

export interface StraightLineProps extends LineProps {
   /** Id of the start shape. */
   from: StringProp;

   /** Id of the end shape. */
   to: StringProp;
}

export class StraightLine extends Widget<StraightLineProps> {}
