export default {
  visible: {
    type: 'boolean',
    alias: 'if',
    description: 'Visibility of the widget. Defaults to <code>true</code>.',
  },
  mod: {
    type: 'string/array',
    description:
      'Appearance modifier. For example, <code>mod="big"</code> will add the CSS class <code>.cxm-big</code> to the block element.',
  },
  outerLayout: {
    type: 'widget',
    description: 'Defines the outer layout which wraps the widget.',
  },
  putInto: {
    type: 'string',
    alias: 'contentFor',
    description:
      'Used with outer layouts. Specifies the name of the content placeholder which should render the widget.',
  },
  vdomKey: {
    type: 'string',
    description: 'Key that will be used as the key when rendering the React component.',
  },
};
