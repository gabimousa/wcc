import { Observable, of } from 'rxjs';

export class SignUpMockService {
  public signUp(data: any): Observable<any> {
    return of(null);
  }
}
