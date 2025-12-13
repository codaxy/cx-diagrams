import node from './Node';

export default {
  ...node,
  width: {
    type: 'number',
    key: true,
    alias: 'w',
    description: 'Width of the cell. Default value is 1.',
  },
  height: {
    type: 'number',
    key: true,
    alias: 'h',
    description: 'Height of the cell. Default value is 1.',
  },
};
