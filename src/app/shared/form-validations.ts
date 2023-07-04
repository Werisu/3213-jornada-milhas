import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export class FormValidations {

  static equalTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário preencher o campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalTo : otherField };
      }

      return null;
    };
    return validator;
  }

   static notFutureData(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate: Date = control.value;
      const currentDate: Date = new Date();

      if (selectedDate && selectedDate > currentDate) {
        return { dataInvalida: true };
      }

      return null;
    };
  }

}

