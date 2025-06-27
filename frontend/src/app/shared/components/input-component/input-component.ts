import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { InputErrorComponent } from '../input-error-component/input-error-component';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { WithDestroyObservable } from '../../../mixins/with-destroy-observable';

@Component({
  selector: 'app-input',
  imports: [FontAwesomeModule, ReactiveFormsModule, InputErrorComponent],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss',
})
export class InputComponent
  extends WithDestroyObservable(Object)
  implements OnInit
{
  @Input({ required: true }) placeholder: string = '';
  @Input() icon: IconDefinition | null = null;
  @Input() type: string = 'text';
  @Input({ required: true }) control!: FormControl<unknown>;

  inputErrors: string[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.inputErrors = Object.keys(this.control.errors || {});

    this.control.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.inputErrors = Object.keys(this.control.errors || {});
      });
  }
}
