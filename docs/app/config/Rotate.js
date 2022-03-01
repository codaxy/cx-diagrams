import { Md } from '../components/Md';

import node from './Node';

export default {
   ...node,
   turns: {
      type: 'number',
      key: true,
      description: (
         <cx>
            <Md>Number of rotation turns. One turn equals 90 degrees.</Md>
         </cx>
      ),
   },
};
