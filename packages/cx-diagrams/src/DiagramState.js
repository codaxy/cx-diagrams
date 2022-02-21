

export class DiagramState {
    sizeX = 16;
    sizeY = 16;
    shapes = {};

    map(x, y) {
        return { x: x * this.sizeX, y: y * this.sizeY }
    }

    registerShapeBounds(id, shape, bounds) {
        let data = this.shapes[id];
        if (!data)
            data = this.shapes[id] = {};
        data.bounds = bounds;
        data.shape = shape;
    }

    getShape(id) {
        let data = this.shapes[id];
        if (!data || !data.bounds)
            throw new Error(`Shape ${id} has no registered bounds. Please make sure that shapes have correct ids and connections come afterwards.`);
        return data;
    }
}