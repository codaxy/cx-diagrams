import { Url } from 'cx/ui';
import { Icon, Link } from 'cx/widgets';
import '../../icons/user';
import '../../icons/logout';

const SideLink = ({ children, text, href, onClick, icon }) => (
   <cx>
      <Link
         url-bind="url"
         href={href}
         text={text}
         class="p-4 flex items-center border-t border-b border-transparent"
         activeClass="bg-white border-gray-300"
         onClick={onClick}
      >
         <Icon name={icon} class="ml-2 mr-4 w-5 h-5" />
         {children}
      </Link>
   </cx>
);

export const Layout = ({ children }) => (
   <cx>
      <main class="mt-16 grid" style="grid-template-columns: auto 1fr; min-height: calc(100vh - 4rem)">
         <div class="w-64 bg-gray-200 border-r border-gray-300">
            <div class="pt-2 sticky top-16 text-gray-700">
               <SideLink href="~/user/profile" icon="user">
                  Profil
               </SideLink>
               <SideLink
                  icon="logout"
                  href="~/signout"
                  onClick={(e) => {
                     window.location = Url.resolve('~/signout');
                     return false;
                  }}
               >
                  Odjava
               </SideLink>
            </div>
         </div>
         {children}
      </main>
   </cx>
);
