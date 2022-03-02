import { Md } from '../components/Md';

import bounds from './BoundedObject';
import container from './Container';
import classAndStyle from './classAndStyle';

export default {
   ...bounds,
   ...container,
   ...classAndStyle,

   from: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Id of the first (start) shape.</Md>
         </cx>
      ),
   },

   to: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Id of the second (end) shape.</Md>
         </cx>
      ),
   },

   stroke: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Color of the line.</Md>
         </cx>
      ),
   },
   strokeWidth: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Line thickness.</Md>
         </cx>
      ),
   },
};
