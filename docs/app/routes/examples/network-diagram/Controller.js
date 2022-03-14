import { uid } from 'uid';

export default {
   onInit() {
      this.store.init('$page.networks', [
         this.generateNetwork(),
         this.generateNetwork(),
         this.generateNetwork(),
         this.generateNetwork(),
      ]);
   },

   generateNetwork() {
      let connections = [];
      let firewalls = [],
         switches = [],
         pcs = [];

      let fw1 = {
         id: uid(),
         name: 'FW1',
      };

      let fw2 = {
         id: uid(),
         name: 'FW2',
      };

      let sw1 = {
         id: uid(),
         name: 'SW1',
      };

      let sw2 = {
         id: uid(),
         name: 'SW2',
      };

      firewalls.push(fw1, fw2);
      switches.push(sw1, sw2);

      connections.push({ from: fw1.id, to: fw2.id });
      connections.push({ from: fw1.id, to: sw1.id });
      connections.push({ from: fw2.id, to: sw2.id });
      connections.push({ from: sw1.id, to: sw2.id });

      for (let i = 1; i <= 3; i++) {
         let pc = {
            id: uid(),
            name: `PC${i}`,
         };
         pcs.push(pc);
         connections.push({ from: pc.id, to: sw1.id });
      }

      for (let i = 4; i <= 6; i++) {
         let pc = {
            id: uid(),
            name: `PC${i}`,
         };
         pcs.push(pc);
         connections.push({ from: pc.id, to: sw2.id });
      }

      return {
         firewalls,
         switches,
         pcs,
         connections,
      };
   },
};
