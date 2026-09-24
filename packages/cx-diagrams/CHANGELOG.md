# Changelog

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
