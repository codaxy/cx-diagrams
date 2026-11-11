export type Direction = "right" | "down" | "left" | "up";

export type ShapeType = "rectangle" | "circle" | "rhombus";

export interface Point {
  x: number;
  y: number;
}

/** A straight piece of a line. Lines expose their segments to children such as `ArrowHead`. */
export interface LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
