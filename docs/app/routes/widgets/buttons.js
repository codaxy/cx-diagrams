import { Button, Section, FlexRow } from 'cx/widgets';

const buttons = (mod) => (
   <cx>
      <FlexRow spacing>
         <Button mod={mod}>Default</Button>
         <Button mod={mod} disabled>
            Disabled
         </Button>
         <Button mod={mod} pressed>
            Pressed
         </Button>
         <Button mod={mod} icon="chart-bar" />
         <Button mod={mod} icon="chart-bar">
            Icon + Text
         </Button>
      </FlexRow>
   </cx>
);

export default (
   <cx>
      <div class="px-12 py-7 text-gray-800">
         <h1 class="text-2xl">Buttons</h1>
         <div>
            <h6 class="mt-6 mb-2">Standard</h6>
            {buttons(null)}

            <h6 class="mt-8 mb-2">Primary</h6>
            {buttons('primary')}

            <h6 class="mt-8 mb-2">Danger</h6>
            {buttons('danger')}

            <h6 class="mt-8 mb-2">Hollow</h6>
            {buttons('hollow')}
         </div>
      </div>
   </cx>
);
