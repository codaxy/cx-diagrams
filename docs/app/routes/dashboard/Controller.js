export default {
   onInit() {
      this.store.set('$page.chart', [
         { month: 'Dec', sales: 37235, expenses: 45135, balance: 20000 },
         { month: 'Jan', sales: 35235, expenses: 46135, balance: 13000 },
         { month: 'Feb', sales: 45235, expenses: 44135, balance: 12500 },
         { month: 'Mar', sales: 50235, expenses: 43135, balance: 17000 },
         { month: 'Apr', sales: 48235, expenses: 46135, balance: 17500 },
         { month: 'May', sales: 52235, expenses: 48135, balance: 18000 },
         { month: 'Jun', sales: 53235, expenses: 49135, balance: 22000 },
         { month: 'Jul', sales: 51235, expenses: 48135, balance: 26500 },
         { month: 'Aug', sales: 47235, expenses: 44135, balance: 28000 },
         { month: 'Sep', sales: 53235, expenses: 47135, balance: 29000 },
         { month: 'Oct', sales: 55235, expenses: 54135, balance: 29100 },
         { month: 'Nov', sales: 65235, expenses: 55135, balance: 39000 },
      ]);

      this.store.set('$page.topProducts', [
         { id: '1', name: 'Product 1', sales: 9442, percent: 0.1 },
         { id: '2', name: 'Product 2', sales: 7321, percent: 0.081 },
         { id: '3', name: 'Product 3', sales: 5321, percent: 0.062 },
         { id: '4', name: 'Product 4', sales: 4321, percent: 0.043 },
         { id: '5', name: 'Product 5', sales: 3321, percent: 0.033 },
      ]);

      this.store.set('$page.topExpenses', [
         { id: '1', name: 'Employee benefits', expense: 9442, percent: 0.5 },
         { id: '2', name: 'Advertising', expense: 7321, percent: 0.15 },
         { id: '3', name: 'Office rent + utilities', expense: 5321, percent: 0.13 },
         { id: '4', name: 'Depreciation', expense: 3321, percent: 0.1 },
         { id: '5', name: 'Insurance', expense: 4321, percent: 0.05 },
      ]);
   },
};
