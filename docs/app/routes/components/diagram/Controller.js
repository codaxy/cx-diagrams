export default {
   onInit() {
      this.store.init('$page.view', {
         zoom: 1,
         offsetX: 0,
         offsetY: 0,
         zoomStep: 0.05,
         minZoom: 0.25,
         maxZoom: 4,
      });
   },
};
