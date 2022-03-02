import { Icon, Link } from 'cx/widgets';
import '../icons/index';

export const Logo = ({ className }) => (
   <cx>
      <Link href="~/" class="flex items-center" className={className}>
         <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#a)">
               <path d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2s14 6.268 14 14Z" fill="#5EECFC" />
               <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.734 7.734c.244 0 .442.2.433.443-.328 8.528-6.753 15.504-15.072 16.755a.429.429 0 0 1-.492-.425V10.783c0-1.684 1.375-3.049 3.071-3.049h12.06Z"
                  fill="#F96E46"
               />
               <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.125 15.107c.18 0 .326.143.319.316-.242 6.091-4.976 11.075-11.106 11.968a.313.313 0 0 1-.363-.304v-9.802c0-1.203 1.014-2.178 2.263-2.178h8.887Z"
                  fill="#B118C8"
               />
            </g>
            <defs>
               <clipPath id="a">
                  <path fill="#fff" d="M0 0h32v32H0z" />
               </clipPath>
            </defs>
         </svg>
         <div class="ml-4 text-lg font-bold italic text-black">CxJS Diagrams</div>
      </Link>
   </cx>
);
