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

export interface TwoSegmentLineConfig extends ContainerConfig {
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

interface TwoSegmentLineData {
  startOffset: number;
  direction: Direction;
  from?: string;
  to?: string;
  stroke?: string;
  classNames: string;
  style?: any;
  x?: number;
  y?: number;
}

export interface TwoSegmentLineInstance extends Instance {
  data: TwoSegmentLineData;
  direction?: Direction;
  bounds: Rect;
  lines?: LineSegment[];
  colorIndex?: number;
  cached: { bounds?: Rect };
}

export class TwoSegmentLine extends ContainerBase<
  TwoSegmentLineConfig,
  TwoSegmentLineInstance
> {
  constructor(config?: TwoSegmentLineConfig) {
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

  explore(context: RenderingContext, instance: TwoSegmentLineInstance) {
    let { data } = instance;
    instance.direction = context.rotateDirection
      ? context.rotateDirection(data.direction)
      : data.direction;
    super.explore(context, instance);
  }

  calculateBounds(
    context: RenderingContext,
    instance: TwoSegmentLineInstance
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
      data.y = t;
      data.x = r;
      l += ((l < r ? 1 : -1) * sb.width()) / 2;
      b += ((t < b ? -1 : 1) * eb.height()) / 2;

      if (
        eb.l <= data.x &&
        data.x <= eb.r &&
        eb.t <= data.y &&
        data.y <= eb.b
      ) {
        data.x = l < eb.l ? eb.l : eb.r;
        r = data.x!;
        b = data.y;
      }
    } else {
      if (l < r) l -= startOffset;
      else l += startOffset;
      data.y = b;
      data.x = l;
      t += ((t < b ? 1 : -1) * sb.height()) / 2;
      r += ((l < r ? -1 : 1) * eb.width()) / 2;

      if (
        eb.l <= data.x &&
        data.x <= eb.r &&
        eb.t <= data.y &&
        data.y <= eb.b
      ) {
        data.y = t < eb.t ? eb.t : eb.b;
        r = data.x;
        b = data.y!;
      }
    }
    instance.lines = [
      { x1: l, y1: data.y!, x2: r, y2: data.y! },
      { x1: data.x!, y1: t, x2: data.x!, y2: b },
    ];
    return new Rect({ t, r, b, l });
  }

  prepare(context: RenderingContext, instance: TwoSegmentLineInstance) {
    instance.bounds = this.calculateBounds(context, instance);
    if (!instance.bounds.isEqual(instance.cached.bounds!))
      instance.markShouldUpdate(context);
    context.push("parentRect", instance.bounds);
    context.push("getLineSegments", () => instance.lines);
  }

  prepareCleanup(context: RenderingContext, instance: TwoSegmentLineInstance) {
    context.pop("parentRect");
    context.pop("getLineSegments");
  }

  render(
    context: RenderingContext,
    instance: TwoSegmentLineInstance,
    key: string
  ) {
    let { data, colorIndex, bounds } = instance;
    let { x, y } = data;
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
          y1={y}
          x2={r}
          y2={y}
          style={data.style}
          stroke={data.stroke}
        />
        <line
          className={this.CSS.element(
            this.baseClass,
            "line",
            colorIndex != null && "color-" + colorIndex
          )}
          x1={x}
          y1={t}
          x2={x}
          y2={b}
          style={data.style}
          stroke={data.stroke}
        />
        {this.renderChildren(context, instance)}
      </g>
    );
  }
}

TwoSegmentLine.prototype.startOffset = 0;
TwoSegmentLine.prototype.direction = "right";
TwoSegmentLine.prototype.baseClass = "line";
TwoSegmentLine.prototype.styled = true;
