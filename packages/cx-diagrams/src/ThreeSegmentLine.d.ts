import { NumberProp, StringProp, Widget } from "cx/src/core";
import { StraightLineProps } from "./StraightLine";

interface ThreeSegmentLineProps extends StraightLineProps {
   startOffset?: NumberProp;
   direction?: StringProp;
}

export class ThreeSegmentLine extends Widget<ThreeSegmentLineProps> {}
