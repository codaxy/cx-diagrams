import { VDOM, Container } from 'cx/ui';

export class PrintFrame extends Container {
   declareData() {
      return super.declareData(...arguments, {
         autoPrint: undefined,
      });
   }

   render(context, instance, key) {
      return (
         <IFramePortal
            key={key}
            data={instance.data}
            onAutoPrint={() => {
               if (instance.widget.onAutoPrint) instance.invoke('onAutoPrint', null, instance);
            }}
         >
            {this.renderChildren(context, instance)}
         </IFramePortal>
      );
   }
}

PrintFrame.prototype.styled = true;
PrintFrame.prototype.baseClass = 'printframe';

//Original idea: https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202
//Credits: Dave Gilbertson

class IFramePortal extends VDOM.PureComponent {
   constructor(props) {
      super(props);
      this.containerEl = document.createElement('div');
      this.containerEl.className = 'cxe-printframe-page';
      this.state = {
         ready: false,
      };
   }

   componentDidMount() {
      this.iframeEl.addEventListener('load', this.handleLoad);
   }

   componentWillUnmount() {
      this.iframeEl.removeEventListener('load', this.handleLoad);
   }

   handleLoad = () => {
      let innerDocument = this.iframeEl.contentDocument;
      innerDocument.body.appendChild(this.containerEl);
      copyStyles(document, innerDocument);

      // document2.title = 'Print...';

      this.setState({ ready: true }, () => {
         if (this.props.data.autoPrint) {
            setTimeout(() => {
               if (this.iframeEl) this.iframeEl.contentWindow.print();
               this.props.onAutoPrint();
            }, 500);
         }
      });
   };

   render() {
      let { data, children } = this.props;
      return (
         <div style={data.style} className={data.classNames}>
            <iframe
               srcDoc={`<!DOCTYPE html>`}
               ref={(el) => {
                  this.iframeEl = el;
               }}
            />
            {this.state.ready && VDOM.DOM.createPortal(children, this.containerEl)}
         </div>
      );
   }
}

function copyStyles(sourceDoc, targetDoc) {
   Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
      try {
         if (styleSheet.href) {
            // true for stylesheets loaded from a URL
            const newLinkEl = sourceDoc.createElement('link');

            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = styleSheet.href;
            if (!newLinkEl.href.match(/(light|dark|white|print|report|contrast|base)/))
               targetDoc.head.appendChild(newLinkEl);
         } else if (styleSheet.cssRules) {
            //true for inline styles
            const newStyleEl = sourceDoc.createElement('style');

            Array.from(styleSheet.cssRules).forEach((cssRule) => {
               newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });

            targetDoc.head.appendChild(newStyleEl);
         }
      } catch (err) {
         console.warn(err);
      }
   });
}
