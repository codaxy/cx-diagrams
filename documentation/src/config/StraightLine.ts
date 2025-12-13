import bounds from './BoundedObject';

export default {
  ...bounds,
  from: {
    type: 'string',
    key: true,
    description: 'Id of the first (start) shape.',
  },
  to: {
    type: 'string',
    key: true,
    description: 'Id of the second (end) shape.',
  },
  stroke: {
    type: 'string',
    key: true,
    description: 'Color of the line.',
  },
  strokeWidth: {
    type: 'string',
    key: true,
    description: 'Line thickness.',
  },
};
