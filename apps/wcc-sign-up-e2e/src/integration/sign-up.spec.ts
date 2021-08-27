import { SignUpFormPage } from '../support';
import { HomePage } from '../support/home.page';

const signUpFormPage = new SignUpFormPage();
const homePage = new HomePage();
const mockUser = {
  firstName: 'Thomas',
  lastName: 'Shelby',
  email: 'thomas@shelby.co.uk',
};
describe('wcc-sign-up', () => {
  beforeEach(() => cy.visit('/'));

  it('should disable submit button when form is invalid', () => {
    signUpFormPage.submitButton.should('be.disabled');
  });

  it('should display display correct error when first name is not filled', () => {
    signUpFormPage.firstNameField.focus().blur();
    signUpFormPage.firstNameRequiredError.should(
      'contain',
      'First name field is required'
    );
  });

  it('should display display correct error when last name is not filled', () => {
    signUpFormPage.lastNameField.focus().blur();
    signUpFormPage.lastNameRequiredError.should(
      'contain',
      'Last name field is required'
    );
  });

  it('should display display correct error when email is not filled', () => {
    signUpFormPage.emailField.focus().blur();
    signUpFormPage.emailRequiredError.should(
      'contain',
      'Email field is required'
    );
  });

  it('should display display correct error when password is not filled', () => {
    signUpFormPage.passwordField.focus().blur();
    signUpFormPage.passwordRequiredError.should(
      'contain',
      'Password field is required'
    );
  });

  it('should display display correct error when password is too short', () => {
    signUpFormPage.passwordField.type('aaa').blur();
    signUpFormPage.passwordMinLengthError.should(
      'contain',
      'Password min length should be at least 8 characters'
    );
  });

  it('should display display correct error when password does not satisfy pattern', () => {
    signUpFormPage.passwordField.type('aaaaaaaaaaaaaaaaa').blur();
    signUpFormPage.passwordPatternError.should(
      'contain',
      'Password should have at least one lowercase and one uppercase character'
    );
  });

  it('should display display correct error when password contains first name', () => {
    signUpFormPage.firstNameField.type('Password');
    signUpFormPage.passwordField.type('Password').blur();
    signUpFormPage.passwordFirstNameError.should(
      'contain',
      'Password field cannot contain first name'
    );
  });

  it('should display display correct error when password contains last name', () => {
    signUpFormPage.lastNameField.type('Password');
    signUpFormPage.passwordField.type('Password').blur();
    signUpFormPage.passwordLastNameError.should(
      'contain',
      'Password field cannot contain last name'
    );
  });

  it('should display display correct error when password not confirmed', () => {
    signUpFormPage.passwordField.type('Password');
    signUpFormPage.confirmPasswordField.type('Wrong Password').blur();
    signUpFormPage.confirmPasswordError.should(
      'contain',
      'Password fields do not match'
    );
  });

  it('should submit form to the right url', () => {
    signUpFormPage.firstNameField.type(mockUser.firstName);
    signUpFormPage.lastNameField.type(mockUser.lastName);
    signUpFormPage.emailField.type(mockUser.email);
    signUpFormPage.passwordField.type('Password');
    signUpFormPage.confirmPasswordField.type('Password');
    signUpFormPage.submitButton.click();

    homePage.userDetails.should('contain', mockUser.firstName);
    homePage.userDetails.should('contain', mockUser.lastName);
    homePage.userDetails.should('contain', mockUser.email);
  });
});
