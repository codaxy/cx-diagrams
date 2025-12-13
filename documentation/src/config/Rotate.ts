import node from './Node';

export default {
  ...node,
  turns: {
    type: 'number',
    key: true,
    description: 'Number of rotation turns. One turn equals 90 degrees.',
  },
};
