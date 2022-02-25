import { ContentPlaceholder, ContentPlaceholderScope } from 'cx/ui';

export const Split = ({ children }) => (
   <cx>
      <ContentPlaceholderScope name="right">
         <div class="lg:grid grid-cols-2" style="grid-template-columns: 760px 1fr">
            <div class="bg-white">{children}</div>
            <div class="lg:border-l relative">
               <div class="lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:left-0 lg:overflow-auto">
                  <ContentPlaceholder name="right" />
               </div>
            </div>
         </div>
      </ContentPlaceholderScope>
   </cx>
);
