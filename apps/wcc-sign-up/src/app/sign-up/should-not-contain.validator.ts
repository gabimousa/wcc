import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator that checks the control value that it has been set on should not contain a value from an other field
 * @param fieldName fieldname in the form that should be checked
 * @returns when the value of the other field is contained in the control value then it will return an error shouldNotContain_[fieldName]
 * eg. shouldNotContain_firstName otherwise it will return null
 */
export const shouldNotContain: (fieldName: string) => ValidatorFn =
  (fieldName: string) =>
  (control: AbstractControl): ValidationErrors | null => {
    const controlValue: string = (control.value || '').toLowerCase();
    const valueToCompare: string = (
      control.root.get(fieldName)?.value || ''
    ).toLowerCase();

    return !!valueToCompare && controlValue?.includes(valueToCompare)
      ? { [`shouldNotContain_${fieldName}`]: { value: valueToCompare } }
      : null;
  };
