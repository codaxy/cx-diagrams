import node from './Node';

export default {
  ...node,
  offsetX: {
    type: 'number',
    key: true,
    description: 'Horizontal offset in pixels. Bind this to the store to persist drag position.',
  },
  offsetY: {
    type: 'number',
    key: true,
    description: 'Vertical offset in pixels. Bind this to the store to persist drag position.',
  },
};
