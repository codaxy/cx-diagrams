import { Direction, Point } from "../types";

export interface Box {
  l: number;
  t: number;
  r: number;
  b: number;
}

const directions: Direction[] = ["right", "down", "left", "up"];
const vx = [1, 0, -1, 0];
const vy = [0, 1, 0, -1];

// Bends are always more expensive than any distance, so the route with the fewest segments wins.
const bendCost = 1e7;

// Among the routes with the same number of bends, those which stay on the regular lines win.
const extraLineCost = 1e5;

// Passing closer to a box than the clearance is allowed only if all other routes have more bends.
const nearCost = 1e5;

export function getDirectionVector(direction: Direction): Point {
  let d = directions.indexOf(direction);
  return { x: vx[d], y: vy[d] };
}

export function getOppositeDirection(direction: Direction): Direction {
  return directions[(directions.indexOf(direction) + 2) % 4];
}

/**
 * Returns the middle of the given side of the box, moved along the side by the given offset.
 * The point always stays on the side.
 */
export function getSidePoint(
  box: Box,
  side: Direction,
  offset: number = 0,
  offsetDirection?: Direction,
): Point {
  let x = (box.l + box.r) / 2,
    y = (box.t + box.b) / 2;
  if (offset && offsetDirection) {
    let v = getDirectionVector(offsetDirection);
    let limit = (v.x != 0 ? box.r - box.l : box.b - box.t) / 2;
    offset = Math.max(-limit, Math.min(limit, offset));
    x += v.x * offset;
    y += v.y * offset;
  }
  switch (side) {
    case "right":
      return { x: box.r, y };
    case "left":
      return { x: box.l, y };
    case "down":
      return { x, y: box.b };
    default:
      return { x, y: box.t };
  }
}

/**
 * Calculates an orthogonal route between two boxes, from the `start` point on the edge of the first box
 * to the `end` point on the edge of the second box.
 * The route leaves the first box in `startDirection` and enters the second box traveling in `endDirection`.
 * The first and the last segment are at least `minStartLength` and `minEndLength` long,
 * unless the route is a single straight segment or there is no such route.
 * Returns the corner points of the route, including both endpoints.
 */
export function routeOrthogonal(
  from: Box,
  to: Box,
  start: Point,
  end: Point,
  startDirection: Direction,
  endDirection: Direction,
  clearance: number,
  minStartLength: number = 0,
  minEndLength: number = 0,
): Point[] {
  let sd = directions.indexOf(startDirection);
  let ed = directions.indexOf(endDirection);

  // The first place where the line is allowed to turn and the last place where it has to turn.
  let firstTurn = {
    x: start.x + vx[sd] * minStartLength,
    y: start.y + vy[sd] * minStartLength,
  };
  let lastTurn = {
    x: end.x - vx[ed] * minEndLength,
    y: end.y - vy[ed] * minEndLength,
  };

  // The first and the last segment have to pass through the area around the boxes.
  let startClear = {
    x: start.x + vx[sd] * clearance,
    y: start.y + vy[sd] * clearance,
  };
  let endClear = {
    x: end.x - vx[ed] * clearance,
    y: end.y - vy[ed] * clearance,
  };

  let xs = getGridLines(
    from.l,
    from.r,
    to.l,
    to.r,
    clearance,
    start.x,
    end.x,
  );
  let ys = getGridLines(
    from.t,
    from.b,
    to.t,
    to.b,
    clearance,
    start.y,
    end.y,
  );
  // Lines needed only to satisfy the minimum lengths. These are used only if there is no other way.
  let extraXs = addLines(xs, firstTurn.x, lastTurn.x);
  let extraYs = addLines(ys, firstTurn.y, lastTurn.y);
  let nx = xs.length,
    ny = ys.length;

  // state = (grid node, heading)
  let stateCount = nx * ny * 4;
  let cost = new Array<number>(stateCount).fill(Infinity);
  let prev = new Array<number>(stateCount).fill(-1);
  let done = new Array<boolean>(stateCount).fill(false);

  let startState = (ys.indexOf(start.y) * nx + xs.indexOf(start.x)) * 4 + sd;
  let endState = (ys.indexOf(end.y) * nx + xs.indexOf(end.x)) * 4 + ed;
  cost[startState] = 0;

  while (true) {
    let s = -1;
    for (let i = 0; i < stateCount; i++)
      if (!done[i] && cost[i] < Infinity && (s < 0 || cost[i] < cost[s])) s = i;
    if (s < 0 || s == endState) break;
    done[s] = true;

    let h = s % 4,
      node = (s - h) / 4,
      ix = node % nx,
      iy = (node - ix) / nx;

    for (let h2 = 0; h2 < 4; h2++) {
      if (h2 == (h + 2) % 4) continue; // no going back
      if (s == startState && h2 != h) continue; // the first segment must follow the start direction
      if (h2 != h) {
        // the first segment is too short to turn here
        if (
          h == sd &&
          isBetween(xs[ix], ys[iy], start, firstTurn, vx[sd], vy[sd])
        )
          continue;
        // the last segment would be too short if the line turned here
        if (
          h2 == ed &&
          isBetween(xs[ix], ys[iy], end, lastTurn, -vx[ed], -vy[ed])
        )
          continue;
      }
      let jx = ix + vx[h2],
        jy = iy + vy[h2];
      if (jx < 0 || jx >= nx || jy < 0 || jy >= ny) continue;
      let s2 = (jy * nx + jx) * 4 + h2;
      if (done[s2]) continue;

      // Lines may touch the boxes only at the endpoints.
      if (s != startState && hits(xs[ix], ys[iy], xs[jx], ys[jy], from))
        continue;
      if (s2 != endState && hits(xs[ix], ys[iy], xs[jx], ys[jy], to)) continue;

      let c =
        cost[s] + Math.abs(xs[jx] - xs[ix]) + Math.abs(ys[jy] - ys[iy]);
      if (h2 != h) {
        c += bendCost;
        let extra =
          vx[h2] != 0 ? extraYs.includes(ys[iy]) : extraXs.includes(xs[ix]);
        if (extra) c += extraLineCost;
      }
      let leaving =
        h2 == sd && isBetween(xs[ix], ys[iy], start, startClear, vx[sd], vy[sd]);
      let entering =
        h2 == ed &&
        isBetween(xs[jx], ys[jy], end, endClear, -vx[ed], -vy[ed]);
      if (!leaving && isNear(xs[ix], ys[iy], xs[jx], ys[jy], from, clearance))
        c += nearCost;
      if (!entering && isNear(xs[ix], ys[iy], xs[jx], ys[jy], to, clearance))
        c += nearCost;
      if (c < cost[s2]) {
        cost[s2] = c;
        prev[s2] = s;
      }
    }
  }

  if (cost[endState] == Infinity) {
    // give up on the minimum lengths before giving up on the route
    if (minStartLength > 0 || minEndLength > 0)
      return routeOrthogonal(
        from,
        to,
        start,
        end,
        startDirection,
        endDirection,
        clearance,
      );
    return [start, end];
  }

  let points: Point[] = [];
  let lastHeading = -1;
  for (let s = endState; s >= 0; s = prev[s]) {
    let h = s % 4,
      node = (s - h) / 4;
    // keep only the endpoints and the corners
    if (s == endState || h != lastHeading || prev[s] < 0)
      points.push({ x: xs[node % nx], y: ys[Math.floor(node / nx)] });
    lastHeading = h;
  }
  return points.reverse();
}

/**
 * Returns the coordinates on one axis that the route is allowed to use:
 * the endpoints, the middle of the gap between the boxes and the lines passing around each of the boxes.
 */
function getGridLines(
  a1: number,
  a2: number,
  b1: number,
  b2: number,
  clearance: number,
  ...lines: number[]
): number[] {
  let gapStart = Math.min(a2, b2),
    gapEnd = Math.max(a1, b1),
    hasGap = gapStart < gapEnd;

  if (hasGap) lines.push((gapStart + gapEnd) / 2);

  for (let v of [a1 - clearance, a2 + clearance, b1 - clearance, b2 + clearance]) {
    // lines between the boxes always go through the middle of the gap
    if (hasGap && v > gapStart && v < gapEnd) continue;
    lines.push(v);
  }

  return Array.from(new Set(lines)).sort((a, b) => a - b);
}

/** Adds the lines which are missing and returns those that were added. */
function addLines(lines: number[], ...extra: number[]): number[] {
  let added = extra.filter((v) => !lines.includes(v));
  if (added.length > 0) {
    lines.push(...added);
    lines.sort((a, b) => a - b);
  }
  return added;
}

/** Checks if the point lies on the line going from `a` to `b` in the given direction, before `b`. */
function isBetween(
  x: number,
  y: number,
  a: Point,
  b: Point,
  dx: number,
  dy: number,
) {
  if ((x - a.x) * dy != (y - a.y) * dx) return false;
  return (
    (x - a.x) * dx + (y - a.y) * dy >= 0 && (b.x - x) * dx + (b.y - y) * dy > 0
  );
}

/** Checks if the segment passes closer to the box than the clearance. */
function isNear(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  box: Box,
  clearance: number,
) {
  return (
    Math.max(x1, x2) > box.l - clearance &&
    Math.min(x1, x2) < box.r + clearance &&
    Math.max(y1, y2) > box.t - clearance &&
    Math.min(y1, y2) < box.b + clearance
  );
}

function hits(x1: number, y1: number, x2: number, y2: number, box: Box) {
  return (
    Math.max(x1, x2) >= box.l &&
    Math.min(x1, x2) <= box.r &&
    Math.max(y1, y2) >= box.t &&
    Math.min(y1, y2) <= box.b
  );
}
