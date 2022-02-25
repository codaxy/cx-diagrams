import { Md } from '../components/Md';

import bounds from './BoundedObject';

export default {
   ...bounds,
   disabled: {
      type: 'boolean',
      key: true,
      description: (
         <cx>
            <Md>Set to `true` to disable the button.</Md>
         </cx>
      ),
   },
};
