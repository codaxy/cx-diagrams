import { Md } from '../components/Md';
import classAndStyle from './classAndStyle';

export default {
   ...classAndStyle,
   shape: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Available shapes are `triangle`, `line` and `vback`.</Md>
         </cx>
      ),
   },
   position: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Available positions are `start`, `middle` and `end`. Default is `end`.</Md>
         </cx>
      ),
   },
   size: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Size of the arrow head.</Md>
         </cx>
      ),
   },
   fill: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Fill color of the arrow head.</Md>
         </cx>
      ),
   },
   stroke: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Stroke color of the arrow head.</Md>
         </cx>
      ),
   },
   aspectRatio: {
      type: 'number',
      key: true,
      description: (
         <cx>
            <Md>Aspect ratio of the arrow shape. Default is 1.</Md>
         </cx>
      ),
   },
   reverse: {
      type: 'boolean',
      key: true,
      description: (
         <cx>
            <Md>Use reverse (to-to-from) direction.</Md>
         </cx>
      ),
   },
};
