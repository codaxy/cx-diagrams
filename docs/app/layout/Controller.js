import { History } from 'cx/ui';
import { GET } from '../api/util/methods';

export default {
    onInit() {
        this.addTrigger('scroll-reset', ['url'], () => {
            document.scrollingElement.scrollTop = 0;
        });

        this.addTrigger("search", ["search.query"], async query => {
            if (!query) return;
            let [invoices, customers] = await Promise.all([
                GET(`invoices?query=${encodeURIComponent(query)}&pageSize=3`),
                GET(`customers?query=${encodeURIComponent(query)}&pageSize=3`),
            ])
            this.store.set("search.results", [
                ...invoices.map(inv => ({
                    type: 'invoice',
                    title: `Invoice #${inv.invoiceNo}`,
                    text: inv.customer.name,
                    url: `~/invoices/${inv.id}`
                })), 
                ...customers.map(cust => ({
                    type: 'customer',
                    title: cust.name,
                    text: cust.address,
                    url: `~/customers`
                }))
            ]);
        });
    },

    async onSignOut() {
        //window.location = "/sign-out";
        this.store.set('user', null);
        History.pushState({}, null, '~/');
    },
};
