import { bind, expr } from 'cx/ui';
import {
   Button,
   Grid,
   HighlightedSearchText,
   Link,
   LinkButton,
   LookupField,
   Pagination,
   TextField,
   DateField,
} from 'cx/widgets';
import Controller from './Controller';

export default (
   <cx>
      <main class="overflow-hidden flex flex-col text-gray-600" controller={Controller}>
         <div class="p-2 space-x-1 flex">
            <TextField
               placeholder="Search invoices..."
               value={{
                  bind: '$page.filter.query',
                  debounce: 300,
               }}
               icon="search"
            />
            <LookupField
               placeholder="Status"
               value={{
                  bind: '$page.filter.status',
               }}
               class="w-32"
               options={[
                  {
                     id: 'paid',
                     text: 'Paid',
                  },
                  {
                     id: 'unpaid',
                     text: 'Unpaid',
                  },
               ]}
            />
            <div class="flex-grow" />
            <LinkButton href="~/invoices/new" text="New Invoice" mod="primary" />
            <Button icon-expr="{$page.loading} ? 'loading' : 'refresh'" onClick="onLoad" mod="hollow">
               Refresh
            </Button>
         </div>
         <Grid
            records-bind="$page.records"
            class="flex-grow "
            scrollable
            border={false}
            remoteSort
            lockColumnWidths
            sortField-bind="$page.filter.sortField"
            sortDirection-bind="$page.filter.sortDir"
            mod="fixed-layout"
            columns={[
               {
                  field: 'invoiceNo',
                  sortable: true,
                  align: 'center',
                  items: (
                     <cx>
                        <Link
                           href-tpl="~/invoices/{$record.id}"
                           text-tpl="{$record.invoiceNo}"
                           class="text-blue-500 hover:underline"
                        />
                     </cx>
                  ),
                  header: { text: 'Order No.', style: 'border-left: none' },
                  resizable: true,
                  defaultWidth: 110,
               },
               {
                  field: 'date',
                  format: 'd',
                  sortable: true,
                  align: 'center',
                  header: 'Date',
                  resizable: true,
                  defaultWidth: 120,
               },
               {
                  field: 'customer.name',
                  value: bind('$record.customer.name'),
                  sortable: true,
                  header: 'Customer',
                  resizable: true,
                  defaultWidth: 300,
                  items: (
                     <cx>
                        <HighlightedSearchText text-bind="$record.customer.name" query-bind="$page.filter.query" />
                     </cx>
                  ),
               },
               {
                  field: 'dueDate',
                  format: 'd',
                  sortable: true,
                  align: 'center',
                  header: 'Due Date',
                  resizable: true,
                  defaultWidth: 120,
               },
               {
                  header: 'Amount',
                  field: 'totalAmount',
                  format: 'currency;;2',
                  align: 'right',
                  sortable: true,
                  resizable: true,
                  defaultWidth: 120,
               },
               {
                  header: 'Status',
                  field: 'status',
                  sortable: true,
                  resizable: true,
                  defaultWidth: 120,
                  items: (
                     <cx>
                        <span
                           text-bind="$record.status"
                           class="px-3 py-1 uppercase text-[11px] rounded-full"
                           className={{
                              'bg-gray-100': expr("{$record.status} == 'paid'"),
                              'bg-yellow-300': expr("{$record.status} == 'unpaid'"),
                           }}
                        />
                     </cx>
                  ),
               },
            ]}
         />
         <div class="border-t p-2 flex  ">
            <Pagination page-bind="$page.page" pageCount-bind="$page.pageCount" />
            <LookupField
               value-bind="$page.pageSize"
               class="ml-2 w-[180px]"
               required
               options={[
                  {
                     id: 5,
                     text: '5 rows per page',
                  },
                  {
                     id: 10,
                     text: '10 rows per page',
                  },
                  {
                     id: 20,
                     text: '20 rows per page',
                  },
                  {
                     id: 50,
                     text: '50 rows per page',
                  },
               ]}
            />
         </div>
      </main>
   </cx>
);
