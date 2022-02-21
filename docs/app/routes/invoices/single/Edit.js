import { computable, LabelsTopLayout } from 'cx/ui';
import { Button, DateField, Grid, Label, LinkButton, LookupField, NumberField, ValidationGroup } from 'cx/widgets';
import { GET } from '../../../api/util/methods';

export default () => (
   <cx>
      <ValidationGroup invalid-bind="$page.invalid">
         <div class="p-10">
            <div class="flex-row pad2">
               <div class="pb-4">
                  <div
                     text={computable('$page.invoice.invoiceNo', (no) =>
                        no == null ? 'New Invoice' : `Invoice #${no}`
                     )}
                     class="font-semibold text-3xl mb-4"
                  />
                  <LabelsTopLayout columns={3}>
                     <DateField value-bind="$page.invoice.date" label="Issue Date" required />
                     <DateField value-bind="$page.invoice.dueDate" label="Due Date" required />
                     <LookupField
                        value-bind="$page.invoice.status"
                        label="Status"
                        options={[
                           { id: 'unpaid', text: 'Unpaid' },
                           { id: 'paid', text: 'Paid' },
                        ]}
                        required
                     />
                     <LookupField
                        value-bind="$page.invoice.customer.id"
                        text-bind="$page.invoice.customer.name"
                        optionTextField="name"
                        label="Customer"
                        required
                        onQuery={(q) => GET('customers?query=' + encodeURIComponent(q))}
                     />
                  </LabelsTopLayout>
               </div>
            </div>

            <Label>Items</Label>

            <Grid
               records-bind="$page.invoice.items"
               lockColumnWidths
               columns={[
                  {
                     header: { text: 'Product', style: 'padding-left: 0' },
                     field: 'productName',
                     pad: false,
                     items: (
                        <cx>
                           <LookupField
                              value-bind="$record.productId"
                              text-bind="$record.productName"
                              style="width:100%;"
                              onQuery="onQueryProducts"
                              required
                              optionTextField="name"
                              autoFocus-expr="!{$record.productId} && !{$record.qty}"
                              autoOpen
                              bindings={[
                                 { local: '$record.productId', remote: '$option.id', key: true },
                                 { local: '$record.productName', remote: '$option.name' },
                                 { local: '$record.unitPrice', remote: '$option.unitPrice' },
                                 { local: '$record.taxPct', remote: '$option.taxPct' },
                              ]}
                           />
                        </cx>
                     ),
                     width: 200,
                  },
                  {
                     header: { text: 'Qty', class: '!pr-1' },
                     field: 'qty',
                     align: 'right',
                     pad: false,
                     class: '!pl-1',
                     items: (
                        <cx>
                           <NumberField
                              value-bind="$record.qty"
                              style="width:100%"
                              inputStyle="text-align: right"
                              required
                           />
                        </cx>
                     ),
                     width: 70,
                  },
                  {
                     header: { text: 'Discount', class: '!pr-1' },
                     field: 'discountPct',
                     align: 'right',
                     pad: false,
                     class: '!pl-1',
                     items: (
                        <cx>
                           <NumberField
                              value-bind="$record.discountPct"
                              style="width:100%"
                              inputStyle="text-align: right"
                              format="ps"
                              maxValue={100}
                           />
                        </cx>
                     ),
                     width: 70,
                  },
                  { header: 'Unit Price', field: 'unitPrice', align: 'right', format: 'currency;;2' },
                  { header: 'Regular', field: 'regularAmount', align: 'right', format: 'currency;;2' },
                  { header: 'Discount', field: 'discountAmount', align: 'right', format: 'currency;;2' },
                  { header: 'Total', field: 'totalAmount', align: 'right', format: 'currency;;2' },
                  {
                     align: 'right',
                     pad: false,
                     class: '!py-1',
                     items: (
                        <cx>
                           <Button onClick="onRemoveItem" mod="hollow" icon="x" />
                        </cx>
                     ),
                  },
               ]}
            />

            <div class="grid grid-cols-2 border-t">
               <div>
                  <Button
                     style="margin: 6px 0 12px 4px;"
                     text="Add Item"
                     onClick="onAddItem"
                     icon="plus"
                     mod="hollow"
                  />
               </div>

               <div class="ml-auto mt-8 mr-[74px] grid grid-cols-2 text-right text-sm">
                  <div class="text-gray-500 px-3 py-1">Regular Price:</div>
                  <div class="px-3 py-1" text-tpl="{$page.invoice.regularAmount:currency;;2}" />
                  <div class="text-gray-500 p-3">Discount:</div>
                  <div class="p-3" text-tpl="{$page.invoice.discountAmount:currency;;2}" />
                  <div class="text-gray-500 p-3 border-t border-gray-500">Total:</div>
                  <div
                     class="p-3 border-t border-gray-500 font-bold"
                     text-tpl="{$page.invoice.totalAmount:currency;;2}"
                  />
               </div>
            </div>
            <div class="mt-8 border-t pt-8 space-x-2">
               <Button
                  onClick="onSave"
                  disabled-expr="{$page.saving} || {$page.invalid}"
                  icon-expr="{$page.saving} && 'loading'"
                  mod="primary"
               >
                  Save
               </Button>
               <LinkButton mod="hollow" href="~/invoices">
                  Cancel
               </LinkButton>
            </div>
         </div>
      </ValidationGroup>
   </cx>
);
