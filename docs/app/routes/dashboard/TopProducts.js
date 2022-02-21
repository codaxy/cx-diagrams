import { computable } from 'cx/ui';
import { Grid } from 'cx/widgets';

export const TopProducts = () => (
   <cx>
      <Grid
         records-bind="$page.topProducts"
         headerMode="plain"
         columns={[
            {
               field: 'name',
               header: { text: 'Product', class: 'pl-0' },
               class: '!pl-0',
               sortable: true,
            },
            {
               field: 'sales',
               header: 'Sales',
               format: 'currency;EUR;0',
               align: 'right',
               sortable: true,
            },
            {
               field: 'percent',
               header: 'Percentage',
               format: 'p;1',
               align: 'right',
               sortable: true,
            },
            {
               field: 'percent',
               header: '',
               children: (
                  <cx>
                     <div
                        class="bg-green-600 h-2"
                        style={{
                           width: computable('$record.percent', (percent) => percent * 400),
                        }}
                     />
                  </cx>
               ),
            },
         ]}
      />
   </cx>
);
