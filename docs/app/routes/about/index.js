import CxJSLogo from '../../../assets/img/cxjs.svg';
import HeroiconsLogo from '../../../assets/img/heroicons.svg';
import TailwindLogo from '../../../assets/img/tailwindcss-logotype.svg';

export default (
   <cx>
      <div class="bg-gray-50 overflow-auto">
         <div class=" w-[1000px] mx-auto my-16 text-gray-700 bg-white px-20 py-16 border rounded relative">
            <a href="https://github.com/codaxy/cxjs-tailwindcss-template">
               <img
                  loading="lazy"
                  width="149"
                  height="149"
                  src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
                  class="absolute right-0 top-0"
                  alt="Fork me on GitHub"
                  data-recalc-dims="1"
               />
            </a>
            <h1 class="text-5xl font-bold">CxJS + Tailwind CSS </h1>
            <p class="mt-2 text-gray-400 text-lg">Use CxJS, Tailwind CSS, and Heroicons for success!</p>

            <p class="mt-12 text-lg text-gray-700">
               CxJS and Tailwind CSS mix really well together. CxJS brings JavaScript based application elements such as
               widgets, charts, state management, and routing, while Tailwind CSS offers a way to rapidly combine these
               elements into higher-order visual structures - toolbars, sections, layouts, pages, etc.
            </p>

            <div class="flex flex-wrap items-center gap-4 justify-center mt-16">
               <a href="https://cxjs.io">
                  <img src={CxJSLogo} class="h-24" />
               </a>
               <a href="https://tailwindcss.com">
                  <img src={TailwindLogo} class="h-12" />
               </a>
               <a href="https://heroicons.com">
                  <img src={HeroiconsLogo} class="h-[220px]" />
               </a>
            </div>

            <p class="mb-1">Inspiration</p>
            <ul class="list-inside list-disc">
               <li ws>
                  <a
                     href="https://dribbble.com/shots/6695550-Sales-Dashboard-App"
                     class="text-blue-500 hover:underline"
                  >
                     Sales Dashboard App
                  </a>
                  <span>- Dribble by</span>
                  <a class="text-blue-500 hover:underline" href="https://dribbble.com/vallendito">
                     Barly Vallendito
                  </a>
               </li>
               <li ws>
                  <a
                     href="https://dribbble.com/shots/14722533-QuickPay-Invoicing"
                     class="text-blue-500 hover:underline"
                  >
                     QuickPay Invoicing
                  </a>
                  <span>- Dribble by</span>
                  <a class="text-blue-500 hover:underline" href="https://dribbble.com/vlockn">
                     Vishnu Prasad
                  </a>
               </li>
            </ul>
         </div>
      </div>
   </cx>
);
