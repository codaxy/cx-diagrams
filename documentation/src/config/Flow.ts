import node from './Node';

export default {
  ...node,
  gap: {
    type: 'number',
    key: true,
    description: 'Inner distance between the child cells.',
  },
  direction: {
    type: 'string',
    key: true,
    description: 'Available directions are <code>left</code>, <code>right</code>, <code>up</code> and <code>down</code>. Default value is <code>right</code>.',
  },
  padding: {
    type: 'number',
    alias: 'p',
    description: 'Padding.',
  },
  pl: {
    type: 'number',
    description: 'Left padding.',
  },
  px: {
    type: 'number',
    description: 'Horizontal padding.',
  },
  py: {
    type: 'number',
    description: 'Vertical padding.',
  },
  pr: {
    type: 'number',
    description: 'Right padding.',
  },
  pt: {
    type: 'number',
    description: 'Top padding.',
  },
  pb: {
    type: 'number',
    description: 'Bottom padding.',
  },
  align: {
    key: true,
    type: 'string',
    description: 'Item alignment. Supported values are <code>start</code> and <code>center</code>.',
  },
  justify: {
    type: 'string',
    description: 'Item justification. The only supported value right now is <code>space-between</code>.',
  },
  selfAlign: {
    type: 'string',
    description: 'Self alignment. The only supported value right now is <code>stretch</code>.',
  },
};
