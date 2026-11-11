# Changelog

## Unreleased

**Features**

- `ElbowLine` is a new line which connects two shapes given a `startDirection` and an `endDirection`. It works out the route on its own, using one to five horizontal and vertical segments, and goes around the two shapes when needed. `startOffset` and `endOffset` move the endpoints along the side of the shape. `cornerRadius` rounds the corners and `smooth` draws a curve instead. `minStartLength` and `minEndLength` keep the first and the last segment long enough for an arrow head and default to 8 pixels
- `TwoSegmentLine` and `ThreeSegmentLine` take `cornerRadius` to round their corners
- `getPolylinePath`, `getCurve` and `getLineSegments` are exported for building custom lines. `getPolylinePath` turns a list of points into an SVG path with optionally rounded corners, `getCurve` returns a smooth curve between two points, and `getLineSegments` converts points into the segments which `ArrowHead` uses

**Fixes**

- `TwoSegmentLine` and `ThreeSegmentLine` are drawn as a single path, so their segments join cleanly at the corners instead of leaving a notch
- An `ArrowHead` at the end of a `TwoSegmentLine` with `direction` set to `up` or `down` is placed at the end of the line; it was placed at the corner

**Other**

- The `Direction`, `ShapeType` and `LineSegment` types are declared once in `types.ts` instead of in every component. `Direction`, `LineSegment` and `Point` are exported from the package

## 26.9.0

**Features**

- `Shape` supports selection through a `selection` configuration, following the same model as CxJS `Grid`, `List` and chart elements. Click selects, Ctrl+click toggles, Shift+click extends a multiple selection. Selected shapes get the `cxs-selected` state, which thickens the outline by `$cx-diagram-shape-selected-stroke-width`
- `Diagram` takes `zoomStep`, `minZoom` and `maxZoom` to configure wheel zooming and its limits. They default to `0.05`, `0.25` and `4`, the previously fixed values

**Fixes**

- `Diagram` no longer resets the user's zoom and pan when it re-renders for an unrelated store change, such as a selection. It now only adopts values from the store when the bound values actually changed
- `ArrowHead` applies `strokeWidth`; it was ignored ([#8](https://github.com/codaxy/cx-diagrams/issues/8))
- A `Flow` with `direction="down"` applies its children's end margin `me`, like the other directions ([#9](https://github.com/codaxy/cx-diagrams/issues/9))
- `FourSides` accepts a binding or computed value for `slots` in its TypeScript types, as it already did at runtime; the `Slot` type is exported
- `Draggable` and `Shape` compile without type errors against current CxJS versions

**Other**

- The minimum supported `cx` version is now 26.3.10
