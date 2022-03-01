import { NumberProp, PureContainerProps, StringProp, Widget } from "cx/src/core";

export interface NodeProps extends PureContainerProps {
   /** Unique identifier of the node. */
   id?: StringProp;

   /** Padding. */
   m?: NumberProp;

   /** Padding. */
   margin?: NumberProp;

   /** Left margin. */
   ml?: NumberProp;

   /** Right margin. */
   mr?: NumberProp;

   /** Tom maddding. */
   mt?: NumberProp;

   /** Bottom margin. */
   mb?: NumberProp;

   /** Horizontal margin. */
   mx?: NumberProp;

   /** Vertical margin. */
   my?: NumberProp;

   /** Start margin (margin before the element in the direction of the flow). */
   ms?: NumberProp;

   /** End margin (margin after the element in the direction of the flow). */
   me?: NumberProp;
}

export class Node extends Widget<NodeProps> {}
