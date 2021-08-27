import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { SignUpService } from '../services';
import { ConfirmPasswordErrorStateMatcher } from './confirm-password-error-state.matcher';
import { confirmPasswords } from './confirm-password.validator';
import { shouldNotContain } from './should-not-contain.validator';
import { SignUpResultModel } from './sign-up.model';

@Component({
  selector: 'wcc-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  /** Form group for all the fields on sign up form */
  public form: FormGroup;

  /** Form group for the password fields of the sign up form */
  public passwordsForm: FormGroup;

  @Output()
  public signedUp: EventEmitter<SignUpResultModel>;

  @HostBinding('class')
  private readonly className = 'wcc-sign-up';

  /** subject that will emit when the component is destroyed */
  private destroy$: Subject<void>;

  /**
   *
   * @param fb Angular FormBuilder
   * @param matcher ConfirmPassword field matcher required by the mat-form-field
   * @param signUpService service for making the sign up request
   */
  constructor(
    private readonly fb: FormBuilder,
    public readonly matcher: ConfirmPasswordErrorStateMatcher,
    private readonly signUpService: SignUpService
  ) {
    this.signedUp = new EventEmitter();
    this.destroy$ = new Subject();

    this.passwordsForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])/),
            shouldNotContain('firstName'),
            shouldNotContain('lastName'),
          ],
        ],
        confirmPassword: [''],
      },
      { validators: [confirmPasswords] }
    );

    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.passwordsForm,
    });
  }

  /**
   * OnInit lifecycle method triggered by Angular
   */
  public ngOnInit() {
    const firstNameValueChanges = this.form
      .get('firstName')
      ?.valueChanges.pipe(startWith(null));
    const lastNameValueChanges = this.form
      .get('lastName')
      ?.valueChanges.pipe(startWith(null));
    if (firstNameValueChanges && lastNameValueChanges) {
      combineLatest([firstNameValueChanges, lastNameValueChanges])
        .pipe(
          takeUntil(this.destroy$),
          tap(() =>
            this.passwordsForm.get('password')?.updateValueAndValidity()
          )
        )
        .subscribe();
    }
  }


  /**
   * OnDestroy lifecycle method triggered by Angular
   */
  ngOnDestroy() {
    this.destroy$.next();
  }

  /**
   * Event handler for when the form is submitted
   */
  public onSubmit() {
    if (this.form.valid) {
      const { firstName, lastName, email } = this.form.value;

      this.signUpService
        .signUp({ firstName, lastName, email })
        .subscribe((result) => {
          if (result) {
            console.log(result);
            this.signedUp.emit(result);
          }
        });
    }
  }
}
