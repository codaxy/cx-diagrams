import { VDOM } from 'cx/ui';

import {
   tooltipMouseMove,
   tooltipMouseLeave,
   tooltipParentWillUnmount,
   tooltipParentWillReceiveProps,
   tooltipParentDidMount,
} from 'cx/widgets';

import { BoundedObject } from 'cx/svg';

export class Shape extends BoundedObject {
   declareData() {
      super.declareData(...arguments, {
         id: undefined,
         text: undefined,
         shape: undefined,
         fill: undefined,
         stroke: undefined,
         strokeWidth: undefined
      });
   }

   render(context, instance, key) {
      let { data, widget } = instance;
      let { bounds, text, shape } = data;

      if (!bounds.valid()) return false;

      let shapeProps = {
         className: this.CSS.element(this.baseClass, 'rect'),
         style: data.style,
         fill: data.fill,
         stroke: data.stroke,
         strokeWidth: data.strokeWidth
      };

      let gProps = {
         onMouseMove: (e) => {
            tooltipMouseMove(e, instance, widget.tooltip);
         },
         onMouseLeave: (e) => {
            tooltipMouseLeave(e, instance, widget.tooltip);
         },
      };

      if (widget.onClick) gProps.onClick = (e) => instance.invoke('onClick', e, instance);

      if (widget.onContextMenu) gProps.onContextMenu = (e) => instance.invoke('onContextMenu', e, instance);

      if (widget.tooltip) {
         shapeProps.ref = (c) => {
            this.el = c;
         };
      }

      return (
         <g key={key} {...gProps} className={data.classNames} style={data.style}>
            {this.renderShape(shape, bounds, shapeProps)}
            {this.renderText(shape, bounds, text)}
            {this.renderChildren(context, instance)}
         </g>
      );
   }
   componentWillUnmount() {
      tooltipParentWillUnmount(this.props.instance);
   }
   componentWillReceiveProps(props) {
      tooltipParentWillReceiveProps(this.el, props.instance, props.instance.widget.tooltip);
   }
   componentDidMount() {
      tooltipParentDidMount(this.el, this.props.instance, this.props.instance.widget.tooltip);
   }

   prepare(context, instance) {
      super.prepare(context, instance);
      if (context.diagram) {
         let { id, bounds, shape } = instance.data;
         if (id)
            context.diagram.registerShapeBounds(id, shape, bounds);
      }
   }

   renderShape(shape, bounds, shapeProps) {
      var R = Math.min(bounds.width(), bounds.height());
      switch (shape) {
         case 'circle':
            return (
               <ellipse
                  {...shapeProps}
                  cx={(bounds.l + bounds.r) / 2}
                  cy={(bounds.t + bounds.b) / 2}
                  rx={R / 2}
                  ry={R / 2}
               />
            );

         case 'rectangle':
            return <rect {...shapeProps} x={bounds.l} y={bounds.t} width={bounds.width()} height={bounds.height()} />;
      }
   }

   renderText(shape, bounds, text) {
      let x;
      let y;

      if (shape === 'circle') {
         x = (bounds.l + bounds.r) / 2;
         y = (bounds.t + bounds.b) / 2;
      } else if (shape === 'rectangle') {
         x = bounds.l + bounds.width() / 2;
         y = bounds.t + bounds.height() / 2;
      }

      return (
         <text x={x} y={y} dominantBaseline="middle" textAnchor="middle" className="text-xs font-bold">
            {text}
         </text>
      );
   }
}

Shape.prototype.baseClass = 'shape';
Shape.prototype.anchors = '0 1 1 0';
Shape.prototype.shape = 'rectangle';
