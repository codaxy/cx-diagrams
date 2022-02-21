import { Svg } from 'cx/svg';
import { CategoryAxis, Chart, Gridlines, Legend, LineGraph, Marker, NumericAxis } from 'cx/charts';
import { Repeater } from 'cx/widgets';
import '../../util/kformat';
import { bind, tpl } from 'cx/ui';

export const Charts = ({}) => (
   <cx>
      <div class="bg-white border col-span-4 px-6 py-4 rounded">
         <div class="flex items-center">
            <div class="mr-auto text-gray-600">Performance Chart</div>
            <Legend />
         </div>
         <Svg class="w-full h-[350px] text-gray-500">
            <Chart
               margin="30 10 30 45"
               axes={{
                  x: { type: CategoryAxis, hideLine: true, hideTicks: true },
                  y: {
                     type: NumericAxis,
                     vertical: true,
                     tickSize: 0,
                     minTickDistance: 30,
                     hideLine: true,
                     format: 'kformat',
                  },
               }}
            >
               <Gridlines xAxis={false} />
               <LineGraph
                  data-bind="$page.chart"
                  xField="month"
                  yField="sales"
                  class="text-green-500 stroke-current"
                  colorIndex={4}
                  active-bind="$page.charts.sales"
                  legend={false}
               />
               <LineGraph
                  data-bind="$page.chart"
                  colorIndex={1}
                  xField="month"
                  yField="expenses"
                  name="Expenses"
                  active-bind="$page.charts.expenses"
                  legend={false}
               />
               <LineGraph
                  data-bind="$page.chart"
                  colorIndex={8}
                  xField="month"
                  yField="balance"
                  active-bind="$page.charts.cash"
                  legend={false}
               />
               <Repeater records-bind="$page.chart">
                  <Marker
                     name="Sales"
                     x-bind="$record.month"
                     y-bind="$record.sales"
                     shape="circle"
                     size={12}
                     colorIndex={4}
                     style="stroke-width: 2; fill: white"
                     active-bind="$page.charts.sales"
                     class="cursor-pointer"
                     tooltip={{
                        title: tpl('Sales in {$record.month}'),
                        text: tpl('{$record.sales:n;0} EUR'),
                     }}
                  />
                  <Marker
                     name="Expenses"
                     x-bind="$record.month"
                     y-bind="$record.expenses"
                     shape="circle"
                     size={12}
                     colorIndex={1}
                     style="stroke-width: 2; fill: white;"
                     active-bind="$page.charts.expenses"
                     class="cursor-pointer"
                     tooltip={{
                        title: tpl('Expenses in {$record.month}'),
                        text: tpl('{$record.expenses:n;0} EUR'),
                     }}
                  />

                  <Marker
                     name="Cash"
                     x-bind="$record.month"
                     y-bind="$record.balance"
                     shape="circle"
                     size={12}
                     colorIndex={8}
                     style="stroke-width: 2; fill: white"
                     active-bind="$page.charts.cash"
                     class="cursor-pointer"
                     tooltip={{
                        title: tpl('Cash Balance in {$record.month}'),
                        text: tpl('{$record.balance:n;0} EUR'),
                     }}
                  />
               </Repeater>
            </Chart>
         </Svg>
      </div>
   </cx>
);
