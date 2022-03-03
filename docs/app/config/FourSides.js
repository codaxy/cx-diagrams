import { Md } from '../components/Md';

import node from './Node';

export default {
   ...node,
   gap: {
      type: 'number',
      key: true,
      description: (
         <cx>
            <Md>Inner distance between the elements.</Md>
         </cx>
      ),
   },
   slots: {
      type: 'array',
      key: true,
      description: (
         <cx>
            <Md>Order of slots. Default is `['center', 'right', 'down', 'left', 'up']`.</Md>
         </cx>
      ),
   },
};
