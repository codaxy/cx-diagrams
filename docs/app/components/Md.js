import { DocumentTitle } from 'cx/widgets';
import { Url, History } from 'cx/ui';
import { HtmlElement } from 'cx/widgets';
import { marked, Renderer } from 'marked';
import { removeCommonIndent } from './removeCommonIndent';

class CustomRenderer extends Renderer {
   link(href, title, text, slugger) {
      href = Url.resolve(href);
      return super.link(href, title, text, slugger);
   }

   lastH1Text = null;

   heading(text, level, raw, slugger) {
      var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

      if (level == 1) this.lastH1Text = text;

      if (level > 1)
         return `<h${level}><a class="anchor" id="${escapedText}"></a><a href="#${escapedText}" tabindex="-1">${text}</a></h${level}>`;

      return super.heading(text, level, raw, slugger);
   }
}

var renderer = new CustomRenderer();

export class Md extends HtmlElement {
   attachProps(context, instance, props) {
      super.attachProps(context, instance, props);
      props.onClick = (e) => {
         if (e.target.tagName == 'A') {
            if (
               Url.isLocal(e.target.href) &&
               e.target.href.indexOf('#') == -1 &&
               !e.ctrlKey &&
               !e.shiftKey &&
               !e.metaKey
            ) {
               History.pushState({}, null, e.target.href);
               e.preventDefault();
            }
         }
      };
   }

   add(text) {
      if (typeof text != 'string') {
         if (Array.from(arguments).every((a) => typeof a == 'string')) return this.add(Array.from(arguments).join(''));

         return super.add(...arguments);
      }

      var withoutIndent = removeCommonIndent(text);
      if (!withoutIndent) return null;

      renderer.lastH1Text = null;
      var md = marked(withoutIndent, { renderer: renderer });
      if (!this.preserveDocumentTitle && renderer.lastH1Text)
         super.add({
            type: DocumentTitle,
            value: renderer.lastH1Text.replace('&amp;', '&'),
            action: 'prepend',
         });

      return super.add({
         type: HtmlElement,
         innerHtml: md,
      });
   }
}

Md.prototype.className = 'prose lg:prose-xl';
Md.prototype.preserveDocumentTitle = false;
Md.prototype.plainText = true;
