import { BooleanProp, NumberProp, Widget } from "cx/src/core";
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

   /** Set to true to center the content both horizontally and vertically. */
   center?: boolean;

   /** Set to true to center the content horizontally. */
   centerX?: boolean;

   /** Set to true to center the content vertically. */
   centerY?: boolean;

   showGrid?: BooleanProp;

   /** Set to true to disable zooming and panning. */
   fixed?: BooleanProp;
}

export class Diagram extends Widget<DiagramProps> {}
