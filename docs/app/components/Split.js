import { ContentPlaceholder, ContentPlaceholderScope } from 'cx/ui';

export const Split = ({ children }) => (
   <cx>
      <ContentPlaceholderScope name="right">
         <div class="xl:grid grid-cols-[640px_1fr] 2xl:grid-cols-[768px_1fr]">
            <div class="bg-white">{children}</div>
            <div class="xl:border-l relative">
               <div class="xl:absolute xl:top-0 xl:right-0 xl:bottom-0 xl:left-0 xl:overflow-auto">
                  <ContentPlaceholder name="right" />
               </div>
            </div>
         </div>
      </ContentPlaceholderScope>
   </cx>
);
