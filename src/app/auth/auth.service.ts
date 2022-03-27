import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface UsernameAvailableResponse {
  available: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private emailApiUrl: string = "https://api.angular-email.com";

  constructor(private httpClient: HttpClient) { }

  usernameAvailable(username: string) {

    return this.httpClient.post<UsernameAvailableResponse>(
      `${this.emailApiUrl}/auth/username`,
      {
          username
      });
  }
}
