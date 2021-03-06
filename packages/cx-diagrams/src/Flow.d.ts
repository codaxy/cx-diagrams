import { NumberProp, Widget } from "cx/src/core";
import { NodeProps } from "./Node";

export interface FlowProps extends NodeProps {
   /** Gap between items. */
   gap?: NumberProp;

   /** Padding. */
   p?: NumberProp;

   /** Padding. */
   padding?: NumberProp;

   /** Left padding. */
   pl?: NumberProp;

   /** Right padding. */
   pr?: NumberProp;

   /** Top paddding. */
   pt?: NumberProp;

   /** Bottom padding. */
   pb?: NumberProp;

   /** Horizontal padding. */
   px?: NumberProp;

   /** Vertical padding. */
   py?: NumberProp;

   /** Set to true to disable rotation. */
   fixed?: boolean;

   /** Direction of the flow. Default value is `right`. */
   direction?: "right" | "left" | "up" | "down";

   /** Alignment of items. */
   align?: "start" | "center";

   /** Distribute items */
   justify?: null | "space-between";

   /** Change alignment of this particular item */
   selfAlign?: null | "stretch";
}

export class Flow extends Widget<FlowProps> {}
