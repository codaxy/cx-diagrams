import { Controller, History, Url } from 'cx/ui';
import { GET } from '../../../api/util/methods';

export default class extends Controller {
   init() {
      super.init();

      this.store.init('$page.pageSize', 20);

      this.store.init('$page.filter', {
         query: null,
         sortField: 'invoiceNo',
         sortDir: 'desc',
      });

      this.addTrigger(
         'resetPage',
         ['$page.filter', '$page.pageSize'],
         () => {
            this.store.set('$page.page', 1);
            this.store.set('$page.pageCount', 1);
         },
         true
      );

      this.addTrigger('load', ['$page.filter', '$page.page', '$page.pageSize'], () => this.onLoad(), true);
   }

   onLoad() {
      var filter = this.store.get('$page.filter');
      var pageSize = this.store.get('$page.pageSize');
      var page = this.store.get('$page.page');
      var pageCount = this.store.get('$page.pageCount');
      var promise = GET('invoices', { query: { ...filter, page, pageSize } }).then((data) => {
         this.store.set('$page.records', data.slice(0, pageSize));
         //if we got more than what we asked that increase the pageCount
         this.store.set('$page.pageCount', Math.max(pageCount, page + (data.length == pageSize ? 1 : 0)));
      });
      this.setLoadingIndicator(promise);
   }

   onNewOrder() {
      History.pushState({}, null, '~/invoices/new');
   }

   setSavingIndicator(p) {
      this.store.update('$page.saving', (saving) => (saving || 0) + 1);
      p.then(() => {
         this.store.update('$page.saving', (saving) => saving - 1);
      }).catch(() => {
         this.store.update('$page.saving', (saving) => saving - 1);
      });
   }

   setLoadingIndicator(p) {
      this.store.update('$page.loading', (loading) => (loading || 0) + 1);
      p.then(() => {
         this.store.update('$page.loading', (loading) => loading - 1);
      }).catch(() => {
         this.store.update('$page.loading', (loading) => loading - 1);
      });
   }
}
