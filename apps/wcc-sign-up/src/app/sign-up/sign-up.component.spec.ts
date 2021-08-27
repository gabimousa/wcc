import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SignUpMockService } from '../../test/services';
import { ConfirmPasswordErrorStateMockMatcher } from '../../test/services/confirm-password-error-state.mock.matcher';
import { AngularMaterialModule } from '../core';
import { SignUpService } from '../services';
import { ConfirmPasswordErrorStateMatcher } from './confirm-password-error-state.matcher';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  const selectors = {
    title: 'mat-card-title',
    matErrors: 'mat-error',
    submitButton: 'button[type=submit]',
  };

  const mockUser = {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'test@test.com',
  };

  const signUpMockService = new SignUpMockService();
  const matcher = new ConfirmPasswordErrorStateMockMatcher();

  let fixture: ComponentFixture<SignUpComponent>;
  let component: SignUpComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [SignUpComponent],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        { provide: SignUpService, useValue: signUpMockService },
        { provide: ConfirmPasswordErrorStateMatcher, useValue: matcher },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the sign up component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const title = debugElement.query(By.css(selectors.title));

    expect(title.nativeElement.textContent).toBe('Sign in');
  });

  it('should display the correct errors when firstName is not filled', () => {
    component.form.get('firstName')?.markAsTouched();
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'First name field is required'
    );
  });

  it('should display the correct errors when lastName is not filled', () => {
    component.form.get('lastName')?.markAsTouched();
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'Last name field is required'
    );
  });

  it('should display the correct errors when email is not filled', () => {
    component.form.get('email')?.markAsTouched();
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'Email field is required'
    );
  });

  it('should display the correct errors when email has incorrect format', () => {
    component.form.get('email')?.markAsTouched();
    component.form.get('email')?.setValue('test');
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain('Invalid email format');
  });

  it('should display the correct errors when password is not filled', () => {
    component.form.get('passwords.password')?.markAsTouched();
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'Password field is required'
    );
  });

  it('should display the correct errors when password length is to short', () => {
    component.form.get('passwords.password')?.markAsTouched();
    component.form.get('passwords.password')?.setValue('abc');
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'Password min length should be at least 8 characters'
    );
  });

  it('should display the correct errors when password does not contain lowercase letters', () => {
    component.form.get('passwords.password')?.markAsTouched();
    component.form.get('passwords.password')?.setValue('ABCDEFGHIJKLM');
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'Password should have at least one lowercase and one uppercase character'
    );
  });

  it('should display the correct errors when password does not contain uppercase letters', () => {
    component.form.get('passwords.password')?.markAsTouched();
    component.form.get('passwords.password')?.setValue('abcdefghijklm');
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'Password should have at least one lowercase and one uppercase character'
    );
  });

  it('should display the correct errors when password contains the first name', () => {
    component.form.get('firstName')?.setValue('TEST');
    component.form.get('passwords.password')?.markAsTouched();
    component.form.get('passwords.password')?.setValue('TESTvalue');
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'Password field cannot contain first name'
    );
  });

  it('should display the correct errors when password contains the first name', () => {
    component.form.get('lastName')?.setValue('TEST');
    component.form.get('passwords.password')?.markAsTouched();
    component.form.get('passwords.password')?.setValue('TESTvalue');
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'Password field cannot contain last name'
    );
  });

  it('should display the correct errors when confirm password does not equal password field', () => {
    jest.spyOn(matcher, 'isErrorState').mockReturnValue(true);

    component.form.get('passwords.password')?.markAsTouched();
    component.form.get('passwords.password')?.setValue('TESTvalue');
    component.form.get('passwords.confirmPassword')?.markAsTouched();
    component.form
      .get('passwords.confirmPassword')
      ?.setValue('SOME OTHER VALUE');
    fixture.detectChanges();

    const errors = debugElement.query(By.css(selectors.matErrors));

    expect(errors.nativeElement.textContent).toContain(
      'Password fields do not match'
    );
  });

  it('should disable submit button when form is invalid', () => {
    component.form.get('firstName')?.markAsTouched();
    fixture.detectChanges();

    const submitButton = debugElement.query(By.css(selectors.submitButton));

    expect(submitButton.nativeElement.disabled).toBe(true);
    expect(submitButton.nativeElement.classList).toContain(
      'mat-button-disabled'
    );
  });

  it('should call submit method on submit service when form is submitted', () => {
    const formValues = {
      ...mockUser,
      passwords: {
        password: 'Password',
        confirmPassword: 'Password',
      },
    };
    jest.spyOn(signUpMockService, 'signUp');
    component.form.patchValue(formValues);
    component.form.updateValueAndValidity();
    fixture.detectChanges();

    const submitButton = debugElement.query(By.css(selectors.submitButton));
    submitButton.nativeElement.click();

    expect(signUpMockService.signUp).toHaveBeenCalledWith({
      ...mockUser,
    });
  });

  it('should emit signedUp event when service call succeeds', () => {
    const formValues = {
      ...mockUser,
      passwords: {
        password: 'Password',
        confirmPassword: 'Password',
      },
    };

    jest
      .spyOn(signUpMockService, 'signUp')
      .mockReturnValue(of({ id: '0', ...mockUser }));
    component.form.patchValue(formValues);
    component.form.updateValueAndValidity();
    fixture.detectChanges();

    let emittedValue = null;
    component.signedUp.subscribe((val) => (emittedValue = val));

    const submitButton = debugElement.query(By.css(selectors.submitButton));
    submitButton.nativeElement.click();

    expect(emittedValue).toEqual({
      id: '0',
      ...mockUser,
    });
  });
});
