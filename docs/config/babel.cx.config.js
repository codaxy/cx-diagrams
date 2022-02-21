module.exports = {
   plugins: [
      ['babel-plugin-transform-cx-jsx', { trimWhitespace: true, autoImportHtmlElement: true }],
      ['babel-plugin-transform-cx-imports', { useSrc: true }],
   ],
};
