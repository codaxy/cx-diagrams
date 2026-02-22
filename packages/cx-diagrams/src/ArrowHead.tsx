/** @jsxImportSource react */
import {
  BooleanProp,
  ClassProp,
  ContainerBase,
  ContainerConfig,
  Instance,
  NumberProp,
  RenderingContext,
  StringProp,
  StyleProp,
} from "cx/ui";

type Position = "start" | "end" | "middle";
type ArrowShape = "triangle" | "vback" | "line";

interface LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface ArrowPosition {
  x: number;
  y: number;
  angle: number;
}

export interface ArrowHeadConfig extends ContainerConfig {
  /** Position of the arrow head on the line. */
  position?: Position;

  /** Shape of the arrow head. */
  shape?: ArrowShape;

  /** Fill color. */
  fill?: StringProp;

  /** Size of the arrow head. */
  size?: NumberProp;

  /** Stroke color. */
  stroke?: StringProp;

  /** Stroke width. */
  strokeWidth?: NumberProp;

  /** Aspect ratio. */
  aspectRatio?: NumberProp;

  /** Reverse the direction. */
  reverse?: BooleanProp;

  /** CSS class. */
  class?: ClassProp;

  /** CSS style. */
  style?: StyleProp;
}

interface ArrowHeadData {
  position: Position;
  shape: ArrowShape;
  fill?: string;
  size: number;
  stroke?: string;
  strokeWidth?: number;
  aspectRatio: number;
  reverse?: boolean;
  class?: string;
  style?: any;
  lines?: LineSegment[];
}

export interface ArrowHeadInstance extends Instance {
  data: ArrowHeadData;
}

export class ArrowHead extends ContainerBase<ArrowHeadConfig> {
  constructor(config?: ArrowHeadConfig) {
    super(config);
  }

  declare baseClass: string;
  declare size: number;
  declare styled: boolean;
  declare aspectRatio: number;
  declare reverse: boolean;
  declare shape: ArrowShape;
  declare position: Position;

  declareData(...args: any[]) {
    return super.declareData(...args, {
      position: undefined,
      shape: undefined,
      fill: undefined,
      size: undefined,
      stroke: undefined,
      width: undefined,
      aspectRatio: undefined,
      reverse: undefined,
    });
  }

  prepare(context: RenderingContext, instance: ArrowHeadInstance) {
    let { data } = instance;
    data.lines = context.getLineSegments?.();
    let cachedLines = instance.cached?.lines;
    let changed =
      !cachedLines ||
      !data.lines ||
      cachedLines.length !== data.lines.length ||
      data.lines.some(
        (l, i) =>
          l.x1 !== cachedLines[i].x1 ||
          l.y1 !== cachedLines[i].y1 ||
          l.x2 !== cachedLines[i].x2 ||
          l.y2 !== cachedLines[i].y2,
      );

    if (instance.cache("lines", changed ? data.lines : cachedLines))
      instance.markShouldUpdate(context);
  }

  calculatePositions(
    context: RenderingContext,
    instance: ArrowHeadInstance,
  ): ArrowPosition[] {
    const { data } = instance;
    const { position, size } = data;

    if (!data.lines || data.lines.length === 0) {
      throw new Error("ArrowHead must be placed inside a Line component.");
    }

    let lines = data.lines;
    if (data.reverse) {
      lines = data.lines
        .map((l) => ({
          x1: l.x2,
          x2: l.x1,
          y2: l.y1,
          y1: l.y2,
        }))
        .reverse();
    }

    if (position === "start" || position === "end") {
      const lineIndex = position === "start" ? 0 : lines.length - 1;
      const line = lines[lineIndex];
      const dx = line.x2 - line.x1;
      const dy = line.y2 - line.y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angleRadians = Math.atan2(line.x2 - line.x1, line.y2 - line.y1);
      const angleDegrees = -angleRadians * (180 / Math.PI);

      let x: number;
      let y: number;
      if (position === "start") {
        x = line.x1 + (size / length) * dx;
        y = line.y1 + (size / length) * dy;
      } else {
        x = line.x2;
        y = line.y2;
      }

      return [
        {
          x,
          y,
          angle: angleDegrees,
        },
      ];
    } else if (position === "middle") {
      const arrowPositions: ArrowPosition[] = [];

      for (const line of lines) {
        const midX = (line.x1 + line.x2) / 2;
        const midY = (line.y1 + line.y2) / 2;

        const dx = line.x2 - line.x1;
        const dy = line.y2 - line.y1;
        const length = Math.sqrt(dx * dx + dy * dy);

        const offsetX = (size / 2) * (dx / length);
        const offsetY = (size / 2) * (dy / length) * -1;

        const angleRadians = Math.atan2(line.x2 - line.x1, line.y2 - line.y1);
        const angleDegrees = -angleRadians * (180 / Math.PI);

        arrowPositions.push({
          x: midX + offsetX,
          y: midY - offsetY,
          angle: angleDegrees,
        });
      }

      return arrowPositions;
    }

    return [];
  }

  getPathDefinition(
    shape: ArrowShape,
    x: number,
    y: number,
    size: number,
    aspectRatio: number,
  ): string {
    switch (shape) {
      case "vback":
        return `M${x},${y} L${x - size / aspectRatio / 2},${y - size} L${x},${
          y - 0.5 * size
        } L${x + size / aspectRatio / 2},${y - size} L${x},${y} Z`;

      case "line":
        return `M${x},${y} L${x - size / aspectRatio / 2},${
          y - size
        } L${x},${y} L${x + size / aspectRatio / 2},${y - size} L${x},${y} Z`;

      default:
      case "triangle":
        return `M${x},${y} L${x - size / aspectRatio / 2},${y - size} L${
          x + size / aspectRatio / 2
        },${y - size} Z`;
    }
  }

  render(context: RenderingContext, instance: ArrowHeadInstance, key: string) {
    const { data } = instance;
    const positions = this.calculatePositions(context, instance);

    const arrowHeadProps = {
      className: this.CSS.expand(
        this.CSS.element(this.baseClass, "arrow-head"),
        data.class,
      ),
      style: data.style,
      fill: data.fill,
      stroke: data.stroke,
      strokeWidth: data.strokeWidth,
    };

    const lines = positions.map((p, index) => {
      const path = this.getPathDefinition(
        data.shape,
        p.x,
        p.y,
        data.size,
        data.aspectRatio,
      );
      return (
        <path
          key={index}
          d={path}
          {...arrowHeadProps}
          transform={`rotate(${p.angle} ${p.x} ${p.y})`}
        />
      );
    });

    return <>{lines}</>;
  }
}

ArrowHead.prototype.baseClass = "arrow-head";
ArrowHead.prototype.size = 12;
ArrowHead.prototype.styled = true;
ArrowHead.prototype.aspectRatio = 1;
ArrowHead.prototype.reverse = false;
ArrowHead.prototype.shape = "triangle";
ArrowHead.prototype.position = "end";
