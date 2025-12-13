import { createFunctionalComponent } from 'cx/ui';

export const Pad = createFunctionalComponent(({ children, className }) => (
   <cx>
      <div class="px-6 py-4" className={className}>
         {children}
      </div>
   </cx>
));
