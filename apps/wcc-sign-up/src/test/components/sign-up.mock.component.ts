import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wcc-sign-up',
  template: `SIGNUP-COMPONENT`,
})
export class SignUpMockComponent {
  @Output()
  public signedUp = new EventEmitter<unknown>();
}
