import { ContentResolver } from 'cx/widgets';
import { SandboxedRoute } from '../../components/SandboxedRoute';
import Buttons from './buttons';
import FormFields from './form-fields';

export default (
   <cx>
      <SandboxedRoute route="+/buttons">
         <Buttons />
      </SandboxedRoute>
      <SandboxedRoute route="+/form-fields">
         <FormFields />
      </SandboxedRoute>
      <SandboxedRoute route="+/rich-text">
         <ContentResolver
            onResolve={async () => {
               const { default: RichText } = await import(/* webpackChunkName: "rich-text" */ './rich-text');
               return (
                  <cx>
                     <RichText />
                  </cx>
               );
            }}
         />
      </SandboxedRoute>
   </cx>
);
