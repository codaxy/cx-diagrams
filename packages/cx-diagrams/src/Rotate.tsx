import { RenderingContext, NumberProp } from "cx/ui";
import { Node, NodeConfig, NodeInstance, NodeData } from "./Node";

type Direction = "right" | "down" | "left" | "up";

export interface RotateConfig extends NodeConfig {
    /** Number of 90-degree turns. */
    turns?: NumberProp;
}

interface RotateData extends NodeData {
    turns: number;
}

export interface RotateInstance extends NodeInstance {
    data: RotateData;
    direction?: Direction;
}

export class Rotate extends Node {
    constructor(config?: RotateConfig) {
        super(config);
    }

    declare turns: number;

    declareData(...args: any[]) {
        super.declareData(...args, {
            turns: undefined,
        });
    }

    explore(context: RenderingContext, instance: RotateInstance) {
        let turns = (context.rotationSteps || 0) + instance.data.turns;
        context.push("rotationSteps", turns);
        context.push("rotateDirection", (dir: Direction) => {
            let directions: Direction[] = ["right", "down", "left", "up"];
            let index = directions.indexOf(dir);
            let direction = (instance.direction = directions[(index + turns) % 4]);
            return direction;
        });
        super.explore(context, instance);
    }

    exploreCleanup(context: RenderingContext, instance: RotateInstance) {
        context.pop("rotateDirection");
        context.pop("rotationSteps");
        if (instance.nodes.length > 0) instance.box = instance.nodes[0].box;
        super.exploreCleanup(context, instance);
    }
}

Rotate.prototype.turns = 0;
