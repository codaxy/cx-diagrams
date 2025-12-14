/** @jsxImportSource react */
import {
  VDOM,
  RenderingContext,
  Instance,
  StringProp,
  NumberProp,
  ClassProp,
  StyleProp,
} from "cx/ui";
import { parseStyle } from "cx/util";
import {
  tooltipMouseMove,
  tooltipMouseLeave,
  tooltipParentWillUnmount,
  tooltipParentWillReceiveProps,
  tooltipParentDidMount,
  TooltipParentInstance,
} from "cx/widgets";
import { BoundedObject, BoundedObjectConfig, Rect } from "cx/svg";

type ShapeType = "rectangle" | "circle" | "rhombus";

export interface ShapeConfig extends BoundedObjectConfig {
  /** Unique identifier for this shape (used for line connections). */
  id?: StringProp;

  /** Text displayed inside the shape. */
  text?: StringProp;

  /** Shape type. */
  shape?: ShapeType;

  /** Tooltip configuration. */
  tooltip?: any;

  /** CSS class for the text element. */
  textClass?: ClassProp;

  /** CSS class for the shape element. */
  shapeClass?: ClassProp;

  /** Style for the text element. */
  textStyle?: StyleProp;

  /** Style for the shape element. */
  shapeStyle?: StyleProp;

  /** Stroke color. */
  stroke?: StringProp;

  /** Stroke width. */
  strokeWidth?: NumberProp;

  /** Fill color. */
  fill?: StringProp;

  /** Click handler. */
  onClick?: string | ((e: React.MouseEvent, instance: Instance) => void);

  /** Double click handler. */
  onDoubleClick?: string | ((e: React.MouseEvent, instance: Instance) => void);

  /** Context menu handler. */
  onContextMenu?: string | ((e: React.MouseEvent, instance: Instance) => void);
}

interface ShapeData {
  id?: string;
  text?: string;
  shape: ShapeType;
  bounds: Rect;
  classNames: string;
  style?: any;
  shapeClass?: string;
  shapeStyle?: any;
  textClass?: string;
  textStyle?: any;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface ShapeInstance extends Instance, TooltipParentInstance {
  data: ShapeData;
}

export class Shape extends BoundedObject<ShapeConfig> {
  constructor(config?: ShapeConfig) {
    super(config);
  }

  declare textStyle?: any;
  declare shapeStyle?: any;
  declare baseClass: string;
  declare anchors: string;
  declare shape: ShapeType;
  declare tooltip?: any;
  declare onClick?: string | ((e: MouseEvent, instance: Instance) => void);
  declare onDoubleClick?:
    | string
    | ((e: MouseEvent, instance: Instance) => void);
  declare onContextMenu?:
    | string
    | ((e: MouseEvent, instance: Instance) => void);

  el: SVGElement | null = null;

  init() {
    this.textStyle = parseStyle(this.textStyle);
    this.shapeStyle = parseStyle(this.shapeStyle);
    super.init();
  }

  declareData(...args: any[]) {
    super.declareData(...args, {
      id: undefined,
      text: undefined,
      shape: undefined,
      fill: undefined,
      stroke: undefined,
      strokeWidth: undefined,
      shapeClass: { structured: true },
      shapeStyle: { structured: true },
      textStyle: { structured: true },
      textClass: { structured: true },
    });
  }

  render(context: RenderingContext, instance: ShapeInstance, key: string) {
    let { data } = instance;
    let { bounds, text, shape } = data;

    if (!bounds.valid()) return false;

    let shapeProps = {
      className: this.CSS.expand(
        this.CSS.element(this.baseClass, "shape"),
        data.shapeClass
      ),
      style: data.shapeStyle || data.style,
      fill: data.fill,
      stroke: data.stroke,
      strokeWidth: data.strokeWidth,
      ref: undefined as ((c: SVGElement | null) => void) | undefined,
    };

    let gProps: React.SVGAttributes<SVGGElement> & {
      onMouseMove?: (e: React.MouseEvent) => void;
      onMouseLeave?: (e: React.MouseEvent) => void;
      onClick?: (e: React.MouseEvent) => void;
      onDoubleClick?: (e: React.MouseEvent) => void;
      onContextMenu?: (e: React.MouseEvent) => void;
    } = {
      onMouseMove: (e) => {
        tooltipMouseMove(e, instance, this.tooltip);
      },
      onMouseLeave: (e) => {
        tooltipMouseLeave(e, instance, this.tooltip);
      },
    };

    if (this.onClick)
      gProps.onClick = (e) => instance.invoke("onClick", e, instance);
    if (this.onDoubleClick)
      gProps.onDoubleClick = (e) =>
        instance.invoke("onDoubleClick", e, instance);
    if (this.onContextMenu)
      gProps.onContextMenu = (e) =>
        instance.invoke("onContextMenu", e, instance);

    if (this.tooltip) {
      shapeProps.ref = (c) => {
        this.el = c;
      };
    }

    return (
      <g
        key={key}
        id={data.id}
        {...gProps}
        className={data.classNames}
        style={data.style}
      >
        {this.renderShape(shape, bounds, shapeProps)}
        {this.renderText(shape, bounds, text, data)}
        {this.renderChildren(context, instance)}
      </g>
    );
  }

  //   componentWillUnmount() {
  //     tooltipParentWillUnmount((this as any).props.instance);
  //   }

  //   componentWillReceiveProps(props: any) {
  //     tooltipParentWillReceiveProps(
  //       this.el!,
  //       props.instance,
  //       props.instance.widget.tooltip
  //     );
  //   }

  //   componentDidMount() {
  //     tooltipParentDidMount(
  //       this.el!,
  //       this.props.instance,
  //       this.props.instance.widget.tooltip
  //     );
  //   }

  prepare(context: RenderingContext, instance: ShapeInstance) {
    super.prepare(context, instance);
    if (context.diagram) {
      let { id, bounds, shape } = instance.data;
      if (id) context.diagram.registerShapeBounds(id, shape, bounds);
    }
  }

  renderShape(shape: ShapeType, bounds: Rect, shapeProps: any) {
    var R = Math.min(bounds.width(), bounds.height());
    switch (shape) {
      case "circle":
        return (
          <ellipse
            {...shapeProps}
            cx={(bounds.l + bounds.r) / 2}
            cy={(bounds.t + bounds.b) / 2}
            rx={R / 2}
            ry={R / 2}
          />
        );

      case "rectangle":
        return (
          <rect
            {...shapeProps}
            x={bounds.l}
            y={bounds.t}
            width={bounds.width()}
            height={bounds.height()}
          />
        );

      case "rhombus":
        const centerX = bounds.l + bounds.width() / 2;
        const centerY = bounds.t + bounds.height() / 2;

        return (
          <polygon
            {...shapeProps}
            points={`${centerX},${bounds.t} ${bounds.r},${centerY}
                                 ${centerX},${bounds.b} ${bounds.l},${centerY}`}
          />
        );
    }
  }

  renderText(
    shape: ShapeType,
    bounds: Rect,
    text: string | undefined,
    data: ShapeData
  ) {
    if (!text) return null;

    let x: number;
    let y: number;

    if (shape === "circle") {
      x = (bounds.l + bounds.r) / 2;
      y = (bounds.t + bounds.b) / 2;
    } else {
      x = bounds.l + bounds.width() / 2;
      y = bounds.t + bounds.height() / 2;
    }

    return (
      <text
        x={x}
        y={y}
        className={this.CSS.expand(
          this.CSS.element(this.baseClass, "text"),
          data.textClass
        )}
        style={data.textStyle}
      >
        {text}
      </text>
    );
  }
}

Shape.prototype.baseClass = "shape";
Shape.prototype.anchors = "0 1 1 0";
Shape.prototype.shape = "rectangle";
