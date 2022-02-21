import { append, updateArray } from 'cx/data';
import { Controller, History } from 'cx/ui';
import { MsgBox } from 'cx/widgets';
import { GET, POST, PUT } from '../../../api/util/methods';
import { round2 } from '../../../util/round2';

export default class extends Controller {
   init() {
      super.init();
      this.store.set('$page.add', this.store.get('$route.id') == 'new');
      this.store.init('$page.invoice', {});

      this.reload();

      this.addTrigger('line-calc', ['$page.invoice.items'], () => {
         this.store.update('$page.invoice.items', updateArray, (item) => {
            var regularAmount = round2((item.qty || 0) * (item.unitPrice || 0));
            var discountAmount = round2((regularAmount * (item.discountPct || 0)) / 100);
            var taxAmount = round2(((regularAmount - discountAmount) * (item.taxPct || 0)) / 100);
            var totalAmount = regularAmount - discountAmount + taxAmount;

            //if total didn't change return the original object
            if (item.totalAmount == totalAmount) return item;

            //on change, return a new object so change can be detected
            return {
               ...item,
               regularAmount,
               discountAmount,
               taxAmount,
               totalAmount,
            };
         });
      });

      this.addTrigger('total-calc', ['$page.invoice.items'], (items) => {
         var sums = {
            totalAmount: 0,            
            discountAmount: 0,
            regularAmount: 0,
         };

         items.forEach((item) => {
            sums.totalAmount += item.totalAmount;
            sums.regularAmount += item.regularAmount;
            sums.discountAmount += item.discountAmount;
         });

         this.store.update('$page.invoice', (data) => ({
            ...data,
            ...sums,
         }));
      });
   }

   reload() {
      var id = this.store.get('$route.id');
      if (id != 'new') {
         var promise = GET(`invoices/${id}`).then((data) => {
            this.store.set('$page.invoice', data);
         });
         this.setLoadingIndicator(promise);
      } else {
         this.store.set('$page.invoice', { date: Date.now(), status: 'unpaid', items: [], totalAmount: 0,            
         discountAmount: 0,
         regularAmount: 0,
         });
      }
    }

   setSavingIndicator(p) {
      this.store.update('$page.saving', (saving) => (saving || 0) + 1);
      return p
         .then((x) => {
            this.store.update('$page.saving', (saving) => saving - 1);
            return x;
         })
         .catch((e) => {
            this.store.update('$page.saving', (saving) => saving - 1);
            throw e;
         });
   }

   setLoadingIndicator(p) {
      this.store.update('$page.loading', (loading) => (loading || 0) + 1);
      p.then((x) => {
         this.store.update('$page.loading', (loading) => loading - 1);
         return x;
      }).catch((e) => {
         this.store.update('$page.loading', (loading) => loading - 1);
      });
   }

   onQueryProducts(q) {
      return GET('products');
   }

   onAddItem() {
      this.nextItemId = this.nextItemId || -1;
      this.store.update('$page.invoice.items', append, {
         id: this.nextItemId--,
      });
   }

   onRemoveItem(e, { store }) {
      var id = store.get('$record.id');
      this.store.update('$page.invoice.items', (items) => items.filter((a) => a.id != id));
   }

   onSave() {
      const { invoice, add } = this.store.get('$page');

      const promise = add ? POST('invoices', invoice) : PUT(`invoices/${invoice.id}`, invoice);

      this.setSavingIndicator(promise)
         .then((data) => {
            History.replaceState({}, null, `~/invoices/${data.id}`);
         })
         .catch((e) => {
            console.log(e);
            MsgBox.alert({
               title: 'Error',
               message: e.toString(),
            });
         });
   }
}
