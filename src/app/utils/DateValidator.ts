import { FormControl } from '@angular/forms';

export class DateValidator {

   static GreaterThanOrEqualToToDay(control: FormControl): { [key: string]: any } {
        let today : Date = new Date();

       if (new Date(control.value) < today)
           return { "GreaterThanOrEqualToToDay": true };

       return {};
   }
}