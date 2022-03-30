export class DiagramState {
   unitSize = 16;
   shapes = {};

   map(x, y) {
      return { x: x * this.unitSize, y: y * this.unitSize };
   }

   registerShapeBounds(id, shape, bounds) {
      let data = this.shapes[id];
      if (!data) data = this.shapes[id] = {};
      data.bounds = bounds;
      data.shape = shape;
   }

   getShape(id) {
      let data = this.shapes[id];
      if (!data || !data.bounds)
         throw new Error(
            `Shape ${id} has no registered bounds. Please make sure that shapes have correct ids and connections come afterwards.`
         );
      return data;
   }

   hasShape(id) {
      return !!this.shapes[id];
   }
}
