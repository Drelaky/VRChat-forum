import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from '../../../auth/login.service';
import { finalize, map, switchMap, takeUntil } from 'rxjs';
import { ApiResponse } from '../../types/api.types';
import * as apiUser from '../../types/user.types';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { WithDestroyObservable } from '../../../mixins/with-destroy-observable';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionService } from '../../../auth/permission.service';
import { PermissionEnum } from '../../../mixins/PermissionCode';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User extends WithDestroyObservable(Object) implements OnInit {
  loadingUser: boolean = false;
  accessToken: string = '';
  tokenType: string = '';
  isOpenDropdown: boolean = false;

  get loggedInUser(): apiUser.User | undefined {
    return this.loginService.loggedInUser;
  }

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly ngxPermissionsService: NgxPermissionsService,
    private readonly permissionService: PermissionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllPermissions();
    this.getUser();
  }

  public localStorageItem(id: string): string | null {
    return localStorage.getItem(id);
  }

  logout(): void {
    this.openDropdown();
    this.loginService.logout();
  }

  getUser(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return;
    }

    this.loginService
      .getUser(accessToken, 'Bearer')
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loadingUser = true))
      )
      .subscribe({
        next: (response: ApiResponse<string, apiUser.User>) => {
          this.ngxPermissionsService.loadPermissions(
            response.result.role.permissions.map(
              (permission: { code: PermissionEnum }) => permission.code
            )
          );
          this.loginService.loggedInUser = response.result;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Unauthorized) {
            this.loginService.logout();
          }
        },
      });
  }

  @HostListener('window:storage')
  onStorageChange(): void {
    if (localStorage.getItem('token')) {
      this.login();
    }
  }

  login() {
    this.loadingUser = true;
    const token = this.localStorageItem('token');
    if (!token) {
      this.loadingUser = false;
      return;
    }
    this.loginService
      .discordAuth(token)
      .pipe(
        map((response) => {
          localStorage.removeItem('token');
          this.accessToken = response.result['access_token'];
          localStorage['access_token'] = this.accessToken;
          this.tokenType = response.result['token_type'];
          localStorage.setItem('loggedUser', 'true');
        }),
        switchMap(() => {
          const accessToken = localStorage.getItem('access_token');
          if (!accessToken) {
            throw new Error('No access token found in localStorage');
          }
          return this.loginService.getUser(accessToken, 'Bearer');
        }),
        takeUntil(this.destroy$),
        finalize(() => (this.loadingUser = false))
      )
      .subscribe({
        next: (response: ApiResponse<string, any>) => {
          this.ngxPermissionsService.loadPermissions(
            response.result.role.permissions.map(
              (permission: { code: PermissionEnum }) => permission.code
            )
          );

          this.loginService.loggedInUser = response.result;
          this.router.navigate(['/', 'forum']);
        },
      });
  }

  get user() {
    return this.loginService.loggedInUser;
  }

  discordLogin(): void {
    window.open(
      'https://discord.com/api/oauth2/authorize?client_id=962319568095821866&redirect_uri=http%3A%2F%2Flocalhost%2Fredirection&response_type=code&scope=identify%20email%20guilds',
      '',
      'width=500,height=800,left=0,top=0'
    );
  }

  getAllPermissions() {
    this.loginService
      .getAllPermissions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<string, any>) => {
          this.permissionService.permissions = response.result.map(
            (permission: { code: PermissionEnum }) => permission.code
          );
        },
      });
  }

  openDropdown(): void {
    this.isOpenDropdown = !this.isOpenDropdown;
  }
}
