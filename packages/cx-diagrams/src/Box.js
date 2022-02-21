import { Node } from "./Node";

export class Box extends Node {
    declareData(...args) {
        super.declareData(...args, {
            width: undefined,
            height: undefined,
        });
    }

    explore(context, instance) {
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

Box.prototype.width = 1;
Box.prototype.height = 1;
