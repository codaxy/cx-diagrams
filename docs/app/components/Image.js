import { TextualBoundedObject } from 'cx/svg';
import { VDOM } from 'cx/ui';

export class Image extends TextualBoundedObject {
   declareData() {
      super.declareData(...arguments, {
         href: undefined,
      });
   }

   render(context, instance, key) {
      var { data } = instance;
      var { bounds } = data;
      if (!bounds.valid()) return false;
      return (
         <g key={key} className={data.classNames}>
            <image
               href={data.href}
               x={bounds.l}
               y={bounds.t}
               width={bounds.width()}
               height={bounds.height()}
               style={data.style}
               fill={data.fill}
               stroke={data.stroke}
            />
            {this.renderChildren(context, instance)}
         </g>
      );
   }
}

   Image.prototype.baseClass = 'image';
   Image.prototype.anchors = '0 1 1 0';
