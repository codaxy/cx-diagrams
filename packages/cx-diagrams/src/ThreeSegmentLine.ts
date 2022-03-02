import { NumberProp, StringProp, Widget } from 'cx/src/core';
import { Line, LineProps } from 'cx/svg';

interface ThreeSegmentLineProps extends LineProps {
   startOffset?: NumberProp;
   direction?: StringProp;;
}

export class ThreeSegmentLine extends Widget<ThreeSegmentLineProps> {}
