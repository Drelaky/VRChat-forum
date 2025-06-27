import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { InputComponent } from '../../shared/components/input-component/input-component';
import { faEnvelope, faLock } from '@fortawesome/pro-regular-svg-icons';
import { UtilsService } from '../../shared/services/utils-service';

@Component({
  selector: 'app-register-component',
  imports: [InputComponent, TranslocoPipe, ReactiveFormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent implements OnInit {
  iconEmail = faEnvelope;
  iconPassword = faLock;
  registerForm!: ReturnType<typeof this.generateForm>;

  constructor(private readonly utilsService: UtilsService) {}

  ngOnInit(): void {
    this.registerForm = this.generateForm();
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
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  register(): void {
    // Registration logic goes here
    console.log(this.registerForm.value);
  }
}
