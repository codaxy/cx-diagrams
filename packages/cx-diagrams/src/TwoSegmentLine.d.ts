import { Widget } from 'cx/ui';
import { Line, LineProps } from 'cx/svg';

interface TwoSegmentLineProps extends LineProps {
   startOffset?: Cx.NumberProp;
   direction?: Cx.StringProp;;
}

export class TwoSegmentLine extends Cx.Widget<TwoSegmentLineProps> {}
