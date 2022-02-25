import { HtmlElement } from 'cx/widgets';
import { Widget, VDOM } from 'cx/ui';
import { hightlightCode } from '../util/highlight';
import 'highlight.js/styles/github.css';

// // for example, if you want to highlight 'javascript'
// import { jsx } from 'illuminate-js/lib/languages/jsx';

// import 'illuminate-js/themes/solarized-light.css';
// import { hightlightCode } from '../util/highlight';

//addLanguage('jsx', jsx);

// function lazyHighlight(text, lang) {
//    var cache;
//    return () => {
//       if (typeof cache == 'undefined') {
//          var withoutIndent = removeCommonIndent(text);
//          cache = highlight(withoutIndent, lang);
//       }
//       return cache;
//    };
// }

export class CodeSnippet extends HtmlElement {
   render(context, instance, key) {
      let { data } = instance;

      return (
         <div key={key} className={data.classNames}>
            <pre className={`language-${this.lang}`}>{this.renderChildren(context, instance)}</pre>
         </div>
      );
   }

   add(text) {
      if (typeof text != 'string') return super.add(...arguments);

      super.add({
         type: HtmlElement,
         innerHtml: hightlightCode(text, this.lang),
         tag: 'code',
         class: `language-${this.lang}`,
      });
   }
}

CodeSnippet.prototype.plainText = true;
CodeSnippet.prototype.tag = 'pre';
CodeSnippet.prototype.lang = 'jsx';
CodeSnippet.prototype.baseClass = 'codesnippet';
