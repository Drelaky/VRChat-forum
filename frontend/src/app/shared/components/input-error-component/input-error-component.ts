import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-input-error-component',
  imports: [TranslocoPipe],
  templateUrl: './input-error-component.html',
  styleUrl: './input-error-component.scss',
})
export class InputErrorComponent {
  @Input() set errors(value: ValidationErrors | null | undefined) {
    this.errorNames = Object.values(value || {}).map((error) =>
      error.toLocaleUpperCase()
    );
  }
  errorNames: string[] = [];
}
