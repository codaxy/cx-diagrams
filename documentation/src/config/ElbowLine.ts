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
  startDirection: {
    type: 'string',
    key: true,
    description:
      'Direction in which the line leaves the start shape. Available values are <code>up</code>, <code>down</code>, <code>left</code>, <code>right</code>. Default value is <code>right</code>.',
  },
  endDirection: {
    type: 'string',
    key: true,
    description:
      'Direction in which the line travels when it enters the end shape, e.g. <code>right</code> means that the line enters the shape on its left side. Defaults to <code>startDirection</code>.',
  },
  smooth: {
    type: 'boolean',
    key: true,
    description: 'Set to <code>true</code> to draw a smooth curve instead of straight segments.',
  },
  cornerRadius: {
    type: 'number',
    key: true,
    description: 'Radius used to round the corners of the line. Default value is <code>8</code>.',
  },
  startOffset: {
    type: 'number',
    key: true,
    description:
      'Moves the start point away from the middle of the side, in pixels. Positive values move it down on the left and right side, and to the right on the top and bottom side. The point always stays on the side. Default value is <code>0</code>.',
  },
  endOffset: {
    type: 'number',
    key: true,
    description:
      'Moves the end point away from the middle of the side, in pixels. Positive values move it down on the left and right side, and to the right on the top and bottom side. The point always stays on the side. Default value is <code>0</code>.',
  },
  minStartLength: {
    type: 'number',
    description:
      'Minimum length of the first segment in pixels. Use it to leave enough room for an arrow head at the start of the line. Default value is <code>8</code>.',
  },
  minEndLength: {
    type: 'number',
    description:
      'Minimum length of the last segment in pixels. Use it to leave enough room for an arrow head at the end of the line. Default value is <code>8</code>.',
  },
  clearance: {
    type: 'number',
    description:
      'Minimum distance in pixels kept between the line and the shapes when the line has to go around them. Default value is <code>16</code>.',
  },
  stroke: {
    type: 'string',
    key: true,
    description: 'Color of the line. Set the thickness with <code>style</code> (e.g. <code>stroke-width: 2px</code>) or a CSS class.',
  },
};
