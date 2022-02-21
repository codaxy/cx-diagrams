import { computable } from 'cx/ui';
import { Grid } from 'cx/widgets';
import { Logo2 } from '../../../components/Logo2';
import { PrintFrame } from '../../../components/PrintFrame';

const Label = ({ children }) => (
   <cx>
      <div class="text-gray-400 py-1 pr-4">{children}</div>
   </cx>
);

export default () => (
   <cx>
      <PrintFrame class="h-[1000px]" autoPrint>
         <div class="p-10">
            <div class="grid grid-cols-2">
               <div>
                  <div
                     text={computable('$page.invoice.invoiceNo', (no) =>
                        no == null ? 'New Invoice' : `Invoice #${no}`
                     )}
                     class="font-semibold text-3xl mb-4"
                  />
                  <div class="flex mt-8">
                     <div class="grid grid-cols-2">
                        <div class="text-gray-400 py-1 pr-4">Issued On</div>
                        <div class="text-gray-400 py-1 pr-4">Due Date</div>
                        <div class="pr-8 text-black" text-tpl="{$page.invoice.date:datetime;yyyyMMMdd}" />
                        <div class="pr-8 text-black" text-tpl="{$page.invoice.dueDate:datetime;yyyyMMMdd}" />
                     </div>
                  </div>
               </div>
               <div class="flex flex-col items-end">
                  <Logo2 />
                  <div class="mt-2 text-gray-400 text-base text-right">
                     <div>Demo App Company Name</div>
                     <div>Address Line 1</div>
                     <div>Address Line 2</div>
                  </div>
               </div>
            </div>

            <div class="mt-8" />
            <Label>Customer</Label>
            <div class="text-black" text-bind="$page.invoice.customer.name" />
            <div class="mt-1 text-sm text-gray-400" text-bind="$page.invoice.customer.address" />
            <div class="mt-1 text-sm text-gray-400" text="City, Country" />

            <div class="mt-8" />
            <Label>Items</Label>
            <Grid
               records-bind="$page.invoice.items"
               class="text-black"
               columns={[
                  {
                     header: { text: 'Product', class: '!pl-0' },
                     field: 'productName',
                     class: '!pl-0',
                  },
                  {
                     header: 'Qty',
                     field: 'qty',
                     align: 'right',
                  },
                  {
                     header: 'Discount',
                     field: 'discountPct',
                     align: 'right',
                     format: 'p',
                  },
                  { header: 'Unit Price', field: 'unitPrice', align: 'right', format: 'currency;;2' },
                  { header: 'Regular', field: 'regularAmount', align: 'right', format: 'currency;;2' },
                  { header: 'Discount', field: 'discountAmount', align: 'right', format: 'currency;;2' },
                  {
                     header: { text: 'Total', class: '!pr-3' },
                     field: 'totalAmount',
                     align: 'right',
                     format: 'currency;;2',
                     class: '!pr-3',
                  },
               ]}
            />

            <div class="mt-8 flex flex-col items-end">
               <Label>Total</Label>
               <div class="mt-4 grid grid-cols-2 text-right text-sm">
                  <div class="text-gray-500 px-3 py-1">Regular Price:</div>
                  <div class="px-3 py-1 text-black" text-tpl="{$page.invoice.regularAmount:currency;;2}" />
                  <div class="text-gray-500 p-3">Discount:</div>
                  <div class="p-3 text-black" text-tpl="{$page.invoice.discountAmount:currency;;2}" />
                  <div class="text-gray-500 p-3 border-t border-gray-500">Total:</div>
                  <div
                     class="p-3 border-t border-gray-500 font-bold text-black"
                     text-tpl="{$page.invoice.totalAmount:currency;;2}"
                  />
               </div>
            </div>
         </div>
      </PrintFrame>
   </cx>
);
