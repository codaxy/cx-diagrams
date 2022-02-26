import { Md } from '../components/Md';

import bounds from './BoundedObject';

export default {
   ...bounds,
   zoom: {
      type: 'number',
      key: true,
      description: (
         <cx>
            <Md>Current zoom level. Default value is 1.</Md>
         </cx>
      ),
   },
   offsetX: {
      type: 'number',
      key: true,
      description: (
         <cx>
            <Md>Horizontal offset (pan).</Md>
         </cx>
      ),
   },
   offsetY: {
      type: 'number',
      key: true,
      description: (
         <cx>
            <Md>Vertical offset (pan).</Md>
         </cx>
      ),
   },
};
