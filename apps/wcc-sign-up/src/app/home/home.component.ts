import { Component, HostBinding } from '@angular/core';
import { SignUpResultModel } from '../sign-up';

@Component({
  selector: 'wcc-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  /** user that has been signed up */
  public user: SignUpResultModel | null;

  /** class name set on the host element */
  @HostBinding('class')
  private readonly className = 'wcc-home';

  /** constructor of the home component */
  constructor() {
    this.user = null;
  }

  /**
   * event handler for when the sign up completes
   * @param value result from the sign up component
   */
  public onSignedUp(value: SignUpResultModel) {
    this.user = value;
  }
}
