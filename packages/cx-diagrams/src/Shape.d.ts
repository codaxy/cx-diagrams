import { BoundedObjectProps } from 'cx/svg';

interface DiagramBoxProps extends BoundedObjectProps {
   text?: Cx.StringProp;
   shape?: Cx.StringProp;
   tooltip?: Cx.StringProp | Cx.Config;
   onContextMenu?: (e: MouseEvent, instance: Cx.Instance) => void;
   onClick?: (e: MouseEvent, instance: Cx.Instance) => void;
}

export class DiagramBox extends Cx.Widget<DiagramBoxProps> {}
