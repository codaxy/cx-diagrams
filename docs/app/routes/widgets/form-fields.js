import { LabelsTopLayout } from 'cx/ui';
import {
   Checkbox,
   ColorField,
   DateField,
   LookupField,
   MonthField,
   NumberField,
   Radio,
   Slider,
   Switch,
   TextField,
} from 'cx/widgets';

const Section = ({ children, title, description }) => (
   <cx>
      <div class="grid grid-cols-2 gap-16 mt-8 py-4" style="grid-template-columns: 300px 1fr">
         <div>
            <h6 class="mt-6 mb-1 text-lg">{title}</h6>
            <p class="text-sm text-gray-400">{description}</p>
         </div>
         <div>{children}</div>
      </div>
   </cx>
);

export default (
   <cx>
      <div class="px-12 py-7 text-gray-800">
         <h1 class="text-2xl">Form Fields</h1>

         <div class="divide-y">
            <Section title="Inputs" description="Keyboard based input">
               <LabelsTopLayout>
                  <TextField label="Text" value-bind="$page.text.text" />
                  <TextField label="Icon" icon="search" placeholder="Search..." value-bind="$page.text.search" />
                  <TextField label="Error" visited required value-bind="$page.text.error" />
               </LabelsTopLayout>
               <LabelsTopLayout>
                  <NumberField label="Number" value-bind="$page.number.number" format="n;2" placeholder="2 decimals" />
                  <NumberField
                     label="Percentage"
                     value-bind="$page.number.percentage"
                     format="p"
                     scale={0.01}
                     placeholder="Percentage"
                  />
                  <NumberField
                     label="Currency"
                     value-bind="$page.number.units"
                     format="currency;EUR;2"
                     placeholder="EUR"
                  />
               </LabelsTopLayout>
            </Section>

            <Section title="Pickers" description="Allow selection, but revert to keyboard input if neccessary">
               <LabelsTopLayout>
                  <DateField label="Date" value-bind="$page.date.date" />
                  {/*TimeField causing strange problems, fixed in the new version of CxJS */}
                  <MonthField label="Month Range" from-bind="$page.date.from" to-bind="$page.date.to" range />
               </LabelsTopLayout>

               <LabelsTopLayout>
                  <LookupField
                     label="Lookup"
                     value-bind="$page.lookup.item1"
                     options={Array.from({ length: 10 }, (_, index) => ({
                        id: index,
                        text: `Option ${index + 1}`,
                     }))}
                  />
               </LabelsTopLayout>

               <LabelsTopLayout>
                  <ColorField label="Color Picker" value-bind="$page.color.item1" />
               </LabelsTopLayout>
            </Section>

            <Section title="Switches" description="Mouse based interaction">
               <LabelsTopLayout>
                  <Checkbox label="Checkboxes" value-bind="$page.check.check1" text="Item 1" />
                  <Checkbox value-bind="$page.check.check2" text="Item 2" />
                  <Checkbox value-bind="$page.check.check3" text="Item 3" />
               </LabelsTopLayout>

               <LabelsTopLayout>
                  <Radio label="Radio buttons" value-bind="$page.radio.item1" text="Item 1" option={1} />
                  <Radio value-bind="$page.radio.item2" text="Item 2" option={2} />
                  <Radio value-bind="$page.radio.item3" text="Item 3" option={3} />
               </LabelsTopLayout>

               <LabelsTopLayout>
                  <Switch label="Switch" value-bind="$page.switch.switch" />
               </LabelsTopLayout>

               <LabelsTopLayout>
                  <Slider label="Slider" value-bind="$page.slider.slider" />
               </LabelsTopLayout>
            </Section>
         </div>
      </div>
   </cx>
);
