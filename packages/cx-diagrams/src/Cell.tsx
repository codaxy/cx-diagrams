import { isDefined } from "cx/util";
import { RenderingContext, NumberProp } from "cx/ui";
import { Node, NodeConfig, NodeInstance } from "./Node";

export interface CellConfig extends NodeConfig {
    /** Width of the cell. */
    width?: NumberProp;

    /** Width of the cell (shorthand). */
    w?: NumberProp;

    /** Height of the cell. */
    height?: NumberProp;

    /** Height of the cell (shorthand). */
    h?: NumberProp;
}

interface CellData {
    width: number;
    height: number;
    ml?: number;
    mr?: number;
    mt?: number;
    mb?: number;
    ms?: number;
    me?: number;
}

export interface CellInstance extends NodeInstance {
    data: CellData;
}

export class Cell extends Node {
    constructor(config?: CellConfig) {
        super(config);
    }

    declare width: number;
    declare height: number;
    declare w?: number;
    declare h?: number;

    init() {
        if (isDefined(this.w)) this.width = this.w;
        if (isDefined(this.h)) this.height = this.h;
        super.init();
    }

    declareData(...args: any[]) {
        super.declareData(...args, {
            width: undefined,
            height: undefined,
        });
    }

    explore(context: RenderingContext, instance: CellInstance) {
        instance.diagram = context.diagram;
        let { data } = instance;
        instance.box = {
            row: 0,
            col: 0,
            width: data.width,
            height: data.height,
            ml: data.ml,
            mr: data.mr,
            mt: data.mt,
            mb: data.mb,
            ms: data.ms,
            me: data.me,
        };
        super.explore(context, instance);
    }
}

Cell.prototype.width = 1;
Cell.prototype.height = 1;
