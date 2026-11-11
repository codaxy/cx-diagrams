import { LineSegment, Point } from "../types";

/** Removes the points which are the same as the point before them. */
function removeDuplicates(points: Point[]): Point[] {
  return points.filter(
    (p, i) => i == 0 || p.x != points[i - 1].x || p.y != points[i - 1].y,
  );
}

/** Converts the points of a line into a list of its segments, skipping segments of zero length. */
export function getLineSegments(points: Point[]): LineSegment[] {
  points = removeDuplicates(points);
  let segments: LineSegment[] = [];
  for (let i = 1; i < points.length; i++)
    segments.push({
      x1: points[i - 1].x,
      y1: points[i - 1].y,
      x2: points[i].x,
      y2: points[i].y,
    });
  return segments;
}

/**
 * Returns the SVG path going through the given points.
 * Corners are rounded if `cornerRadius` is provided.
 */
export function getPolylinePath(
  points: Point[],
  cornerRadius: number = 0,
): string {
  points = removeDuplicates(points);
  if (points.length == 0) return "";
  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    let p = points[i];
    if (i == points.length - 1 || !(cornerRadius > 0)) {
      path += ` L${p.x},${p.y}`;
      continue;
    }
    let before = points[i - 1],
      after = points[i + 1];
    let d1 = Math.hypot(p.x - before.x, p.y - before.y);
    let d2 = Math.hypot(after.x - p.x, after.y - p.y);
    let r = Math.min(cornerRadius, d1 / 2, d2 / 2);
    let x1 = p.x + ((before.x - p.x) / d1) * r,
      y1 = p.y + ((before.y - p.y) / d1) * r,
      x2 = p.x + ((after.x - p.x) / d2) * r,
      y2 = p.y + ((after.y - p.y) / d2) * r;
    path += ` L${x1},${y1} Q${p.x},${p.y} ${x2},${y2}`;
  }
  return path;
}

/**
 * Returns the SVG path of a cubic Bézier curve which leaves the start point in the direction of `startVector`
 * and enters the end point in the direction of `endVector`. Both vectors should be unit vectors.
 * `minStartReach` and `minEndReach` define how far the curve goes before it starts to turn.
 * Returned `lines` are the tangents at the start, in the middle and at the end of the curve,
 * which can be used to position arrow heads.
 */
export function getCurve(
  start: Point,
  end: Point,
  startVector: Point,
  endVector: Point,
  minStartReach: number,
  minEndReach: number,
): { path: string; lines: LineSegment[] } {
  let dx = end.x - start.x,
    dy = end.y - start.y;

  // Control point distance depends on how far the end is in the direction of travel.
  // If the end is behind, the curve needs a wider loop to turn around.
  let reach = (v: Point, min: number) => {
    let d = dx * v.x + dy * v.y;
    return d >= 0 ? Math.max(d / 2, min) : min + 6 * Math.sqrt(-d);
  };
  let r1 = reach(startVector, minStartReach),
    r2 = reach(endVector, minEndReach);
  let c1 = { x: start.x + startVector.x * r1, y: start.y + startVector.y * r1 },
    c2 = { x: end.x - endVector.x * r2, y: end.y - endVector.y * r2 };

  // point and tangent in the middle of the curve (t = 0.5)
  let mx = (start.x + 3 * c1.x + 3 * c2.x + end.x) / 8,
    my = (start.y + 3 * c1.y + 3 * c2.y + end.y) / 8,
    tx = end.x + c2.x - c1.x - start.x,
    ty = end.y + c2.y - c1.y - start.y,
    tl = Math.sqrt(tx * tx + ty * ty) || 1;
  tx /= tl;
  ty /= tl;

  return {
    path: `M${start.x},${start.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`,
    // Tangents at the start, middle and the end of the curve, used to position arrow heads.
    lines: [
      {
        x1: start.x,
        y1: start.y,
        x2: start.x + startVector.x,
        y2: start.y + startVector.y,
      },
      { x1: mx - tx, y1: my - ty, x2: mx + tx, y2: my + ty },
      {
        x1: end.x - endVector.x,
        y1: end.y - endVector.y,
        x2: end.x,
        y2: end.y,
      },
    ],
  };
}
