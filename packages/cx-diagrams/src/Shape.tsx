/** @jsxImportSource react */
import { BoundedObject, BoundedObjectConfig, Rect, Svg } from "cx/svg";
import {
  ChildNode,
  ClassProp,
  Config,
  Instance,
  NumberProp,
  Prop,
  RenderingContext,
  StringProp,
  StructuredProp,
  StyleProp,
  VDOM,
} from "cx/ui";
import { getTopLevelBoundingClientRect, parseStyle } from "cx/util";
import type { DragEvent } from "cx/widgets";
import {
  ddDetect,
  ddMouseDown,
  ddMouseUp,
  initiateDragDrop,
  registerDropZone,
  TooltipConfig,
  tooltipMouseLeave,
  tooltipMouseMove,
  TooltipParentInstance,
  tooltipParentWillUnmount,
} from "cx/widgets";

type ShapeType = "rectangle" | "circle" | "rhombus";

export interface DragCloneConfig {
  /** Widget configuration to render as the drag clone. */
  widget?: ChildNode;

  /** CSS class for the drag clone. */
  class?: ClassProp;

  /** CSS style for the drag clone. */
  style?: StyleProp;

  /** Whether to match the size of the source element. Default: true when clone widget is not set. */
  matchSize?: boolean;

  /** Whether to match the cursor offset from the source element. Default: true when clone widget is not set. */
  matchCursorOffset?: boolean;
}

export interface ShapeConfig extends BoundedObjectConfig {
  /** Unique identifier for this shape (used for line connections). */
  id?: StringProp;

  /** Text displayed inside the shape. */
  text?: StringProp;

  /** Shape type. */
  shape?: Prop<ShapeType>;

  /** Tooltip configuration. */
  tooltip?: StringProp | TooltipConfig;

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

  /** Data about the drag source. Enables drag source when set. */
  dragSource?: StructuredProp;

  /** Callback when drag starts. Return false to cancel. */
  onDragStart?: string | ((e: DragEvent, instance: Instance) => any);

  /** Callback when drag ends. */
  onDragEnd?: string | ((e: DragEvent, instance: Instance) => void);

  /** Callback when dropped on this shape. Enables drop zone when set. */
  onDrop?: string | ((e: DragEvent, instance: Instance) => any);

  /** Test if drag source is acceptable. */
  onDropTest?: string | ((e: DragEvent, instance: Instance) => boolean);

  /** CSS class on shape element when cursor is over. */
  overShapeClass?: ClassProp;

  /** Style on shape element when cursor is over. */
  overShapeStyle?: StyleProp;

  /** CSS class on shape element when drag is active but cursor is not over. */
  farShapeClass?: ClassProp;

  /** Style on shape element when drag is active but cursor is not over. */
  farShapeStyle?: StyleProp;

  /** Custom drag clone configuration. If not set, a clone of the shape is used. */
  clone?: DragCloneConfig;
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
  dragSource?: any;
  overShapeClass?: string;
  overShapeStyle?: any;
  farShapeClass?: string;
  farShapeStyle?: any;
  cloneClass?: string;
  cloneStyle?: any;
}

export interface ShapeInstance extends Instance<Shape>, TooltipParentInstance {
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
  declare onDragStart?: string | ((e: DragEvent, instance: Instance) => any);
  declare onDragEnd?: string | ((e: DragEvent, instance: Instance) => void);
  declare onDrop?: string | ((e: DragEvent, instance: Instance) => any);
  declare onDropTest?: string | ((e: DragEvent, instance: Instance) => boolean);
  declare clone?: DragCloneConfig;

  el: SVGElement | null = null;

  declare cloneStyle?: any;
  declare cloneClass?: any;

  init() {
    this.textStyle = parseStyle(this.textStyle);
    this.shapeStyle = parseStyle(this.shapeStyle);
    if (this.clone) {
      this.cloneStyle = parseStyle(this.clone.style);
      this.cloneClass = this.clone.class;
    }
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
      dragSource: { structured: true },
      overShapeClass: { structured: true },
      overShapeStyle: { structured: true },
      farShapeClass: { structured: true },
      farShapeStyle: { structured: true },
      cloneClass: { structured: true },
      cloneStyle: { structured: true },
    });
  }

  render(context: RenderingContext, instance: ShapeInstance, key: string) {
    let { data } = instance;
    let { bounds } = data;

    if (!bounds.valid()) return false;

    return (
      <ShapeComponent key={key} instance={instance}>
        {this.renderChildren(context, instance)}
      </ShapeComponent>
    );
  }

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
    data: ShapeData,
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
          data.textClass,
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

interface ShapeComponentProps {
  instance: ShapeInstance;
  children?: any;
}

interface ShapeComponentState {
  dropState: false | "over" | "far";
  dragged: boolean;
}

class ShapeComponent extends VDOM.Component<
  ShapeComponentProps,
  ShapeComponentState
> {
  el: SVGGElement | null = null;
  unregisterDropZone?: () => void;

  constructor(props: ShapeComponentProps) {
    super(props);
    this.state = { dropState: false, dragged: false };
  }

  render() {
    let { instance, children } = this.props;
    let { data } = instance;
    let { widget } = instance;
    let { bounds, text, shape } = data;
    let { CSS, baseClass } = widget;
    let { dropState } = this.state;

    let shapeClassName = CSS.expand(
      CSS.element(baseClass, "shape"),
      data.shapeClass,
    );
    let shapeStyle = data.shapeStyle || data.style;

    if (dropState === "over") {
      shapeClassName = CSS.expand(shapeClassName, data.overShapeClass);
      if (data.overShapeStyle)
        shapeStyle = { ...shapeStyle, ...data.overShapeStyle };
    } else if (dropState === "far") {
      shapeClassName = CSS.expand(shapeClassName, data.farShapeClass);
      if (data.farShapeStyle)
        shapeStyle = { ...shapeStyle, ...data.farShapeStyle };
    }

    let shapeProps = {
      className: shapeClassName,
      style: shapeStyle,
      fill: data.fill,
      stroke: data.stroke,
      strokeWidth: data.strokeWidth,
    };

    return (
      <g
        id={data.id}
        ref={(el: SVGGElement | null) => {
          this.el = el;
        }}
        className={CSS.expand(
          data.classNames,
          CSS.state({ dragged: this.state.dragged }),
        )}
        style={data.style}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={ddMouseUp}
        onMouseLeave={this.onMouseLeave}
        onClick={
          widget.onClick
            ? (e: React.MouseEvent) => instance.invoke("onClick", e, instance)
            : undefined
        }
        onDoubleClick={
          widget.onDoubleClick
            ? (e: React.MouseEvent) =>
                instance.invoke("onDoubleClick", e, instance)
            : undefined
        }
        onContextMenu={
          widget.onContextMenu
            ? (e: React.MouseEvent) =>
                instance.invoke("onContextMenu", e, instance)
            : undefined
        }
      >
        {widget.renderShape(shape, bounds, shapeProps)}
        {widget.renderText(shape, bounds, text, data)}
        {children}
      </g>
    );
  }

  onMouseDown = (e: React.MouseEvent) => {
    let { instance } = this.props;
    let { data } = instance;
    if (data.dragSource) {
      ddMouseDown(e);
      e.stopPropagation();
      e.preventDefault();
    }
  };

  onMouseMove = (e: React.MouseEvent) => {
    let { instance } = this.props;
    let { widget } = instance;
    tooltipMouseMove(e, instance, widget.tooltip);
    if (instance.data.dragSource) {
      e.stopPropagation();
      e.preventDefault();
      if (ddDetect(e)) this.beginDragDrop(e);
    }
  };

  onMouseLeave = (e: React.MouseEvent) => {
    let { instance } = this.props;
    let { widget } = instance;
    tooltipMouseLeave(e, instance, widget.tooltip);
  };

  beginDragDrop(e: React.MouseEvent) {
    let { instance } = this.props;
    let { data, store } = instance;
    let { widget } = instance;

    if (
      widget.onDragStart &&
      instance.invoke("onDragStart", e, instance) === false
    )
      return;

    let defaultCloneWidget = {
      $type: Svg,
      style: { width: "100%", height: "100%" },
      children: [
        {
          $type: Shape,
          anchors: "0 1 1 0",
          shape: data.shape,
          fill: data.fill,
          stroke: data.stroke,
          strokeWidth: data.strokeWidth,
          text: data.text,
          class: data.classNames,
          style: data.style,
          shapeClass: data.shapeClass,
          shapeStyle: data.shapeStyle,
          textClass: data.textClass,
          textStyle: data.textStyle,
        },
      ],
    };

    initiateDragDrop(
      e,
      {
        sourceEl: this.el!,
        source: {
          store: store,
          data: data.dragSource,
        },
        clone: {
          widget: widget.clone?.widget ?? defaultCloneWidget,
          store: store,
          class: data.cloneClass,
          style: data.cloneStyle,
          matchSize: widget.clone?.matchSize ?? !widget.clone?.widget,
          matchCursorOffset:
            widget.clone?.matchCursorOffset ?? !widget.clone?.widget,
        },
      },
      (dragEvent) => {
        this.setState({ dragged: false });
        if (widget.onDragEnd) instance.invoke("onDragEnd", dragEvent, instance);
      },
    );

    this.setState({ dragged: true });
  }

  componentDidMount() {
    let { widget } = this.props.instance;
    if (widget.onDrop) {
      this.unregisterDropZone = registerDropZone(this);
    }
  }

  componentWillUnmount() {
    if (this.unregisterDropZone) {
      this.unregisterDropZone();
    }
    tooltipParentWillUnmount(this.props.instance);
  }

  // IDropZone methods

  onDropTest(e: DragEvent) {
    let { instance } = this.props;
    let { widget } = instance;
    return !widget.onDropTest || instance.invoke("onDropTest", e, instance);
  }

  onDragStart(e: DragEvent) {
    this.setState({ dropState: "far" });
  }

  onDragEnd(e: DragEvent) {
    this.setState({ dropState: false });
  }

  onDragEnter(e: DragEvent) {
    this.setState({ dropState: "over" });
  }

  onDragLeave(e: DragEvent) {
    this.setState({ dropState: "far" });
  }

  onDragMeasure(e: DragEvent) {
    let rect = getTopLevelBoundingClientRect(this.el!);
    let { clientX, clientY } = e.cursor;
    let over =
      rect.left <= clientX &&
      clientX < rect.right &&
      rect.top <= clientY &&
      clientY < rect.bottom;
    return {
      over:
        over &&
        Math.abs(clientX - (rect.left + rect.right) / 2) +
          Math.abs(clientY - (rect.top + rect.bottom) / 2),
      near: false,
    };
  }

  onDrop(e: DragEvent) {
    let { instance } = this.props;
    let { widget } = instance;
    if (this.state.dropState === "over" && widget.onDrop) {
      instance.invoke("onDrop", e, instance);
    }
  }
}
