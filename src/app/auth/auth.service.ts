import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupCredentials {
  username: string,
  password: string,
  passwordConfirmation: string
}

interface SignupResponse {
  username: string
}

interface SignedinResponse {
  username: string,
  authenticated: boolean
}

interface SigninCredentials {
  username: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private emailApiUrl: string = "https://api.angular-email.com";
  signedin$ = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  usernameAvailable(username: string) {
    return this.httpClient.post<UsernameAvailableResponse>(
      `${this.emailApiUrl}/auth/username`,
      {
          username
      });
  }

  signup(credentials: SignupCredentials) {
    return this.httpClient.post<SignupResponse>(
      `${this.emailApiUrl}/auth/signup`,
      credentials
    ).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

  checkAuth() {
    return this.httpClient.get<SignedinResponse>(`${this.emailApiUrl}/auth/signedin`)
      .pipe(
        tap(({authenticated}) => {
          this.signedin$.next(authenticated);
        })
      )
  }

  signout() {
    return this.httpClient.post(`${this.emailApiUrl}/auth/signout`, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      )
  }

  signin(credentials: SigninCredentials) {
    return this.httpClient.post(`${this.emailApiUrl}/auth/signin`, credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      )
  }
}
