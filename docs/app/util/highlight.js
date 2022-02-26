import hljs from 'highlight.js/lib/core';
import jsx from 'highlight.js/lib/languages/xml';
import { removeCommonIndent } from '../components/removeCommonIndent';

hljs.registerLanguage('jsx', jsx);

export function hightlightCode(raw) {
   let result = hljs.highlight(removeCommonIndent(raw), { language: 'jsx' });
   return result.value;
}
