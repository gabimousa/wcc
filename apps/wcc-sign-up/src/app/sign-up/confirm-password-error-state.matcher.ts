import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * ErrorStateMatcher provided to the mat-form-field to indicate that a field is in an error state
 */
@Injectable({ providedIn: 'root' })
export class ConfirmPasswordErrorStateMatcher implements ErrorStateMatcher {
  /**
   * Method called by angular forms to check if an control is in an error state
   * @param control control that is being validated
   * @returns true or false
   */
  isErrorState(control: FormControl | null): boolean {
    return !!(
      control?.parent?.invalid &&
      control?.parent?.dirty &&
      control?.touched
    );
  }
}
