import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpMockComponent } from '../../test';
import { AngularMaterialModule } from '../core';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  const selectors = {
    title: 'mat-toolbar span.title',
    signUpForm: 'wcc-sign-up',
    userDetails: '.user-details',
  };

  const mockUser = {
    _id: 'ID',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'test@test.com',
  };

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularMaterialModule, NoopAnimationsModule],
      declarations: [HomeComponent, SignUpMockComponent],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Web Coding Challenge'`, () => {
    const title = debugElement.query(By.css(selectors.title));

    expect(title.nativeElement.textContent).toBe('Web Coding Challenge');
  });

  it('should set the user when sign up form emits signedUp event', () => {
    const signUpForm = debugElement.query(By.css(selectors.signUpForm));
    const signUpComponent = signUpForm.componentInstance as SignUpMockComponent;

    signUpComponent.signedUp.next(mockUser);
    fixture.detectChanges();

    expect(component.user).toEqual(mockUser);
  });

  describe('when not signed up yet', () => {
    beforeEach(() => {
      component.user = null;
      fixture.detectChanges();
    });

    it('should display sign up form', () => {
      const signUpForm = debugElement.query(By.css(selectors.signUpForm));

      expect(signUpForm).toBeTruthy();
    });

    it('should hide the user details', () => {
      const userDetails = debugElement.query(By.css(selectors.userDetails));

      expect(userDetails).toBeNull();
    });
  });

  describe('when signed up yet', () => {
    beforeEach(() => {
      component.user = mockUser;
      fixture.detectChanges();
    });

    it('should hide sign up form', () => {
      const signUpForm = debugElement.query(By.css(selectors.signUpForm));

      expect(signUpForm).toBeNull();
    });

    it('should show the user details', () => {
      const userDetails = debugElement.query(By.css(selectors.userDetails));

      expect(userDetails).toBeTruthy();
    });
  });
});
