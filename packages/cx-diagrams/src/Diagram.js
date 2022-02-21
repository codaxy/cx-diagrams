import { VDOM } from "cx/ui";
import { BoundedObject } from "cx/svg";
import { DiagramState } from "./DiagramState";
import { addEventListenerWithOptions } from "cx/util";
import { getCursorPos, captureMouseOrTouch } from "cx/widgets";

export class Diagram extends BoundedObject {
    declareData(...args) {
        super.declareData(...args, {
            offsetX: undefined,
            offsetY: undefined,
            zoom: undefined,
            unitSize: undefined
        });
    }

    explore(context, instance) {
        let { data } = instance;
        let ds = (instance.diagramState = new DiagramState());
        ds.sizeX = ds.sizeY = data.unitSize;
        ds.offsetX = data.offsetX;
        ds.offsetY = data.offsetY;
        ds.zoom = data.zoom;
        context.push("diagram", ds);
        super.explore(context, instance);
    }

    exploreCleanup(context, instance) {
        context.pop("diagram");
    }

    prepare(context, instance) {
        super.prepare(context, instance);
        context.push("diagram", instance.diagramState);
    }

    prepareCleanup(context, instance) {
        context.pop("diagram");
        super.prepareCleanup(context, instance);
    }

    render(context, instance, key) {
        let { data } = instance;
        let state = instance.diagramState;
        return (
            <DiagramComponent key={key} zoom={state.zoom} offsetX={state.offsetX} offsetY={state.offsetY} data={data} instance={instance}>
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

const defaultZoomStep = 0.05;
const minZoom = 0.25;
const maxZoom = 4;

class DiagramComponent extends VDOM.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: props.zoom,
            offsetX: props.offsetX,
            offsetY: props.offsetY
        }
        this.touchOperation = 0;
    }

    render() {
        let { offsetX, offsetY, zoom } = this.state;
        let { data, children } = this.props;
        let { bounds } = data;

        var d = data.unitSize * zoom;

        let cx = (bounds.r - bounds.l) / 2 + offsetX;
        let cy = (bounds.b - bounds.t) / 2 + offsetY;

        let path = '';

        let fromX = Math.ceil((bounds.l - cx) / d) * d;
        let toX = Math.floor((bounds.r - cx) / d) * d;

        for (let x = fromX; x <= toX; x += d)
            path += `M ${cx + x} ${bounds.t} L ${cx + x} ${bounds.b}`;

        let fromY = Math.ceil((bounds.t - cy) / d) * d;
        let toY = Math.floor((bounds.b - cy) / d) * d;

        for (let y = fromY; y <= toY; y += d)
            path += `M ${bounds.l} ${cy + y} L ${bounds.r} ${cy + y}`;

        return (
            <g
                className={data.classNames}
                ref={el => { this.el = el }}
                onMouseDown={ev => this.handleMouseDown(ev)}
            >
                <rect x={data.bounds.l} y={data.bounds.t} width={data.bounds.width()} height={data.bounds.height()} fill="transparent" stroke="transparent" />
                <path style={data.style} d={path} stroke="lightgray" strokeWidth={0.5} />
                <g transform={`translate(${cx}, ${cy}) scale(${zoom}, ${zoom})`}>
                    {children}
                </g>
            </g>
        );
    }

    componentDidMount() {
        this.offWheel = addEventListenerWithOptions(this.el, 'wheel', e => this.handleWheel(e));
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
        var nzoom = (1 + factor * zoomStep) * this.state.zoom;
        this.zoomTo(e, nzoom, center, pinchPoint);
    }

    zoomTo(e, zoom, center, pinchPoint) {
        let mx, my;

        if (pinchPoint) {
            var el = e.currentTarget;
            var bounds = el.getBoundingClientRect();
            mx = pinchPoint.x - bounds.left;
            my = pinchPoint.y - bounds.top;
        } else if (!center) {
            var el = e.currentTarget;
            var bounds = this.el.firstElementChild.getBoundingClientRect();
            var cursor = getCursorPos(e);
            mx = cursor.clientX - (bounds.left + bounds.right) / 2;
            my = cursor.clientY - (bounds.top + bounds.bottom) / 2;
        }

        zoom = Math.max(minZoom, Math.min(maxZoom, zoom));

        this.setState({
            zoom,
            offsetX: mx - (zoom / this.state.zoom) * (mx - this.state.offsetX),
            offsetY: my - (zoom / this.state.zoom) * (my - this.state.offsetY)
        })
    }

    zoomIn(e, center) {
        this.zoom(e, 1, center);
    }

    zoomOut(e, center) {
        this.zoom(e, -1, center);
    }

    handleMouseDown(e) {
        var cursor = getCursorPos(e);
        var mode = e.touches && e.touches.length >= 2 ? 'zoom' : 'pan';
        var captureData = {
            mode,
            touchOperation: ++this.touchOperation,
        };

        if (mode == 'pan') {
            captureData.dx = this.state.offsetX - cursor.clientX;
            captureData.dy = this.state.offsetY - cursor.clientY;
        } else {
            captureData.cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            captureData.cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            captureData.originalZoom = view.zoom;
            captureData.pointsDistance = Math.sqrt(
                Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
                Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2),
            );
        }

        captureMouseOrTouch(
            e,
            (e, captureData) => {
                this.handleMouseMove(e, captureData);
            },
            () => { },
            captureData,
            'grabbing',
        );

        e.stopPropagation();
        e.preventDefault();
        document.activeElement.blur(); //hide the context menu
    }

    handleMouseMove(e, captureData) {
        if (captureData.touchOperation != this.touchOperation) return;

        if (captureData.mode == 'pan') {
            var cursor = getCursorPos(e);
            var x = cursor.clientX + captureData.dx;
            var y = cursor.clientY + captureData.dy;
            if (x != NaN && y != NaN) {
                this.setState({
                    offsetX: x,
                    offsetY: y
                });
            }
        } else {
            var pointsDistance = Math.sqrt(
                Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
                Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2),
            );
            //console.log(captureData, e.touches);
            var newZoom = (pointsDistance / captureData.pointsDistance) * captureData.originalZoom;
            this.zoomTo(e, newZoom, false, { x: captureData.cx, y: captureData.cy });
            //console.log('ZOOM');
            e.stopPropagation();
            e.preventDefault();
        }
    }
}