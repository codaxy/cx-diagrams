import { Md } from '../components/Md';

export default {
   ms: {
      type: 'number',
      description: (
         <cx>
            <Md>Start margin in the direction of the flow.</Md>
         </cx>
      ),
   },
   me: {
      type: 'number',
      description: (
         <cx>
            <Md>End margin in the direction of the flow.</Md>
         </cx>
      ),
   },
   margin: {
      type: 'number',
      alias: 'm',
      description: (
         <cx>
            <Md>Margin around the cell.</Md>
         </cx>
      ),
   },
   ml: {
      type: 'number',
      description: (
         <cx>
            <Md>Left margin.</Md>
         </cx>
      ),
   },
   mr: {
      type: 'number',
      description: (
         <cx>
            <Md>Right margin.</Md>
         </cx>
      ),
   },
   mt: {
      type: 'number',
      description: (
         <cx>
            <Md>Top margin.</Md>
         </cx>
      ),
   },
   mb: {
      type: 'number',
      description: (
         <cx>
            <Md>Bottom margin.</Md>
         </cx>
      ),
   },
   mx: {
      type: 'number',
      description: (
         <cx>
            <Md>Horizontal margin.</Md>
         </cx>
      ),
   },
   my: {
      type: 'number',
      description: (
         <cx>
            <Md>Vertical margin.</Md>
         </cx>
      ),
   },
};
