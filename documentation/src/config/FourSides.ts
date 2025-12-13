import node from './Node';

export default {
  ...node,
  gap: {
    type: 'number',
    key: true,
    description: 'Inner distance between the elements.',
  },
  slots: {
    type: 'array',
    key: true,
    description: "Order of slots. Default is <code>['center', 'right', 'down', 'left', 'up']</code>.",
  },
};
