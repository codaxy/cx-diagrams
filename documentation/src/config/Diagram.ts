export default {
  zoom: {
    type: 'number',
    key: true,
    description: 'Current zoom level. Default value is 1.',
  },
  offsetX: {
    type: 'number',
    key: true,
    description: 'Horizontal offset (pan).',
  },
  offsetY: {
    type: 'number',
    key: true,
    description: 'Vertical offset (pan).',
  },
  center: {
    type: 'boolean',
    key: true,
    description: 'Set to <code>true</code> to center the content both horizontally and vertically.',
  },
  centerX: {
    type: 'boolean',
    description: 'Set to <code>true</code> to center the content horizontally.',
  },
  centerY: {
    type: 'boolean',
    description: 'Set to <code>true</code> to center the content vertically.',
  },
  fixed: {
    type: 'boolean',
    description: 'Set to <code>true</code> to disable zooming and panning.',
  },
  unitSize: {
    type: 'number',
    description: 'Size of the grid unit in pixels. Default is 32.',
  },
  showGrid: {
    type: 'boolean',
    description: 'Set to <code>true</code> to display the grid.',
  },
};
