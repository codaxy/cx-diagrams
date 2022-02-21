import { setupWorker } from 'msw';
import { customerEndpoints } from './customers';
import { invoiceEndpoints } from './invoices';
import { productEndpoints } from './products';

navigator.serviceWorker.getRegistrations().then(function (registrations) {
   for (let registration of registrations) {
      registration.unregister();
   }
});

const worker = setupWorker(...customerEndpoints, ...productEndpoints, ...invoiceEndpoints);
worker
   .start({
      onUnhandledRequest: 'warn',
   })
   .then(() => {
      console.log('MOCK API WORKER SUCCESSFULLY STARED.');
   })
   .catch((err) => {
      console.error('MOCK API WORKER FAILED TO START.', err);
   });
