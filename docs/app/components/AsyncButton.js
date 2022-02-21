import { Button, MsgBox, Toast } from 'cx/widgets';

export class AsyncButton extends Button {
   declareData() {
      return super.declareData(...arguments, {
         busyText: undefined,
      });
   }

   prepareData(context, instance) {
      let { data, state } = instance;

      if (state && state.running) {
         data.icon = 'loading';

         if (data.busyText) data.text = data.busyText;

         data.disabled = true;
      }

      super.prepareData(context, instance);
   }

   attachProps(context, instance, props) {
      delete props.busyText;
      super.attachProps(context, instance, props);
   }

   init() {
      let onClick = this.onClick;

      let invoke = function (handler, e, instance) {
         if (typeof handler === 'string') return instance.invokeControllerMethod(handler, e, instance);
         else return handler.call(this, e, instance);
      };

      this.onClick = (e, instance) => {
         let promise = onClick && invoke(onClick, e, instance);
         if (promise) {
            instance.setState({ running: true });
            Promise.resolve(promise)
               .then((x) => {
                  instance.setState({ running: false });
                  return x;
               })
               .catch((e) => {
                  instance.setState({ running: false });
                  switch (this.errorHandling) {
                     case 'none':
                        throw e;

                     case 'console':
                        console.log(e); // eslint-disable-line no-console
                        break;

                     case 'alert':
                        MsgBox.alert(e.toString());
                        break;

                     case 'toast': {
                        let toast = Toast.create({
                           message: e.toString(),
                           timeout: 5000,
                        });
                        toast.open(this.store);
                        break;
                     }
                  }
               });
         }
      };

      super.init();
   }
}

AsyncButton.prototype.errorHandling = 'none';
