import { LabelsTopLayout } from 'cx/ui';
import { Button, Checkbox, Link, PrivateStore, Rescope, TextField, ValidationGroup } from 'cx/widgets';
import { Logo2 } from '../../../components/Logo2';
import Controller from './Controller';

export default (
   <cx>
      <PrivateStore controller={Controller}>
         <div
            class="h-full flex flex-col items-center justify-center bg-blue-100 text-gray-800"
            controller={Controller}
         >
            <form class="px-8 pt-8 pb-8 bg-white shadow rounded w-[370px]" onSubmit="onSubmit">
               <Logo2 />
               <p class="text-gray-500 my-4">
                  Please enter your email address to receive instructions for accessing your account.
               </p>
               <ValidationGroup invalid-bind="invalid">
                  <LabelsTopLayout vertical class="w-full">
                     <TextField
                        value-bind="email"
                        label="Email"
                        required
                        class="w-full"
                        validationMode="help-block"
                        visited-bind="visited"
                     />
                     <Button mod="primary" submit class="w-full mt-2">
                        Send
                     </Button>
                  </LabelsTopLayout>
               </ValidationGroup>
            </form>
         </div>
      </PrivateStore>
   </cx>
);
