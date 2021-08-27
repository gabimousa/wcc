import { FormControl } from '@angular/forms';
import { ConfirmPasswordErrorStateMatcher } from './confirm-password-error-state.matcher';

let sut: ConfirmPasswordErrorStateMatcher;

describe('ConfirmPasswordErrorStateMatcher', () => {
  beforeEach(() => (sut = new ConfirmPasswordErrorStateMatcher()));

  it('should show error state when control is touched and parent is invalid and dirty', () => {
    const control = {
      parent: {
        invalid: true,
        dirty: true,
      },
      touched: true,
    } as FormControl;

    const result = sut.isErrorState(control);

    expect(result).toBe(true);
  });

  it('should not show error when control is not defined', () => {
    const result = sut.isErrorState(undefined as any);

    expect(result).toBe(false);
  });

  it('should not show error when parent is not defined', () => {
    const control = {
      touched: true,
    } as FormControl;

    const result = sut.isErrorState(control);

    expect(result).toBe(false);
  });

  it('should not show error when parent is not invalid', () => {
    const control = {
      parent: {
        invalid: false,
        dirty: true,
      },
      touched: true,
    } as FormControl;

    const result = sut.isErrorState(control);

    expect(result).toBe(false);
  });

  it('should not show error when parent is not dirty', () => {
    const control = {
      parent: {
        invalid: true,
        dirty: false,
      },
      touched: true,
    } as FormControl;

    const result = sut.isErrorState(control);

    expect(result).toBe(false);
  });

  it('should not show error when control is not touched', () => {
    const control = {
      parent: {
        invalid: true,
        dirty: true,
      },
      touched: false,
    } as FormControl;

    const result = sut.isErrorState(control);

    expect(result).toBe(false);
  });
});
