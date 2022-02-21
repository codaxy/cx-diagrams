import { LabelsTopLayout } from 'cx/ui';
import { Button, Checkbox, Link, PrivateStore, Rescope, TextField, ValidationGroup } from 'cx/widgets';
import { Logo2 } from '../../../components/Logo2';
import Controller from './Controller';

export default (
   <cx>
      <PrivateStore
         data={{
            user: { bind: 'user' },
         }}
         controller={Controller}
      >
         <div
            class="h-full flex flex-col items-center justify-center bg-blue-100 text-gray-800"
            controller={Controller}
         >
            <form class="px-8 pt-8 pb-8 bg-white shadow rounded w-[370px]" onSubmit="onSubmit">
               <Logo2 />
               <p class="text-gray-500 my-4">
                  Please sign in to access the application. For demo purposes any username and password will do.
               </p>
               <ValidationGroup invalid-bind="invalid">
                  <LabelsTopLayout vertical class="w-full">
                     <TextField
                        value-bind="username"
                        label="Username"
                        required
                        class="w-full"
                        validationMode="help-block"
                        visited-bind="visited"
                     />
                     <TextField
                        value-bind="password"
                        label="Password"
                        inputType="password"
                        class="w-full"
                        validationMode="help-block"
                        visited-bind="visited"
                        required
                     />
                     <div class="flex items-center">
                        <Checkbox value-bind="rememberMe">Remember me</Checkbox>
                        <Link href="~/pages/password-recovery" class="ml-auto text-sm text-blue-500">
                           Forgot your password
                        </Link>
                     </div>
                     <Button mod="primary" submit class="w-full mt-2">
                        Login
                     </Button>
                  </LabelsTopLayout>
               </ValidationGroup>
            </form>
         </div>
      </PrivateStore>
   </cx>
);
