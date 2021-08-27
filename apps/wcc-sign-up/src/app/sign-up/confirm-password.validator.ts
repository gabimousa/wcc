import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Form group validator to check if the password field matches the confirmPassword field
 * @param group Form group that needs to be validated
 * @returns When the password field match it will return null otherwise it will return an object containing the notSame error
 */
export const confirmPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const pass = group.get('password')?.value;
  const confirmPass = group.get('confirmPassword')?.value;
  return pass === confirmPass ? null : { notSame: true };
};
