import { Field } from 'cx/widgets';
import { VDOM } from 'cx/ui';

import { EditorView } from 'prosemirror-view';
import { EditorState, Plugin } from 'prosemirror-state';

export class ProsemirrorEditor extends Field {
   declareData(...args) {
      super.declareData(...args, {
         value: undefined,
      });
   }

   renderInput(context, instance, key) {
      let { data } = instance;

      //this must be stable
      if (!instance.onRef) instance.onRef = (el) => this.initializeEditor(el, instance);

      return (
         <div key={key} style={data.style} className={data.classNames}>
            <div className={this.CSS.element(this.baseClass, 'input')} ref={instance.onRef} />
         </div>
      );
   }

   prepareData(context, instance) {
      super.prepareData(context, instance);
      let { data, view } = instance;

      if (instance.editorValue != data.value && view) {
         view.updateState(
            EditorState.create({
               doc: this.parseDocument(data.value),
               plugins: view.state.plugins,
            })
         );
         instance.editorValue = data.value;
      }
   }

   destroyEditor(instance) {
      if (!instance.el) return;
      instance.view.destroy();
      instance.view = null;
      instance.el = null;
   }

   initializeEditor(el, instance) {
      if (instance.el == el) return;
      this.destroyEditor(instance);
      instance.el = el;
      instance.view = new EditorView(el, {
         state: EditorState.create({
            doc: this.parseDocument(instance.data.value),
            plugins: [
               ...this.createPlugins(),
               new Plugin({
                  props: {
                     attributes: {
                        tabindex: 0,
                     },
                     handleDOMEvents: {
                        blur: (view, event) => {
                           if (this.reactOn.indexOf('blur') >= 0) this.updateStore(instance);
                        },
                     },
                  },
               }),
            ],
         }),
         dispatchTransaction(tr) {
            this.updateState(this.state.apply(tr));
            let { widget } = instance;
            if (widget.reactOn.indexOf('change') >= 0) widget.updateStore(instance);
         },
      });
   }

   updateStore(instance) {
      var value = this.serializeDocument(instance.view.state.doc);
      instance.editorValue = value;
      instance.set('value', value);
   }

   parseDocument(value) {
      throw new Error('Not implemented.');
   }

   serializeDocument(doc) {
      throw new Error('Not implemented.');
   }

   createPlugins() {
      throw new Error('Not implemented.');
   }

   onDestroy(instance) {
      this.destroyEditor(instance);
   }
}

ProsemirrorEditor.prototype.styled = true;
ProsemirrorEditor.prototype.baseClass = 'prosemirror';
ProsemirrorEditor.prototype.reactOn = 'blur change';
