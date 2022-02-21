import { ProsemirrorEditor } from './ProsemirrorEditor';

import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown';
import { exampleSetup } from 'prosemirror-example-setup';

import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-example-setup/style/style.css';
import 'prosemirror-menu/style/menu.css';

export class ProsemirrorMarkdownEditor extends ProsemirrorEditor {
   parseDocument(value) {
      return defaultMarkdownParser.parse(value || '');
   }

   serializeDocument(doc) {
      return defaultMarkdownSerializer.serialize(doc);
   }

   createPlugins() {
      return exampleSetup({ schema });
   }
}
