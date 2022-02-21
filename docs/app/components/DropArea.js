import { VDOM, Container } from 'cx/ui';
import { findScrollableParent, getTopLevelBoundingClientRect, isNumber, parseStyle } from 'cx/util';
import { DragDropContext, registerDropZone } from 'cx/widgets';

export class DropArea extends Container {
   init() {
      this.overStyle = parseStyle(this.overStyle);
      this.nearStyle = parseStyle(this.nearStyle);
      this.farStyle = parseStyle(this.farStyle);
      this.dropzoneStyle = parseStyle(this.dropzoneStyle);
      super.init();
   }

   declareData() {
      return super.declareData(...arguments, {
         overClass: { structured: true },
         nearClass: { structured: true },
         farClass: { structured: true },
         overStyle: { structured: true },
         nearStyle: { structured: true },
         farStyle: { structured: true },
         data: { structured: true },
         dropzoneClass: { structured: true },
         dropzoneStyle: { structured: true },
      });
   }

   render(context, instance, key) {
      return (
         <DropAreaComponent key={key} instance={instance}>
            {this.renderChildren(context, instance)}
         </DropAreaComponent>
      );
   }
}

DropArea.prototype.styled = true;
DropArea.prototype.baseClass = 'droparea';

class DropAreaComponent extends VDOM.Component {
   constructor(props) {
      super(props);
      this.state = {
         state: false,
         dropIndex: null,
      };
   }

   render() {
      let { instance, children } = this.props;
      let { data, widget } = instance;
      let { CSS, baseClass } = widget;
      let { state, dropIndex } = this.state;

      let classes = [data.classNames, CSS.state(state)];

      let stateStyle;

      switch (state) {
         case 'over':
            classes.push(data.overClass);
            stateStyle = parseStyle(data.overStyle);
            break;
         case 'near':
            classes.push(data.nearClass);
            stateStyle = parseStyle(data.nearStyle);
            break;
         case 'far':
            classes.push(data.farClass);
            stateStyle = parseStyle(data.farStyle);
            break;
      }

      let mixedChildren = children || [];

      if (state == 'over' && dropIndex != null) {
         let placeholder = (
            <div
               key="dropzone"
               style={{
                  ...this.state.style,
                  ...data.dropzoneStyle,
               }}
               className={CSS.expand(CSS.element(baseClass, 'dropzone'), data.dropzoneClass)}
            />
         );
         mixedChildren = [...children.slice(0, dropIndex), placeholder, ...children.slice(dropIndex)];
      }

      return (
         <div
            className={CSS.expand(classes)}
            style={{ ...data.style, ...stateStyle }}
            ref={(el) => {
               this.el = el;
            }}
         >
            {mixedChildren}
         </div>
      );
   }

   componentDidMount() {
      let dragDropOptions = this.context;
      let disabled = dragDropOptions && dragDropOptions.disabled;
      if (!disabled) this.unregister = registerDropZone(this);
   }

   componentWillUnmount() {
      this.unregister && this.unregister();
   }

   onDropTest(e) {
      let { instance } = this.props;
      let { widget } = instance;
      return !widget.onDropTest || instance.invoke('onDropTest', e, instance);
   }

   onDragStart(e) {
      this.setState({
         state: 'far',
      });
   }

   onDragNear(e) {
      this.setState({
         state: 'near',
      });
   }

   onDragAway(e) {
      this.setState({
         state: 'far',
      });
   }

   onDragLeave(e) {
      let { nearDistance } = this.props.instance.widget;
      this.setState({
         state: nearDistance ? 'near' : 'far',
         style: null,
      });
   }

   onDragMeasure(e) {
      let rect = getTopLevelBoundingClientRect(this.el);

      let { instance } = this.props;
      let { widget } = instance;

      let { clientX, clientY } = e.cursor;
      let distance =
         Math.max(0, rect.left - clientX, clientX - rect.right) +
         Math.max(0, rect.top - clientY, clientY - rect.bottom);

      let { nearDistance } = widget;

      let over = rect.left <= clientX && clientX < rect.right && rect.top <= clientY && clientY < rect.bottom;

      return {
         over: over && distance,
         near: nearDistance && (over || distance < nearDistance),
      };
   }

   onDragEnter(e) {
      let { instance } = this.props;
      let { widget } = instance;
      let style = {};

      style.width = `${e.source.width}px`;
      style.height = `${e.source.height}px`;
      style.margin = e.source.margin.join(' ');

      if (this.state != 'over')
         this.setState({
            state: 'over',
            style,
         });
   }

   onDragOver(e) {
      let { cursor } = e;
      let { CSS, baseClass } = this.props.instance.widget;
      let dropzoneCls = CSS.element(baseClass, 'dropzone');
      let children = Array.from(this.el.children).filter((c) => !c.classList.contains(dropzoneCls));
      let dropIndex = 0;
      children.forEach((child, index) => {
         let rect = getTopLevelBoundingClientRect(child);
         if (rect.left == rect.right && rect.top == rect.bottom) return;
         if (cursor.clientY >= rect.top) {
            if (cursor.clientX > (rect.left + rect.right) / 2 || cursor.clientY > rect.bottom) dropIndex = index + 1;
            else if (cursor.clientX >= rect.left) dropIndex = index;
         }
      });

      this.setState({
         dropIndex,
      });
   }

   onGetHScrollParent() {
      return findScrollableParent(this.el, true);
   }

   onGetVScrollParent() {
      return findScrollableParent(this.el);
   }

   onDrop(e) {
      let { instance } = this.props;
      let { widget, data } = instance;
      e.target = {
         data,
         dropIndex: this.state.dropIndex,
      };
      if (this.state.state == 'over' && widget.onDrop) instance.invoke('onDrop', e, instance);
   }

   onDragEnd(e) {
      this.setState({
         state: false,
         style: null,
      });
   }
}

DropAreaComponent.contextType = DragDropContext;
