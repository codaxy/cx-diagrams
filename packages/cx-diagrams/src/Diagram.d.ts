import { NumberProp, Widget } from "cx/src/core";
import { BoundedObjectProps } from "cx/src/svg/BoundedObject";

export interface DiagramProps extends BoundedObjectProps {
   /** Zoom level. */
   zoom?: NumberProp;

   /** Horizontal offset (pan). */
   offsetX?: NumberProp;

   /** Vertical offset (pan). */
   offsetY?: NumberProp;

   /** Unit size in pixels. */
   unitSize?: NumberProp;
}

export class Diagram extends Widget<DiagramProps> {}
