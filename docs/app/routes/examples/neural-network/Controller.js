import { uid } from 'uid';

export default {
   onInit() {
      this.store.init('$page.options', {
         inputs: 3,
         outputs: 1,
         hiddenLayers: 2,
         hiddenNodes: 5,
      });

      this.addComputable('$page.network', ['$page.options'], (options) => {
         let network = {
            layers: [],
            connections: [],
         };

         let inputLayer = {
            nodes: [],
            type: 'input',
         };

         for (let i = 1; i <= options.inputs; i++) {
            inputLayer.nodes.push({
               id: uid(),
               name: `I-${i}`,
            });
         }

         network.layers.push(inputLayer);

         for (let h = 1; h <= options.hiddenLayers; h++) {
            let hiddenLayer = {
               nodes: [],
               type: 'hidden',
            };
            for (let i = 1; i <= options.hiddenNodes; i++) {
               hiddenLayer.nodes.push({
                  id: uid(),
                  name: `H-${h}-${i}`,
               });
            }
            network.layers.push(hiddenLayer);
         }

         let outputLayer = {
            nodes: [],
            type: 'output',
         };

         for (let i = 1; i <= options.outputs; i++) {
            outputLayer.nodes.push({
               id: uid(),
               name: `O-${i}`,
            });
         }

         network.layers.push(outputLayer);

         for (let l = 1; l < network.layers.length; l++) {
            let l1 = network.layers[l - 1];
            let l2 = network.layers[l];

            for (let i = 0; i < l1.nodes.length; i++)
               for (let j = 0; j < l2.nodes.length; j++)
                  network.connections.push({
                     from: l1.nodes[i].id,
                     to: l2.nodes[j].id,
                  });
         }

         return network;
      });
   },
};
