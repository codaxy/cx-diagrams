/** @jsxImportSource react */
import { RenderingContext, Instance, NumberProp, BooleanProp } from "cx/ui";
import { BoundedObject, BoundedObjectConfig, Rect } from "cx/svg";
import { DiagramState } from "./DiagramState";
import { addEventListenerWithOptions, debounce } from "cx/util";
import { getCursorPos, captureMouseOrTouch } from "cx/widgets";
import { VDOM } from "cx/ui";
import { NodeInstance, Box } from "./Node";

export interface DiagramConfig extends BoundedObjectConfig {
  /** Zoom level. */
  zoom?: NumberProp;

  /** Horizontal offset (pan). */
  offsetX?: NumberProp;

  /** Vertical offset (pan). */
  offsetY?: NumberProp;

  /** Unit size in pixels. */
  unitSize?: NumberProp;

  /** Set to true to center the content both horizontally and vertically. */
  center?: boolean;

  /** Set to true to center the content horizontally. */
  centerX?: boolean;

  /** Set to true to center the content vertically. */
  centerY?: boolean;

  /** Show grid lines. */
  showGrid?: BooleanProp;

  /** Set to true to disable zooming and panning. */
  fixed?: BooleanProp;
}

interface DiagramData {
  zoom: number;
  offsetX: number;
  offsetY: number;
  unitSize: number;
  showGrid?: boolean;
  fixed?: boolean;
  bounds: Rect;
  classNames: string;
  style?: any;
  stateMods?: Record<string, any>;
}

export interface DiagramInstance extends Instance {
  data: DiagramData;
  diagramState: DiagramState;
  children: NodeInstance[];
}

export class Diagram extends BoundedObject<DiagramConfig> {
  constructor(config?: DiagramConfig) {
    super(config);
  }

  declare offsetX: number;
  declare offsetY: number;
  declare zoom: number;
  declare anchors: string;
  declare baseClass: string;
  declare styled: boolean;
  declare unitSize: number;
  declare centerX: boolean;
  declare centerY: boolean;
  declare center: boolean;
  declare showGrid: boolean;
  declare fixed: boolean;

  init() {
    if (this.center) {
      this.centerX = true;
      this.centerY = true;
    }
    super.init();
  }

  declareData(...args: any[]) {
    super.declareData(...args, {
      offsetX: undefined,
      offsetY: undefined,
      zoom: undefined,
      unitSize: undefined,
      showGrid: undefined,
      fixed: undefined,
    });
  }

  prepareData(context: RenderingContext, instance: DiagramInstance) {
    let { data } = instance;
    data.stateMods = {
      ...data.stateMods,
      pannable: !data.fixed,
    };
    super.prepareData(context, instance);
  }

  explore(context: RenderingContext, instance: DiagramInstance) {
    let { data } = instance;
    let ds = (instance.diagramState = new DiagramState());
    ds.unitSize = data.unitSize;
    context.push("diagram", ds);
    super.explore(context, instance);
  }

  exploreCleanup(context: RenderingContext, instance: DiagramInstance) {
    context.pop("diagram");

    let r2 = 0;
    let c2 = 0;
    let r1 = 0;
    let c1 = 0;

    let { children } = instance;
    if (this.centerX || this.centerY) {
      for (let child of children) {
        let box = child.box;
        if (!box) continue;
        if (box.row < r1) r1 = box.row;
        if (box.row + box.height > r2) r2 = box.row + box.height;
        if (box.col < c1) c1 = box.col;
        if (box.col + box.width > c2) c2 = box.col + box.width;
      }

      let dc = (c1 - c2) / 2;
      let dr = (r1 - r2) / 2;

      for (let child of children) {
        let box = child.box;
        if (!box) continue;
        box.row += dr;
        box.col += dc;
      }
    }
  }

  prepare(context: RenderingContext, instance: DiagramInstance) {
    super.prepare(context, instance);
    context.push("diagram", instance.diagramState);
  }

  prepareCleanup(context: RenderingContext, instance: DiagramInstance) {
    context.pop("diagram");
    super.prepareCleanup(context, instance);
  }

  render(context: RenderingContext, instance: DiagramInstance, key: string) {
    let { data } = instance;
    return (
      <DiagramComponent key={key} data={data} instance={instance}>
        {this.renderChildren(context, instance)}
      </DiagramComponent>
    );
  }
}

Diagram.prototype.offsetX = 0;
Diagram.prototype.offsetY = 0;
Diagram.prototype.zoom = 1;
Diagram.prototype.anchors = "0 1 1 0";
Diagram.prototype.baseClass = "diagram";
Diagram.prototype.styled = true;
Diagram.prototype.unitSize = 32;
Diagram.prototype.centerX = false;
Diagram.prototype.centerY = false;
Diagram.prototype.center = false;
Diagram.prototype.showGrid = false;
Diagram.prototype.fixed = false;

const defaultZoomStep = 0.05;
const minZoom = 0.25;
const maxZoom = 4;

interface DiagramComponentProps {
  data: DiagramData;
  instance: DiagramInstance;
  children?: React.ReactNode;
}

interface DiagramComponentState {
  zoom: number;
  offsetX: number;
  offsetY: number;
}

interface CaptureData {
  mode: "pan" | "zoom";
  touchOperation: number;
  dx?: number;
  dy?: number;
  cx?: number;
  cy?: number;
  originalZoom?: number;
  pointsDistance?: number;
}

class DiagramComponent extends VDOM.Component<
  DiagramComponentProps,
  DiagramComponentState
> {
  el: SVGGElement | null = null;
  touchOperation: number = 0;
  offWheel?: () => void;
  saveState: () => void;
  refs: any;

  constructor(props: DiagramComponentProps) {
    super(props);
    this.state = {
      zoom: props.data.zoom,
      offsetX: props.data.offsetX,
      offsetY: props.data.offsetY,
    };

    this.saveState = debounce(() => {
      let { instance } = this.props;
      let { zoom, offsetX, offsetY } = this.state;
      instance.set("zoom", zoom);
      instance.set("offsetX", offsetX);
      instance.set("offsetY", offsetY);
    }, 100);

    this.handleInitialMouseMove = this.handleInitialMouseMove.bind(this);
  }

  elRef = (el: SVGGElement | null) => {
    this.el = el;
  };

  componentWillReceiveProps(props: DiagramComponentProps) {
    this.setState({
      zoom: props.data.zoom,
      offsetX: props.data.offsetX,
      offsetY: props.data.offsetY,
    });
  }

  render() {
    let { offsetX, offsetY, zoom } = this.state;
    let { data, children } = this.props;
    let { bounds } = data;

    let cx = (bounds.r - bounds.l) / 2 + offsetX;
    let cy = (bounds.b - bounds.t) / 2 + offsetY;

    let path = null;
    if (data.showGrid) {
      let p = "";
      let d = data.unitSize * zoom;

      let fromX = Math.ceil((bounds.l - cx) / d);
      let toX = Math.floor((bounds.r - cx) / d);

      for (let x = fromX; x <= toX; x++)
        p += `M ${cx + x * d} ${bounds.t} L ${cx + x * d} ${bounds.b}`;

      let fromY = Math.ceil((bounds.t - cy) / d);
      let toY = Math.floor((bounds.b - cy) / d);

      for (let y = fromY; y <= toY; y++)
        p += `M ${bounds.l} ${cy + y * d} L ${bounds.r} ${cy + y * d}`;

      path = (
        <path style={data.style} d={p} stroke="lightgray" strokeWidth={0.5} />
      );
    }

    return (
      <g
        className={data.classNames}
        ref={this.elRef}
        onMouseMove={this.handleInitialMouseMove}
      >
        <rect
          x={data.bounds.l}
          y={data.bounds.t}
          width={data.bounds.width()}
          height={data.bounds.height()}
          fill="transparent"
          stroke="transparent"
        />
        {path}
        <g transform={`translate(${cx}, ${cy}) scale(${zoom}, ${zoom})`}>
          {children}
        </g>
      </g>
    );
  }

  componentDidMount() {
    if (this.el) {
      this.offWheel = addEventListenerWithOptions(
        this.el,
        "wheel",
        (e: WheelEvent) => this.handleWheel(e),
        { passive: false }
      );
    }
  }

  componentWillUnmount() {
    if (this.offWheel) this.offWheel();
  }

  handleWheel(ev: WheelEvent) {
    if (this.props.data.fixed) return;
    if (ev.deltaY > 0) this.zoomOut(ev, false);
    else this.zoomIn(ev, false);

    ev.stopPropagation();
    ev.preventDefault();
  }

  zoom(
    e: MouseEvent | TouchEvent,
    factor: number,
    center = true,
    zoomStep = defaultZoomStep,
    pinchPoint?: { x: number; y: number }
  ) {
    let nzoom = (1 + factor * zoomStep) * this.state.zoom;
    this.zoomTo(e, nzoom, center, pinchPoint);
  }

  zoomTo(
    e: MouseEvent | TouchEvent,
    zoom: number,
    center?: boolean,
    pinchPoint?: { x: number; y: number }
  ) {
    let mx: number | undefined, my: number | undefined;

    if (pinchPoint) {
      let el = e.currentTarget as Element;
      let bounds = el.getBoundingClientRect();
      mx = pinchPoint.x - bounds.left;
      my = pinchPoint.y - bounds.top;
    } else if (!center && this.el) {
      let bounds = this.el.firstElementChild?.getBoundingClientRect();
      if (bounds) {
        let cursor = getCursorPos(e);
        mx = cursor.clientX - (bounds.left + bounds.right) / 2;
        my = cursor.clientY - (bounds.top + bounds.bottom) / 2;
      }
    }

    zoom = Math.max(minZoom, Math.min(maxZoom, zoom));

    let offsetX =
      mx !== undefined
        ? mx - (zoom / this.state.zoom) * (mx - this.state.offsetX)
        : this.state.offsetX;
    let offsetY =
      my !== undefined
        ? my - (zoom / this.state.zoom) * (my - this.state.offsetY)
        : this.state.offsetY;

    this.setState(
      {
        zoom,
        offsetX,
        offsetY,
      },
      this.saveState
    );
  }

  zoomIn(e: MouseEvent | TouchEvent, center: boolean) {
    this.zoom(e, 1, center);
  }

  zoomOut(e: MouseEvent | TouchEvent, center: boolean) {
    this.zoom(e, -1, center);
  }

  handleInitialMouseMove(e: React.MouseEvent) {
    if (e.buttons != 1) return;
    if (this.props.data.fixed) return;
    let cursor = getCursorPos(e.nativeEvent);
    let nativeEvent = e.nativeEvent as MouseEvent & { touches?: TouchList };
    let mode: "pan" | "zoom" =
      nativeEvent.touches && nativeEvent.touches.length >= 2 ? "zoom" : "pan";
    let captureData: CaptureData = {
      mode,
      touchOperation: ++this.touchOperation,
    };

    if (mode == "pan") {
      captureData.dx = this.state.offsetX - cursor.clientX;
      captureData.dy = this.state.offsetY - cursor.clientY;
    } else if (nativeEvent.touches) {
      captureData.cx =
        (nativeEvent.touches[0].clientX + nativeEvent.touches[1].clientX) / 2;
      captureData.cy =
        (nativeEvent.touches[0].clientY + nativeEvent.touches[1].clientY) / 2;
      captureData.originalZoom = this.state.zoom;
      captureData.pointsDistance = Math.sqrt(
        Math.pow(
          nativeEvent.touches[0].clientX - nativeEvent.touches[1].clientX,
          2
        ) +
          Math.pow(
            nativeEvent.touches[0].clientY - nativeEvent.touches[1].clientY,
            2
          )
      );
    }

    captureMouseOrTouch(
      e.nativeEvent,
      (ev: MouseEvent | TouchEvent, data: CaptureData) => {
        this.handleMouseMove(ev, data);
      },
      () => {},
      captureData,
      "grabbing"
    );

    e.stopPropagation();
    (document.activeElement as HTMLElement)?.blur();
  }

  handleMouseMove(e: MouseEvent | TouchEvent, captureData: CaptureData) {
    if (captureData.touchOperation != this.touchOperation) return;

    if (captureData.mode == "pan") {
      let cursor = getCursorPos(e);
      let offsetX = cursor.clientX + captureData.dx!;
      let offsetY = cursor.clientY + captureData.dy!;
      if (!isNaN(offsetX) && !isNaN(offsetY)) {
        this.setState(
          {
            offsetX: offsetX,
            offsetY: offsetY,
          },
          this.saveState
        );
      }
    } else {
      let touchEvent = e as TouchEvent;
      if (touchEvent.touches && touchEvent.touches.length >= 2) {
        let pointsDistance = Math.sqrt(
          Math.pow(
            touchEvent.touches[0].clientX - touchEvent.touches[1].clientX,
            2
          ) +
            Math.pow(
              touchEvent.touches[0].clientY - touchEvent.touches[1].clientY,
              2
            )
        );
        let newZoom =
          (pointsDistance / captureData.pointsDistance!) *
          captureData.originalZoom!;
        this.zoomTo(e, newZoom, false, {
          x: captureData.cx!,
          y: captureData.cy!,
        });
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
}
