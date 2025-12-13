import classAndStyle from './classAndStyle';

export default {
  ...classAndStyle,
  shape: {
    type: 'string',
    key: true,
    description: 'Available shapes are <code>triangle</code>, <code>line</code> and <code>vback</code>.',
  },
  position: {
    type: 'string',
    key: true,
    description: 'Available positions are <code>start</code>, <code>middle</code> and <code>end</code>. Default is <code>end</code>.',
  },
  size: {
    type: 'string',
    key: true,
    description: 'Size of the arrow head.',
  },
  fill: {
    type: 'string',
    key: true,
    description: 'Fill color of the arrow head.',
  },
  stroke: {
    type: 'string',
    key: true,
    description: 'Stroke color of the arrow head.',
  },
  aspectRatio: {
    type: 'number',
    key: true,
    description: 'Aspect ratio of the arrow shape. Default is 1.',
  },
  reverse: {
    type: 'boolean',
    key: true,
    description: 'Use reverse (to-to-from) direction.',
  },
};
