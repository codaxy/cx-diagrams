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

   center: {
      type: 'boolean',
      key: true,
      description: (
         <cx>
            <Md>Set to `true` to center the content both horizontally and vertically.</Md>
         </cx>
      ),
   },

   centerX: {
      type: 'boolean',
      description: (
         <cx>
            <Md>Set to `true` to center the content horizontally.</Md>
         </cx>
      ),
   },

   centerY: {
      type: 'boolean',
      description: (
         <cx>
            <Md>Set to `true` to center the content vertically.</Md>
         </cx>
      ),
   },

   fixed: {
      type: 'boolean',
      description: (
         <cx>
            <Md>Set to `true` to disable zooming and panning.</Md>
         </cx>
      ),
   },
};
