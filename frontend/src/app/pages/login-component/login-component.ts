import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../shared/components/input-component/input-component';
import { faEnvelope, faLock } from '@fortawesome/pro-regular-svg-icons';
import { TranslocoPipe } from '@jsverse/transloco';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../shared/services/utils-service';

@Component({
  selector: 'app-login-component',
  imports: [InputComponent, TranslocoPipe],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent implements OnInit {
  iconEmail = faEnvelope;
  iconPassword = faLock;

  loginForm!: ReturnType<typeof this.generateForm>;

  constructor(
    private readonly router: Router,
    private readonly utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.generateForm();
  }

  generateForm() {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        this.utilsService.customEmailValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login(): void {
    this.router.navigate(['/']);
  }
}
