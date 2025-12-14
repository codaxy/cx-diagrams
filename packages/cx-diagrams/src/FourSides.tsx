import { RenderingContext, NumberProp } from "cx/ui";
import { Node, NodeConfig, NodeInstance } from "./Node";

type Slot = "center" | "right" | "down" | "left" | "up";

export interface FourSidesConfig extends NodeConfig {
    /** Gap between center and side elements. */
    gap?: NumberProp;

    /** Slot assignments for children. */
    slots?: Slot[];
}

interface FourSidesData {
    gap: number;
    slots: Slot[];
    ml?: number;
    mr?: number;
    mt?: number;
    mb?: number;
    ms?: number;
    me?: number;
}

export interface FourSidesInstance extends NodeInstance {
    data: FourSidesData;
}

export class FourSides extends Node {
    constructor(config?: FourSidesConfig) {
        super(config);
    }

    declare slots: Slot[];
    declare gap: number;

    declareData(...args: any[]) {
        super.declareData(...args, {
            gap: undefined,
            slots: undefined,
        });
    }

    exploreCleanup(context: RenderingContext, instance: FourSidesInstance) {
        let { nodes, data } = instance;
        let innerWidth = 0;
        let innerHeight = 0;

        for (let i = 0; i < data.slots.length; i++) {
            let child = nodes[i];
            let slot = data.slots[i];

            if (!slot || !child || !child.box) continue;

            switch (slot) {
                case "down":
                case "up":
                case "center":
                    if (child.box.width > innerWidth) innerWidth = child.box.width;
                    break;
            }

            switch (slot) {
                case "right":
                case "left":
                case "center":
                    if (child.box.height > innerHeight) innerHeight = child.box.height;
                    break;
            }
        }

        let { ml, mr, mt, mb, ms, me, gap } = data;

        let col = -innerWidth / 2,
            row = -innerHeight / 2,
            width = innerWidth,
            height = innerHeight;

        for (let i = 0; i < data.slots.length; i++) {
            let child = nodes[i];
            let slot = data.slots[i];
            if (!slot || !child || !child.box) continue;

            switch (slot) {
                case "center":
                    child.box.col = -child.box.width / 2;
                    child.box.row = -child.box.height / 2;
                    break;

                case "right":
                    child.box.col = innerWidth / 2 + gap;
                    child.box.row = -child.box.height / 2;
                    width += child.box.width + gap;
                    break;

                case "left":
                    child.box.col = -innerWidth / 2 - child.box.width - gap;
                    child.box.row = -child.box.height / 2;
                    width += child.box.width + gap;
                    col -= child.box.width + gap;
                    break;

                case "down":
                    child.box.col = -child.box.width / 2;
                    child.box.row = innerHeight / 2 + gap;
                    height += child.box.height + gap;
                    break;

                case "up":
                    child.box.col = -child.box.width / 2;
                    child.box.row = -innerHeight / 2 - child.box.height - gap;
                    height += child.box.height + gap;
                    row -= child.box.height + gap;
                    break;
            }
        }

        instance.box = {
            row: 0,
            col: 0,
            width,
            height,
            ml,
            mr,
            mb,
            mt,
            ms,
            me,
        };

        // Position everything at point (0, 0)
        for (let i = 0; i < nodes.length; i++) {
            let child = nodes[i];
            if (!child.box) continue;
            child.box.col -= col;
            child.box.row -= row;
        }

        super.exploreCleanup(context, instance);
    }

    prepare(context: RenderingContext, instance: FourSidesInstance) {
        let { box, nodes } = instance;

        if (!box) return;

        // Reposition child components if the component has been repositioned from the outside
        if (box.col != 0 || box.row != 0) {
            for (let i = 0; i < nodes.length; i++) {
                let child = nodes[i];
                if (!child.box) continue;
                child.box.col += box.col;
                child.box.row += box.row;
            }
        }

        super.prepare(context, instance);
    }
}

FourSides.prototype.slots = ["center", "right", "down", "left", "up"];
FourSides.prototype.gap = 0;
