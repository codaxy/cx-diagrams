import { Md } from '../components/Md';

export default {
   position: {
      type: 'string',
      key: true,
      description: (
         <cx>
            <Md>Available positions are `start`, `middle` and `end`.</Md>
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
};
