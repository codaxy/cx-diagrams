import widget from './Widget';

export default {
  ...widget,
  layout: {
    type: 'string/object',
    description: 'Define an inner layout.',
  },
  trimWhitespace: {
    type: 'boolean',
    description:
      'Remove all whitespace in text based children. Default is <code>true</code>. See also <code>preserveWhitespace</code>.',
  },
  preserveWhitespace: {
    type: 'boolean',
    alias: 'ws',
    description:
      'Keep whitespace in text based children. Default is <code>false</code>. See also <code>trimWhitespace</code>.',
  },
  plainText: {
    type: 'boolean',
    description: 'Set to <code>true</code> to avoid converting inner strings to templates. Default <code>false</code>.',
  },
  items: {
    type: 'array',
    alias: 'children',
    description: 'List of child elements.',
  },
};
