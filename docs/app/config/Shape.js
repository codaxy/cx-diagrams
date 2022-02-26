import { Md } from '../components/Md';

import bounds from './BoundedObject';
import container from './Container';
import classAndStyle from './classAndStyle';

export default {
   ...bounds,
   ...container,
   ...classAndStyle,
   text: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Inner text.</Md>
         </cx>
      ),
   },
   shape: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Either `rect` or `circle`.</Md>
         </cx>
      ),
   },
   tooltip: {
      type: 'string/object',
      key: false,
      description: (
         <cx>
            <Md>Tooltip configuration.</Md>
         </cx>
      ),
   },
   stroke: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Color of shape borders.</Md>
         </cx>
      ),
   },
   strokeWidth: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Border thickness.</Md>
         </cx>
      ),
   },
   fill: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Color of shape fill.</Md>
         </cx>
      ),
   },
   shapeClass: {
      type: 'string/object',
      key: true,
      description: (
         <cx>
            <Md>CSS class to be applied to the shape.</Md>
         </cx>
      ),
   },
   shapeStyle: {
      type: 'string/object',
      key: true,
      description: (
         <cx>
            <Md>CSS style to be applied to the shape.</Md>
         </cx>
      ),
   },
   shapeClass: {
      type: 'string/object',
      key: true,
      description: (
         <cx>
            <Md>CSS class to be applied to the shape.</Md>
         </cx>
      ),
   },
   textClass: {
      type: 'string/object',
      key: true,
      description: (
         <cx>
            <Md>CSS class to be applied to the inner text.</Md>
         </cx>
      ),
   },
   textStyle: {
      type: 'string/object',
      key: true,
      description: (
         <cx>
            <Md>CSS style to be applied to the inner text.</Md>
         </cx>
      ),
   },
};
