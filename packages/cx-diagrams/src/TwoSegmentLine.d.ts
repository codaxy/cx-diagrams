import { NumberProp, StringProp, Widget } from "cx/src/core";
import { Line, LineProps } from "cx/svg";

interface TwoSegmentLineProps extends LineProps {
   startOffset?: NumberProp;
   direction?: StringProp;
}

export class TwoSegmentLine extends Widget<TwoSegmentLineProps> {}
