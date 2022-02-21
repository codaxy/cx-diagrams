import { Widget, VDOM } from 'cx/ui';
import { addEventListenerWithOptions, isNumber } from 'cx/util';

export class ScrollTracker extends Widget {
   declareData(...args) {
      super.declareData(...args, {
         scroll: undefined,
      });
   }

   render(context, instance, key) {
      return (
         <ScrollTrackerCmp key={key} scroll={instance.data.scroll} instance={instance} horizontal={this.horizontal} />
      );
   }
}

class ScrollTrackerCmp extends VDOM.Component {
   render() {
      if (this.props.horizontal)
         return (
            <div
               style={{ position: 'absolute' }}
               ref={(el) => {
                  this.el = el?.parentElement;
               }}
            />
         );
      return null;
   }

   componentDidUpdate() {
      let { scroll, horizontal } = this.props;
      if (scroll == null) {
         if (horizontal) this.el.scrollLeft = 0;
         else document.scrollingElement.scrollTop = 0;
      }
   }

   componentDidMount() {
      let { scroll, horizontal, instance } = this.props;
      this.unsubscribe = addEventListenerWithOptions(
         horizontal ? this.el : document,
         'scroll',
         () => {
            let pos = horizontal ? this.el.scrollLeft : document.scrollingElement.scrollTop;
            instance.store.silently(() => {
               instance.set('scroll', pos, { internal: true });
            });
         },
         { passive: true }
      );

      if (isNumber(scroll)) {
         if (horizontal) this.el.scrollLeft = scroll;
         else document.scrollingElement.scrollTop = scroll;
      }
   }

   componentWillUnmount() {
      this.unsubscribe();
   }
}
