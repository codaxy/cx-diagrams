import { NumberProp, StringProp, Widget } from "cx/src/core";
import { StraightLineProps } from "./StraightLine";

interface TwoSegmentLineProps extends StraightLineProps {
   startOffset?: NumberProp;
   direction?: StringProp;
}

export class TwoSegmentLine extends Widget<TwoSegmentLineProps> {}
