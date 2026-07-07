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

   zoomStep: {
      type: 'number',
      description: (
         <cx>
            <Md>Zoom factor applied on each wheel step. Default value is 0.05.</Md>
         </cx>
      ),
   },

   minZoom: {
      type: 'number',
      description: (
         <cx>
            <Md>Minimum allowed zoom level. Default value is 0.25.</Md>
         </cx>
      ),
   },

   maxZoom: {
      type: 'number',
      description: (
         <cx>
            <Md>Maximum allowed zoom level. Default value is 4.</Md>
         </cx>
      ),
   },
};
