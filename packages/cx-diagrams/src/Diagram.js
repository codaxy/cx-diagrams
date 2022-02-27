import { VDOM } from "cx/ui";
import { BoundedObject } from "cx/svg";
import { DiagramState } from "./DiagramState";
import { addEventListenerWithOptions, debounce } from "cx/util";
import { getCursorPos, captureMouseOrTouch } from "cx/widgets";

export class Diagram extends BoundedObject {
   init() {
      if (this.center) {
         this.centerX = true;
         this.centerY = true;
      }
      super.init();
   }

   declareData(...args) {
      super.declareData(...args, {
         offsetX: undefined,
         offsetY: undefined,
         zoom: undefined,
         unitSize: undefined,
      });
   }

   explore(context, instance) {
      let { data } = instance;
      let ds = (instance.diagramState = new DiagramState());
      ds.unitSize = data.unitSize;
      context.push("diagram", ds);
      super.explore(context, instance);
   }

   exploreCleanup(context, instance) {
      context.pop("diagram");
   }

   prepare(context, instance) {
      let r2 = 0;
      let c2 = 0;
      let r1 = 0;
      let c1 = 0;

      let { children } = instance;
      if (this.centerX || this.centerY) {
         for (let { box } of children) {
            if (!box) continue;
            if (box.row < r1) r1 = box.row;
            if (box.row + box.height > r2) r2 = box.row + box.height;
            if (box.col < c1) c1 = box.col;
            if (box.col + box.width > c2) c2 = box.col + box.width;
         }

         let dc = (c1 - c2) / 2;
         let dr = (r1 - r2) / 2;

         for (let { box } of children) {
            if (!box) continue;
            box.row += dr;
            box.col += dc;
         }
      }

      super.prepare(context, instance);
      context.push("diagram", instance.diagramState);
   }

   prepareCleanup(context, instance) {
      context.pop("diagram");
      super.prepareCleanup(context, instance);
   }

   render(context, instance, key) {
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

const defaultZoomStep = 0.05;
const minZoom = 0.25;
const maxZoom = 4;

class DiagramComponent extends VDOM.Component {
   constructor(props) {
      super(props);
      this.state = {
         zoom: props.data.zoom,
         offsetX: props.data.offsetX,
         offsetY: props.data.offsetY,
      };
      this.touchOperation = 0;

      this.saveState = debounce(() => {
         let { instance } = this.props;
         let { zoom, offsetX, offsetY } = this.state;
         instance.set("zoom", zoom);
         instance.set("offsetX", offsetX);
         instance.set("offsetY", offsetY);
      }, 100);

      this.handleInitialMouseMove = this.handleInitialMouseMove.bind(this);
      this.elRef = (el) => {
         this.el = el;
      };
   }

   componentWillReceiveProps(props) {
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

      let d = data.unitSize * zoom;

      let cx = (bounds.r - bounds.l) / 2 + offsetX;
      let cy = (bounds.b - bounds.t) / 2 + offsetY;

      let path = "";

      let fromX = Math.ceil((bounds.l - cx) / d);
      let toX = Math.floor((bounds.r - cx) / d);

      for (let x = fromX; x <= toX; x++) path += `M ${cx + x * d} ${bounds.t} L ${cx + x * d} ${bounds.b}`;

      let fromY = Math.ceil((bounds.t - cy) / d);
      let toY = Math.floor((bounds.b - cy) / d);

      for (let y = fromY; y <= toY; y++) path += `M ${bounds.l} ${cy + y * d} L ${bounds.r} ${cy + y * d}`;

      return (
         <g className={data.classNames} ref={this.elRef} onMouseMove={this.handleInitialMouseMove}>
            <rect
               x={data.bounds.l}
               y={data.bounds.t}
               width={data.bounds.width()}
               height={data.bounds.height()}
               fill="transparent"
               stroke="transparent"
            />
            <path style={data.style} d={path} stroke="lightgray" strokeWidth={0.5} />
            <g transform={`translate(${cx}, ${cy}) scale(${zoom}, ${zoom})`}>{children}</g>
         </g>
      );
   }

   componentDidMount() {
      this.offWheel = addEventListenerWithOptions(this.el, "wheel", (e) => this.handleWheel(e));
   }

   componentWillUnmount() {
      this.offWheel();
   }

   handleWheel(ev) {
      if (ev.deltaY > 0) this.zoomOut(ev, false);
      else this.zoomIn(ev, false);

      ev.stopPropagation();
      ev.preventDefault();
   }

   zoom(e, factor, center = true, zoomStep = defaultZoomStep, pinchPoint) {
      let nzoom = (1 + factor * zoomStep) * this.state.zoom;
      this.zoomTo(e, nzoom, center, pinchPoint);
   }

   zoomTo(e, zoom, center, pinchPoint) {
      let mx, my;

      if (pinchPoint) {
         let el = e.currentTarget;
         let bounds = el.getBoundingClientRect();
         mx = pinchPoint.x - bounds.left;
         my = pinchPoint.y - bounds.top;
      } else if (!center) {
         let el = e.currentTarget;
         let bounds = this.el.firstElementChild.getBoundingClientRect();
         let cursor = getCursorPos(e);
         mx = cursor.clientX - (bounds.left + bounds.right) / 2;
         my = cursor.clientY - (bounds.top + bounds.bottom) / 2;
      }

      zoom = Math.max(minZoom, Math.min(maxZoom, zoom));

      let offsetX = mx - (zoom / this.state.zoom) * (mx - this.state.offsetX);
      let offsetY = my - (zoom / this.state.zoom) * (my - this.state.offsetY);

      this.setState(
         {
            zoom,
            offsetX,
            offsetY,
         },
         this.saveState
      );
   }

   zoomIn(e, center) {
      this.zoom(e, 1, center);
   }

   zoomOut(e, center) {
      this.zoom(e, -1, center);
   }

   handleInitialMouseMove(e) {
      if (e.buttons != 1) return;
      let cursor = getCursorPos(e);
      let mode = e.touches && e.touches.length >= 2 ? "zoom" : "pan";
      let captureData = {
         mode,
         touchOperation: ++this.touchOperation,
      };

      if (mode == "pan") {
         captureData.dx = this.state.offsetX - cursor.clientX;
         captureData.dy = this.state.offsetY - cursor.clientY;
      } else {
         captureData.cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
         captureData.cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
         captureData.originalZoom = view.zoom;
         captureData.pointsDistance = Math.sqrt(
            Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
               Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
         );
      }

      captureMouseOrTouch(
         e,
         (e, captureData) => {
            this.handleMouseMove(e, captureData);
         },
         () => {},
         captureData,
         "grabbing"
      );

      e.stopPropagation();
      //e.preventDefault(); //prevents clicks
      document.activeElement.blur(); //hide the context menu
   }

   handleMouseMove(e, captureData) {
      if (captureData.touchOperation != this.touchOperation) return;

      if (captureData.mode == "pan") {
         let cursor = getCursorPos(e);
         let offsetX = cursor.clientX + captureData.dx;
         let offsetY = cursor.clientY + captureData.dy;
         if (offsetX != NaN && offsetY != NaN) {
            this.setState(
               {
                  offsetX: offsetX,
                  offsetY: offsetY,
               },
               this.saveState
            );
         }
      } else {
         let pointsDistance = Math.sqrt(
            Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
               Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
         );
         //console.log(captureData, e.touches);
         let newZoom = (pointsDistance / captureData.pointsDistance) * captureData.originalZoom;
         this.zoomTo(e, newZoom, false, { x: captureData.cx, y: captureData.cy });
         //console.log('ZOOM');
         e.stopPropagation();
         e.preventDefault();
      }
   }
}
