/** @jsxImportSource react */

import { Rect } from "cx/svg";
import { VDOM, RenderingContext, NumberProp, Instance } from "cx/ui";
import { captureMouseOrTouch, getCursorPos } from "cx/widgets";
import { Node, NodeConfig, NodeInstance } from "cx-diagrams";

export interface DraggableConfig extends NodeConfig {
  offsetX?: NumberProp;
  offsetY?: NumberProp;
}

export class Draggable extends Node {
  declare offsetX: number;
  declare offsetY: number;

  constructor(config?: DraggableConfig) {
    super(config);
  }

  declareData(...args: any[]) {
    super.declareData(...args, {
      offsetX: undefined,
      offsetY: undefined,
    });
  }

  // Calculate own box from children, like Flow does
  exploreCleanup(context: RenderingContext, instance: NodeInstance) {
    let { nodes, data } = instance;
    let minCol = Infinity,
      minRow = Infinity,
      maxCol = -Infinity,
      maxRow = -Infinity;

    for (let { box } of nodes) {
      if (!box) continue;
      if (box.col < minCol) minCol = box.col;
      if (box.row < minRow) minRow = box.row;
      if (box.col + box.width > maxCol) maxCol = box.col + box.width;
      if (box.row + box.height > maxRow) maxRow = box.row + box.height;
    }

    let width = maxCol === -Infinity ? 0 : maxCol - minCol;
    let height = maxRow === -Infinity ? 0 : maxRow - minRow;

    instance.box = {
      row: 0,
      col: 0,
      width,
      height,
      ml: data.ml,
      mr: data.mr,
      mt: data.mt,
      mb: data.mb,
      ms: data.ms,
      me: data.me,
    };

    super.exploreCleanup(context, instance);
  }

  // Position children relative to own box and apply offset
  prepare(context: RenderingContext, instance: NodeInstance) {
    let { box, nodes } = instance;
    let { data } = instance as any;
    if (!box) return;

    let { diagram } = instance;
    let ox = data.offsetX || 0;
    let oy = data.offsetY || 0;

    // Convert pixel offset to grid units
    let dCol = diagram ? ox / diagram.unitSize : 0;
    let dRow = diagram ? oy / diagram.unitSize : 0;

    for (let child of nodes) {
      if (!child.box) continue;
      child.box.col += box.col + dCol;
      child.box.row += box.row + dRow;
    }

    super.prepare(context, instance);
  }

  render(context: RenderingContext, instance: Instance, key: string) {
    let { data } = instance as any;
    return (
      <DraggableComponent
        key={key}
        instance={instance}
        offsetX={data.offsetX || 0}
        offsetY={data.offsetY || 0}
      >
        {this.renderChildren(context, instance)}
      </DraggableComponent>
    );
  }
}

Draggable.prototype.offsetX = 0;
Draggable.prototype.offsetY = 0;

interface DraggableComponentProps {
  instance: Instance;
  offsetX: number;
  offsetY: number;
  children?: React.ReactNode;
}

class DraggableComponent extends VDOM.Component<DraggableComponentProps> {
  el: SVGGElement | null = null;

  render() {
    let { children } = this.props;

    return (
      <g
        style={{ cursor: "grab" }}
        ref={(el) => {
          this.el = el;
        }}
        onMouseDown={(e) => this.handleMouseDown(e)}
      >
        {children}
      </g>
    );
  }

  handleMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;

    let cursor = getCursorPos(e.nativeEvent);
    let scale = this.el?.getScreenCTM()?.a || 1;
    let { instance, offsetX, offsetY } = this.props;

    let captureData = {
      startX: cursor.clientX,
      startY: cursor.clientY,
      scale,
      startOffsetX: offsetX,
      startOffsetY: offsetY,
    };

    captureMouseOrTouch(
      e.nativeEvent,
      (ev: MouseEvent) => {
        let pos = getCursorPos(ev);
        let dx = (pos.clientX - captureData.startX) / captureData.scale;
        let dy = (pos.clientY - captureData.startY) / captureData.scale;
        instance.set("offsetX", captureData.startOffsetX + dx);
        instance.set("offsetY", captureData.startOffsetY + dy);
      },
      () => {},
      captureData,
      "grabbing",
    );

    e.stopPropagation();
  }
}
