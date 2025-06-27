import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from '../shared/types/api.types';
import { DiscordUser } from '../shared/types/discordUser.types';
import { User } from '../shared/types/user.types';
import { PermissionEnum } from '../mixins/PermissionCode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedIn$: Subject<boolean> = new Subject<boolean>();
  loggedInUser!: User | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  getUser(
    access_token: string,
    token_type: string
  ): Observable<ApiResponse<string, User>> {
    let headers = new HttpHeaders();
    headers = headers
      .append('key', `${access_token}`)
      .append('key2', token_type);

    return this.http.post<ApiResponse<string, User>>(
      `auth/getUser`,
      {
        access_token,
        token_type,
      },
      { headers: headers }
    );
  }

  discordAuth(code: string): Observable<ApiResponse<string, any>> {
    return this.http.post<ApiResponse<string, any>>(`auth/discordAuth`, {
      code,
    });
  }

  getAllPermissions(): Observable<ApiResponse<string, PermissionEnum[]>> {
    return this.http.get<ApiResponse<string, PermissionEnum[]>>(
      'permission/getPermissions'
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('loggedUser');
    this.loggedInUser = undefined;
    this.router.navigate(['/']);
  }
}
