/** @jsxImportSource react */
import { Rect } from "cx/svg";
import {
  ContainerBase,
  ContainerConfig,
  RenderingContext,
  Instance,
  StringProp,
  NumberProp,
  StyleProp,
  ClassProp,
} from "cx/ui";

type Direction = "right" | "left" | "up" | "down";

interface LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ThreeSegmentLineConfig extends ContainerConfig {
  /** Offset from start position. */
  startOffset?: NumberProp;

  /** Direction of the line. */
  direction?: Direction;

  /** ID of the starting shape. */
  from?: StringProp;

  /** ID of the ending shape. */
  to?: StringProp;

  /** Stroke color. */
  stroke?: StringProp;

  /** CSS class. */
  class?: ClassProp;

  /** CSS style. */
  style?: StyleProp;
}

interface ThreeSegmentLineData {
  startOffset: number;
  direction: Direction;
  from?: string;
  to?: string;
  stroke?: string;
  classNames: string;
  style?: any;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface ThreeSegmentLineInstance extends Instance {
  data: ThreeSegmentLineData;
  direction?: Direction;
  bounds: Rect;
  lines?: LineSegment[];
  colorIndex?: number;
  cached: { bounds?: Rect };
}

export class ThreeSegmentLine extends ContainerBase<
  ThreeSegmentLineConfig,
  ThreeSegmentLineInstance
> {
  constructor(config?: ThreeSegmentLineConfig) {
    super(config);
  }

  declare baseClass: string;
  declare styled: boolean;
  declare startOffset: number;
  declare direction: Direction;

  declareData(...args: any[]) {
    super.declareData(...args, {
      startOffset: undefined,
      direction: undefined,
      from: undefined,
      to: undefined,
      stroke: undefined,
    });
  }

  explore(context: RenderingContext, instance: ThreeSegmentLineInstance) {
    let { data } = instance;
    instance.direction = context.rotateDirection
      ? context.rotateDirection(data.direction)
      : data.direction;
    super.explore(context, instance);
  }

  calculateBounds(
    context: RenderingContext,
    instance: ThreeSegmentLineInstance
  ): Rect {
    let { data, direction } = instance;
    let { startOffset } = data;

    if (context.rotateDirection)
      direction = context.rotateDirection(direction!);

    if (!data.from || !data.to || !context.diagram) return new Rect();

    if (
      !context.diagram.hasShape(data.from) ||
      !context.diagram.hasShape(data.to)
    )
      return new Rect();

    let { bounds: sb } = context.diagram.getShape(data.from);
    let { bounds: eb } = context.diagram.getShape(data.to);

    let t = (sb.t + sb.b) / 2,
      l = (sb.l + sb.r) / 2,
      b = (eb.t + eb.b) / 2,
      r = (eb.l + eb.r) / 2;

    if (direction == "right" || direction == "left") {
      if (t < b) t -= startOffset;
      else t += startOffset;
      if (l != r) {
        l = l < r ? sb.r : sb.l;
        r = l < r ? eb.l : eb.r;
      } else {
        t = t < b ? sb.b : sb.t;
        b = t < b ? eb.t : eb.b;
      }
      data.x1 = data.x2 = (l + r) / 2;
      data.y1 = t;
      data.y2 = b;
    } else {
      if (l < r) l -= startOffset;
      else l += startOffset;
      if (t != b) {
        t = t < b ? sb.b : sb.t;
        b = t < b ? eb.t : eb.b;
      } else {
        l = l < r ? sb.r : sb.l;
        r = l < r ? eb.l : eb.r;
      }
      data.y1 = data.y2 = (t + b) / 2;
      data.x1 = l;
      data.x2 = r;
    }

    instance.lines = [
      {
        x1: l,
        y1: t,
        x2: data.x1!,
        y2: data.y1!,
      },
      {
        x1: data.x1!,
        y1: data.y1!,
        x2: data.x2!,
        y2: data.y2!,
      },
      {
        x1: data.x2!,
        y1: data.y2!,
        x2: r,
        y2: b,
      },
    ];

    return new Rect({ t, r, b, l });
  }

  prepare(context: RenderingContext, instance: ThreeSegmentLineInstance) {
    instance.bounds = this.calculateBounds(context, instance);
    if (!instance.bounds.isEqual(instance.cached.bounds))
      instance.markShouldUpdate(context);
    context.push("parentRect", instance.bounds);
    context.push("getLineSegments", () => instance.lines);
  }

  prepareCleanup(
    context: RenderingContext,
    instance: ThreeSegmentLineInstance
  ) {
    context.pop("parentRect");
    context.pop("getLineSegments");
  }

  render(
    context: RenderingContext,
    instance: ThreeSegmentLineInstance,
    key: string
  ) {
    let { data, colorIndex, bounds } = instance;
    let { x1, y1, x2, y2 } = data;
    let { t, l, b, r } = bounds;

    return (
      <g key={key} className={data.classNames}>
        <line
          className={this.CSS.element(
            this.baseClass,
            "line",
            colorIndex != null && "color-" + colorIndex
          )}
          x1={l}
          y1={t}
          x2={x1}
          y2={y1}
          style={data.style}
          stroke={data.stroke}
        />
        <line
          className={this.CSS.element(
            this.baseClass,
            "line",
            colorIndex != null && "color-" + colorIndex
          )}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          style={data.style}
          stroke={data.stroke}
        />
        <line
          className={this.CSS.element(
            this.baseClass,
            "line",
            colorIndex != null && "color-" + colorIndex
          )}
          x1={x2}
          y1={y2}
          x2={r}
          y2={b}
          style={data.style}
          stroke={data.stroke}
        />
        {this.renderChildren(context, instance)}
      </g>
    );
  }
}

ThreeSegmentLine.prototype.startOffset = 0;
ThreeSegmentLine.prototype.direction = "right";
ThreeSegmentLine.prototype.baseClass = "line";
ThreeSegmentLine.prototype.styled = true;
