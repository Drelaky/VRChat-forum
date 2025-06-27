import { Component, OnInit } from '@angular/core';
import { WithDestroyObservable } from '../../../mixins/with-destroy-observable';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-redirection',
  imports: [],
  templateUrl: './redirection.html',
  styleUrl: './redirection.scss',
})
export class Redirection
  extends WithDestroyObservable(Object)
  implements OnInit
{
  code: string = '';
  accessToken: string = '';
  tokenType: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly loginService: LoginService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      if (this.code) localStorage.setItem('token', this.code);
      this.loginService.loggedIn$.next(true);
      window.self.close();
    });
  }
}
