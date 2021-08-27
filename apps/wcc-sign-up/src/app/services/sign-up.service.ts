import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SignUpModel, SignUpResultModel } from '../sign-up';

@Injectable({ providedIn: 'root' })
export class SignUpService {
  constructor(private readonly httpClient: HttpClient) {}

  public signUp(data: SignUpModel): Observable<SignUpResultModel | null> {
    return this.httpClient
      .post<SignUpResultModel>('https://demo-api.now.sh/users', data)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of(null);
        })
      );
  }
}
