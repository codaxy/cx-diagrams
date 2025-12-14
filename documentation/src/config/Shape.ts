import bounds from './BoundedObject';

export default {
  ...bounds,
  text: {
    type: 'string',
    key: true,
    description: 'Inner text.',
  },
  shape: {
    type: 'string',
    key: true,
    description: 'Shape kind. Available shapes are <code>rectangle</code>, <code>circle</code> and <code>rhombus</code>.',
  },
  tooltip: {
    type: 'string/object',
    description: 'Tooltip configuration.',
  },
  stroke: {
    type: 'string',
    key: true,
    description: 'Color of shape borders.',
  },
  strokeWidth: {
    type: 'string',
    key: true,
    description: 'Border thickness.',
  },
  fill: {
    type: 'string',
    key: true,
    description: 'Color of shape fill.',
  },
  shapeClass: {
    type: 'string/object',
    key: true,
    description: 'CSS class to be applied to the shape.',
  },
  shapeStyle: {
    type: 'string/object',
    key: true,
    description: 'CSS style to be applied to the shape.',
  },
  textClass: {
    type: 'string/object',
    key: true,
    description: 'CSS class to be applied to the inner text.',
  },
  textStyle: {
    type: 'string/object',
    key: true,
    description: 'CSS style to be applied to the inner text.',
  },
};
