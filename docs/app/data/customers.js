import { randomElement } from './randomElement';
import { rest } from 'msw';
import { getSearchQueryPredicate } from "cx/util";

import customers from "./customers.json";

let lastId = 0;
customers.forEach(customer => {
    customer.id = ++lastId;
});

export function getRandomCustomer() {
    return randomElement(customers);
}

export const customerEndpoints = [
    rest.get('/api/customers', (req, res, ctx) => {
        let query = req.url.searchParams.get('query');
        let pageSize = req.url.searchParams.get('pageSize') || 100;
        let page = req.url.searchParams.get('page') || 1;
        let results = [...customers];
        if (query) {
            const predicate = getSearchQueryPredicate(query);
            results = results.filter((x) => predicate(x.name) || predicate(x.address));
        }
        results = results.slice((page - 1) * pageSize, page * pageSize);
        return res(ctx.json(results));
    }),
];
