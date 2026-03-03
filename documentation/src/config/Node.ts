export default {
  ms: {
    type: 'number',
    description: 'Start margin in the direction of the flow.',
  },
  me: {
    type: 'number',
    description: 'End margin in the direction of the flow.',
  },
  margin: {
    type: 'number',
    alias: 'm',
    description: 'Margin around the cell.',
  },
  ml: {
    type: 'number',
    description: 'Left margin.',
  },
  mr: {
    type: 'number',
    description: 'Right margin.',
  },
  mt: {
    type: 'number',
    description: 'Top margin.',
  },
  mb: {
    type: 'number',
    description: 'Bottom margin.',
  },
  mx: {
    type: 'number',
    description: 'Horizontal margin.',
  },
  my: {
    type: 'number',
    description: 'Vertical margin.',
  },
  grow: {
    type: 'boolean',
    description: 'If set, the element will grow to fill available space in the flow direction.',
  },
  msAuto: {
    type: 'boolean',
    description: 'If set, the start margin will be automatically calculated to fill available space.',
  },
  meAuto: {
    type: 'boolean',
    description: 'If set, the end margin will be automatically calculated to fill available space.',
  },
};
