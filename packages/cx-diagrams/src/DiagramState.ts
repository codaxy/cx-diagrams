import { Rect } from "cx/svg";

type ShapeType = "circle" | "rectangle" | "rhombus";

interface ShapeData {
    bounds?: Rect;
    shape?: ShapeType;
}

export class DiagramState {
    unitSize: number = 16;
    shapes: Record<string, ShapeData> = {};

    map(x: number, y: number): { x: number; y: number } {
        return { x: x * this.unitSize, y: y * this.unitSize };
    }

    registerShapeBounds(id: string, shape: ShapeType, bounds: Rect): void {
        let data = this.shapes[id];
        if (!data) data = this.shapes[id] = {};
        data.bounds = bounds;
        data.shape = shape;
    }

    getShape(id: string): ShapeData {
        let data = this.shapes[id];
        if (!data || !data.bounds)
            throw new Error(
                `Shape ${id} has no registered bounds. Please make sure that shapes have correct ids and connections come afterwards.`
            );
        return data;
    }

    hasShape(id: string): boolean {
        return !!this.shapes[id];
    }
}
