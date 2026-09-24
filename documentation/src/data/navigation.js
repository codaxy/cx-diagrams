/** @typedef {{ text: string; href: string; description?: string }} NavItem */
/** @typedef {{ title: string; icon?: string; items: NavItem[] }} NavGroup */

/** @type {NavGroup[]} */
export const navigation = [
  {
    title: "Introduction",
    icon: "intro",
    items: [
      { text: "About", href: "/", description: "What CxJS Diagrams is and what it can do" },
      { text: "Getting Started", href: "/getting-started", description: "Installation and a first diagram" },
    ],
  },
  {
    title: "Components",
    items: [
      { text: "Diagram", href: "/components/diagram", description: "Root container with zoom, pan and the grid" },
      { text: "Cell", href: "/components/cell", description: "Fixed-size box on the unit grid" },
      { text: "Shape", href: "/components/shape", description: "Rectangles, circles and rhombuses with text" },
      { text: "Flow", href: "/components/flow", description: "Lays children out in one direction" },
      { text: "Rotate", href: "/components/rotate", description: "Rotates the flow direction of its content" },
      { text: "FourSides", href: "/components/four-sides", description: "Places children around a center" },
      { text: "ArrowHead", href: "/components/arrow-head", description: "Arrow markers on lines" },
      { text: "Draggable", href: "/components/draggable", description: "Lets users move parts of a diagram" },
    ],
  },
  {
    title: "Lines",
    icon: "line",
    items: [
      { text: "StraightLine", href: "/lines/straight-line", description: "Straight connection between two shapes" },
      { text: "TwoSegmentLine", href: "/lines/two-segment-line", description: "L-shaped connection" },
      { text: "ThreeSegmentLine", href: "/lines/three-segment-line", description: "Z-shaped connection" },
    ],
  },
  {
    title: "Examples",
    icon: "example",
    items: [
      { text: "Network Diagram", href: "/examples/network-diagram", description: "Network topology" },
      { text: "Neural Network", href: "/examples/neural-network", description: "Layered neural network" },
      { text: "Selection", href: "/examples/selection", description: "Selecting shapes" },
    ],
  },
];
