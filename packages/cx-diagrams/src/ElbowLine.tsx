/** @jsxImportSource react */
import { Rect } from "cx/svg";
import {
  BooleanProp,
  ClassProp,
  ContainerBase,
  ContainerConfig,
  Instance,
  NumberProp,
  Prop,
  RenderingContext,
  StringProp,
  StyleProp,
} from "cx/ui";
import { Direction, LineSegment, Point } from "./types";
import {
  getCurve,
  getLineSegments,
  getPolylinePath,
} from "./util/linePaths";
import {
  getDirectionVector,
  getOppositeDirection,
  getSidePoint,
  routeOrthogonal,
} from "./util/routeOrthogonal";

export interface ElbowLineConfig extends ContainerConfig {
  /** ID of the starting shape. */
  from?: StringProp;

  /** ID of the ending shape. */
  to?: StringProp;

  /** Direction in which the line leaves the starting shape. Default is `right`. */
  startDirection?: Prop<Direction>;

  /** Direction in which the line travels when it enters the ending shape. Defaults to `startDirection`. */
  endDirection?: Prop<Direction>;

  /**
   * Moves the start point away from the middle of the side, in pixels.
   * Positive values move it down on the left and right side, and to the right on the top and bottom side.
   */
  startOffset?: NumberProp;

  /**
   * Moves the end point away from the middle of the side, in pixels.
   * Positive values move it down on the left and right side, and to the right on the top and bottom side.
   */
  endOffset?: NumberProp;

  /** Minimum distance kept between the line and the shapes when the line has to go around them. Default is `16`. */
  clearance?: NumberProp;

  /** Minimum length of the first segment, e.g. to leave enough room for an arrow head. Default is `8`. */
  minStartLength?: NumberProp;

  /** Minimum length of the last segment, e.g. to leave enough room for an arrow head. Default is `8`. */
  minEndLength?: NumberProp;

  /** Corner radius. Use it to round the corners of the line. */
  cornerRadius?: NumberProp;

  /** Set to `true` to draw a smooth curve instead of straight segments. */
  smooth?: BooleanProp;

  /** Stroke color. */
  stroke?: StringProp;

  /** CSS class. */
  class?: ClassProp;

  /** CSS style. */
  style?: StyleProp;
}

interface ElbowLineData {
  from?: string;
  to?: string;
  startDirection: Direction;
  endDirection?: Direction;
  startOffset: number;
  endOffset: number;
  clearance: number;
  minStartLength: number;
  minEndLength: number;
  cornerRadius: number;
  smooth?: boolean;
  stroke?: string;
  classNames: string;
  style?: any;
}

export interface ElbowLineInstance extends Instance {
  data: ElbowLineData;
  startDirection: Direction;
  endDirection: Direction;
  startOffsetDirection: Direction;
  endOffsetDirection: Direction;
  bounds: Rect;
  lines?: LineSegment[];
  path?: string;
  routeKey?: string;
  colorIndex?: number;
}

export class ElbowLine extends ContainerBase<
  ElbowLineConfig,
  ElbowLineInstance
> {
  constructor(config?: ElbowLineConfig) {
    super(config);
  }

  declare baseClass: string;
  declare styled: boolean;
  declare startDirection: Direction;
  declare startOffset: number;
  declare endOffset: number;
  declare clearance: number;
  declare minStartLength: number;
  declare minEndLength: number;
  declare cornerRadius: number;
  declare smooth: boolean;

  declareData(...args: any[]) {
    super.declareData(...args, {
      from: undefined,
      to: undefined,
      startDirection: undefined,
      endDirection: undefined,
      startOffset: undefined,
      endOffset: undefined,
      clearance: undefined,
      minStartLength: undefined,
      minEndLength: undefined,
      cornerRadius: undefined,
      smooth: undefined,
      stroke: undefined,
    });
  }

  explore(context: RenderingContext, instance: ElbowLineInstance) {
    let { data } = instance;
    let startDirection = data.startDirection;
    let endDirection = data.endDirection ?? startDirection;
    // offsets move the endpoints along the side, i.e. perpendicular to the direction
    let startOffsetDirection = getOffsetDirection(startDirection);
    let endOffsetDirection = getOffsetDirection(endDirection);
    if (context.rotateDirection) {
      startDirection = context.rotateDirection(startDirection);
      endDirection = context.rotateDirection(endDirection);
      startOffsetDirection = context.rotateDirection(startOffsetDirection);
      endOffsetDirection = context.rotateDirection(endOffsetDirection);
    }
    instance.startDirection = startDirection;
    instance.endDirection = endDirection;
    instance.startOffsetDirection = startOffsetDirection;
    instance.endOffsetDirection = endOffsetDirection;
    super.explore(context, instance);
  }

  calculateRoute(context: RenderingContext, instance: ElbowLineInstance) {
    let { data, startDirection, endDirection } = instance;

    if (
      !data.from ||
      !data.to ||
      !context.diagram ||
      !context.diagram.hasShape(data.from) ||
      !context.diagram.hasShape(data.to)
    ) {
      instance.routeKey = undefined;
      instance.bounds = new Rect();
      instance.lines = [];
      instance.path = "";
      return;
    }

    let { bounds: sb } = context.diagram.getShape(data.from);
    let { bounds: eb } = context.diagram.getShape(data.to);

    let routeKey = [
      sb.l,
      sb.t,
      sb.r,
      sb.b,
      eb.l,
      eb.t,
      eb.r,
      eb.b,
      startDirection,
      endDirection,
      instance.startOffsetDirection,
      instance.endOffsetDirection,
      data.startOffset,
      data.endOffset,
      data.clearance,
      data.minStartLength,
      data.minEndLength,
      data.cornerRadius,
      data.smooth,
    ].join();

    if (routeKey == instance.routeKey) return;
    instance.routeKey = routeKey;

    let start = getSidePoint(
      sb,
      startDirection,
      data.startOffset,
      instance.startOffsetDirection,
    );
    let end = getSidePoint(
      eb,
      getOppositeDirection(endDirection),
      data.endOffset,
      instance.endOffsetDirection,
    );
    let points: Point[];

    if (data.smooth) {
      // The curve is defined by the endpoints and the directions, so there is no need to calculate the route.
      let sv = getDirectionVector(startDirection);
      let dx = end.x - start.x,
        dy = end.y - start.y;
      let isStraight =
        startDirection == endDirection &&
        dx * sv.y == dy * sv.x &&
        dx * sv.x + dy * sv.y >= 0;

      if (!isStraight) {
        let curve = getCurve(
          start,
          end,
          sv,
          getDirectionVector(endDirection),
          Math.max(data.clearance, data.minStartLength),
          Math.max(data.clearance, data.minEndLength),
        );
        instance.bounds = getBounds(start, end);
        instance.path = curve.path;
        instance.lines = curve.lines;
        return;
      }
      points = [start, end];
    } else
      points = routeOrthogonal(
        sb,
        eb,
        start,
        end,
        startDirection,
        endDirection,
        data.clearance,
        data.minStartLength,
        data.minEndLength,
      );

    instance.bounds = getBounds(points[0], points[points.length - 1]);
    instance.path = getPolylinePath(points, data.cornerRadius);
    instance.lines = getLineSegments(points);
  }

  prepare(context: RenderingContext, instance: ElbowLineInstance) {
    this.calculateRoute(context, instance);
    if (instance.cache("path", instance.path))
      instance.markShouldUpdate(context);
    context.push("parentRect", instance.bounds);
    context.push("getLineSegments", () => instance.lines);
  }

  prepareCleanup(context: RenderingContext, instance: ElbowLineInstance) {
    context.pop("parentRect");
    context.pop("getLineSegments");
  }

  render(context: RenderingContext, instance: ElbowLineInstance, key: string) {
    let { data, colorIndex } = instance;
    return (
      <g key={key} className={data.classNames}>
        <path
          className={this.CSS.element(
            this.baseClass,
            "line",
            colorIndex != null && "color-" + colorIndex,
          )}
          d={instance.path}
          fill="none"
          style={data.style}
          stroke={data.stroke}
        />
        {this.renderChildren(context, instance)}
      </g>
    );
  }
}

ElbowLine.prototype.baseClass = "line";
ElbowLine.prototype.styled = true;
ElbowLine.prototype.startDirection = "right";
ElbowLine.prototype.startOffset = 0;
ElbowLine.prototype.endOffset = 0;
ElbowLine.prototype.clearance = 16;
ElbowLine.prototype.minStartLength = 8;
ElbowLine.prototype.minEndLength = 8;
ElbowLine.prototype.cornerRadius = 0;
ElbowLine.prototype.smooth = false;

function getOffsetDirection(direction: Direction): Direction {
  return direction == "left" || direction == "right" ? "down" : "right";
}

function getBounds(start: Point, end: Point): Rect {
  return new Rect({ l: start.x, t: start.y, r: end.x, b: end.y });
}
