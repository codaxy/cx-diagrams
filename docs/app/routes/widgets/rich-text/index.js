import { LabelsTopLayout } from 'cx/ui';
import { LabeledContainer, TextArea } from 'cx/widgets';
import { ProsemirrorHtmlEditor } from '../../../components/ProsemirrorHTMLEditor';
import { ProsemirrorMarkdownEditor } from '../../../components/ProsemirrorMarkdownEditor';
import Controller from './Controller';

export default (
   <cx>
      <div controller={Controller} class="p-8">
         <LabelsTopLayout columns={2}>
            <ProsemirrorHtmlEditor class="h-64" value-bind="$page.html" label="HTML" />
            <LabeledContainer label="Preview">
               <div html-bind="$page.html" />
            </LabeledContainer>
            <ProsemirrorMarkdownEditor class="h-64" value-bind="$page.md" label="Markdown" />
            <TextArea value-bind="$page.md" label="TextArea" class="h-64" />
         </LabelsTopLayout>
      </div>
   </cx>
);
