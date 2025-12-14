export default {
  class: {
    type: 'string/object',
    alias: 'className',
    description:
      'Additional CSS classes to be applied to the element. If an object is provided, all keys with a "truthy" value will be added to the CSS class list.',
  },
  style: {
    type: 'string/object',
    description: 'Style object applied to the wrapper div. Used for setting the dimensions of the element.',
  },
};
