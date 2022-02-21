import { Icon, Link } from 'cx/widgets';
import Controller from './Controller';
import Edit from './Edit';
import Print from './Print';

export default (
   <cx>
      <main class="bg-gray-50" controller={Controller}>
         <div class="m-10 bg-white border rounded w-[900px] text-gray-600 relative">
            <Link
               href="~/invoices"
               class="absolute w-10 h-10 border rounded-full top-[-20px] left-4 bg-white flex justify-center items-center z-10"
            >
               <Icon name="arrow-left" />
            </Link>
            <div
               class="absolute w-10 h-10 border rounded-full top-[-20px] left-16 bg-white flex justify-center items-center cursor-pointer z-10"
               onClick={(e, { store }) => {
                  store.toggle('$page.printMode');
               }}
            >
               <Icon name-expr="{$page.printMode} ? 'pencil' : 'printer'" />
            </div>
            <Edit visible-expr="!{$page.printMode}" />
            <Print visible-expr="!!{$page.printMode}" />
         </div>
      </main>
   </cx>
);
