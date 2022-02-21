import { rest } from 'msw';
import { getComparer } from 'cx/data';
import { getRandomCustomer } from './customers';
import { getRandomProduct } from './products';
import { getSearchQueryPredicate } from 'cx/util';

let lastId = 0;

const invoices = Array.from({ length: 2000 }, (_, index) => {
   const items = Array.from({ length: 1 + Math.random() * 4 }, (_, index) => {
      let product = getRandomProduct();
      let qty = Math.ceil(Math.random() * 10);
      return {
         id: index + 1,
         productId: product.id,
         productName: product.name,
         unitPrice: product.unitPrice,
         qty,
         discountPct: 0,
         regularAmount: qty * product.unitPrice,
         discountAmount: 0,
         totalAmount: qty * product.unitPrice,
      };
   });

   const date = Date.now() - Math.random() * 90 * 86400 * 1000;
   const dueDate = date + 14 * 86400 * 1000;

   const totalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);

   return {
      id: ++lastId,
      invoiceNo: 10000 + lastId,
      customer: getRandomCustomer(),
      status: Math.random() > 0.1 ? 'paid' : 'unpaid',
      items,
      date,
      dueDate,
      regularAmount: totalAmount,
      discountAmount: 0,
      totalAmount,
   };
});

export const invoiceEndpoints = [
   rest.get('/api/invoices', (req, res, ctx) => {
      let page = req.url.searchParams.get('page') || 1;
      let pageSize = req.url.searchParams.get('pageSize') || 10;
      let sortField = req.url.searchParams.get('sortField');
      let sortDir = req.url.searchParams.get('sortDir') || 'asc';
      let query = req.url.searchParams.get('query');
      let status = req.url.searchParams.get('status');

      let results = [...invoices];

      if (query) {
         const predicate = getSearchQueryPredicate(query);
         results = results.filter((x) => predicate(x.customer.name) || x.invoiceNo == query);
      }

      if (status) results = results.filter((x) => x.status == status);

      if (sortField) {
         var compare = getComparer([{ value: { bind: sortField }, direction: sortDir }]);
         results.sort(compare); //simulate database sort
      }
      
      results = results.slice((page - 1) * pageSize, page * pageSize);

      return res(ctx.json(results));
   }),

   rest.get('/api/invoices/:id', (req, res, ctx) => {
      let { id } = req.params;

      let invoice = invoices.find((i) => i.id == id);

      return res(ctx.json(invoice));
   }),

   rest.put('/api/invoices/:id', (req, res, ctx) => {
      let { id } = req.params;

      let invoice = invoices.find((i) => i.id == id);

      Object.assign(invoice, req.body);

      return res(ctx.json(invoice));
   }),

   rest.post('/api/invoices', (req, res, ctx) => {
      let invoice = {
         ...req.body,
         id: ++lastId,
         invoiceNo: 10000 + lastId,
      };

      invoices.push(invoice);

      return res(ctx.json(invoice));
   }),
];
