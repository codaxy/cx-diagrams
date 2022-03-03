import { Md } from '../components/Md';

import node from './Node';

export default {
   ...node,
   width: {
      type: 'number',
      key: true,
      alias: 'w',
      description: (
         <cx>
            <Md>Width of the cell. Default value is 1.</Md>
         </cx>
      ),
   },
   height: {
      type: 'number',
      key: true,
      alias: 'h',
      description: (
         <cx>
            <Md>Height of the cell. Default value is 1.</Md>
         </cx>
      ),
   },
};
