import { Format } from 'cx/ui';

Format.register('kformat', (value) => {
   let abs = Math.abs(value);
   if (abs >= 1e6) return Format.value(value / 1e6, 'n;0;1') + 'M';
   if (abs >= 1e3) return Format.value(value / 1e3, 'n;0;1') + 'k';
   if (abs >= 100) return Format.value(value, 'n;0');
   if (abs >= 10) return Format.value(value, 'n;0;1');
   if (abs > 0) return Format.value(value, 'n;0;2');
   return '0';
});
