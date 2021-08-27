export class SignUpFormPage {
  public get instance() {
    return cy.get('wcc-sign-up');
  }

  public get firstNameField() {
    return cy.get('input').eq(0);
  }

  public get lastNameField() {
    return cy.get('input').eq(1);
  }

  public get emailField() {
    return cy.get('input').eq(2);
  }

  public get passwordField() {
    return cy.get('input').eq(3);
  }

  public get confirmPasswordField() {
    return cy.get('input').eq(4);
  }

  public get firstNameRequiredError() {
    return cy.dataCy('first-name-required-error');
  }

  public get lastNameRequiredError() {
    return cy.dataCy('last-name-required-error');
  }

  public get emailRequiredError() {
    return cy.dataCy('email-required-error');
  }

  public get passwordRequiredError() {
    return cy.dataCy('password-required-error');
  }

  public get passwordMinLengthError() {
    return cy.dataCy('password-min-length-error');
  }

  public get passwordPatternError() {
    return cy.dataCy('password-pattern-error');
  }

  public get passwordFirstNameError() {
    return cy.dataCy('password-first-name-error');
  }

  public get passwordLastNameError() {
    return cy.dataCy('password-last-name-error');
  }

  public get confirmPasswordError() {
    return cy.dataCy('confirm-password-error');
  }

  public get submitButton() {
    return cy.get('button[type=submit]');
  }
}
