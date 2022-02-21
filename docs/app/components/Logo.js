import { Icon, Link } from 'cx/widgets';
import '../icons/index';

export const Logo = ({ className }) => (
   <cx>
      <Link href="~/" class="flex items-center" className={className}>
         <div class="p-2 rounded-full bg-red-600 text-white">
            <Icon name="chart-bar" class="w-8 h-8" />
         </div>
         <div class="ml-4 text-lg font-bold italic text-black">Demo App</div>
      </Link>
   </cx>
);
