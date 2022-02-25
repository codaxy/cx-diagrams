module.exports = {
   plugins: [
      ['babel-plugin-transform-cx-jsx', { trimWhitespace: false, autoImportHtmlElement: true }],
      ['babel-plugin-transform-cx-imports', { useSrc: true }],
   ],
};
