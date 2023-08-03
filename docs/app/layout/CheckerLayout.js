import { Icon, Link } from 'cx/widgets';
import { GitHubStarCount } from '../components/GitHubStarCount';
import { Logo2 } from '../components/Logo2';
import Controller from './Controller';

const NavItem = ({ text, href, tooltip, onClick, className, icon, badge, expanded }) => (
   <cx>
      <Link
         href={href}
         url-bind="url"
         class="hover:bg-gray-100 flex items-center px-3 py-3 text-gray-800 relative font-semibold whitespace-nowrap text-opacity-70 text-[15px] border-l-[3px] border-transparent cursor-pointer"
         className={className}
         activeClass="!bg-blue-100 !border-blue-500 !text-blue-500 !opacity-100"
         tooltip={tooltip}
         onClick={onClick}
         match="subroute"
      >
         <Icon name={icon} class="w-7 h-7 ml-3 mr-3 opacity-70" />
         <div text={text} class="flex-grow" />
         <div text={badge} visible={badge} class="text-xs bg-black bg-opacity-20 rounded-full px-3 py-1" />
         <Icon
            name="drop-down"
            class="w-5 h-5 mr-2 transform transition-all opacity-80"
            visible={!!expanded}
            className={{
               'rotate-180': expanded,
            }}
         />
      </Link>
   </cx>
);

export const CheckerLayout = ({ children, nav }) => (
   <cx>
      <div class="h-full grid grid-cols-1 xl:grid-cols-[250px_1fr] xl:grid-rows-[auto_1fr]" controller={Controller}>
         <div class="xl:border-r border-b py-2 pl-6 flex col-span-2 items-center">
            <Logo2 />

            <a
               target="_blank"
               rel="noopener noreferrer"
               href="https://www.npmjs.com/package/cx-diagrams"
               class="ml-auto hidden xl:block"
            >
               <img src="https://img.shields.io/npm/v/cx-diagrams" alt="version" />
            </a>

            <button
               class="ml-auto mr-4 flex xl:hidden items-center justify-center w-10 h-10 bg-gray-200 hover:bg-blue-200 active:bg-blue-300 rounded-full"
               onClick="onToggleNav"
            >
               <Icon name="menu" />
            </button>

            <GitHubStarCount className="hidden ml-4 mr-4 xl:block" />
         </div>
         <div
            class="bg-white xl:border-r pt-3 hidden xl:block overflow-auto"
            className={{
               'fixed top-14 left-0 right-0 bottom-0 !block z-[1000] border-t': { expr: '!!{showNav}' },
            }}
         >
            <NavItem text="About" icon="information-circle" href="~/" />

            <div class="px-6 py-3 text-gray-400 text-sm">Components</div>
            <NavItem text="Diagram" icon="cog" href="~/components/diagram" />
            <NavItem text="Cell" icon="cog" href="~/components/cell" />
            <NavItem text="Shape" icon="cog" href="~/components/shape" />
            <NavItem text="Flow" icon="cog" href="~/components/flow" />
            <NavItem text="Rotate" icon="cog" href="~/components/rotate" />
            <NavItem text="FourSides" icon="cog" href="~/components/four-sides" />
            <NavItem text="ArrowHead" icon="cog" href="~/components/arrow-head" />

            <div class="mt-4 px-6 py-3 text-gray-400 text-sm">Lines</div>
            <NavItem text="StraightLine" icon="cog" href="~/components/straight-line" />
            <NavItem text="TwoSegmentLine" icon="cog" href="~/components/two-segment-line" />
            <NavItem text="ThreeSegmentLine" icon="cog" href="~/components/three-segment-line" />

            <div class="mt-4 px-6 py-3 text-gray-400 text-sm">Examples</div>
            <NavItem text="Network Diagram" icon="cog" href="~/examples/network-diagram" />
            <NavItem text="Neural Network" icon="cog" href="~/examples/neural-network" />
         </div>
         {children}
      </div>
   </cx>
);
