import { Rect } from "cx/svg";
import { PureContainer } from "cx/ui";

export class ConnectionBox extends PureContainer {

    declareData(...args) {
        super.declareData(...args, {
            from: undefined,
            to: undefined
        })
    }

    calculateBounds(context, instance) {
        let { data } = instance;
        if (!data.from || !data.to || !context.diagram) return new Rect();

        var { bounds: sb, shape: startShape } = context.diagram.getShape(data.from);
        var { bounds: eb, shape: endShape } = context.diagram.getShape(data.to);

        return new Rect({
            t: (sb.t + sb.b) / 2, l: (sb.l + sb.r) / 2, b: (eb.t + eb.b) / 2, r: (eb.l + eb.r) / 2
        });
    }

    prepare(context, instance) {
        instance.bounds = this.calculateBounds(context, instance);
        context.push('parentRect', instance.bounds);
    }

    prepareCleanup(context, instance) {
        context.pop('parentRect');
    }
}