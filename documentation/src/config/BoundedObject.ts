import container from './Container';
import classAndStyle from './classAndStyle';

export default {
  ...container,
  ...classAndStyle,
  anchors: {
    type: 'string/number/rect',
    description:
      'Anchor defines how child bounds are tied to the parent. Zero aligns with the top/left edge. One aligns with the bottom/right edge.',
  },
  offset: {
    type: 'string/number/rect',
    description: 'Move boundaries specified by the offset.',
  },
  margin: {
    type: 'string/number/rect',
    description: 'Apply margin to the given boundaries.',
  },
  padding: {
    type: 'string/number/rect',
    description: 'Padding to be applied to the boundaries rectangle before passing to the children.',
  },
};
