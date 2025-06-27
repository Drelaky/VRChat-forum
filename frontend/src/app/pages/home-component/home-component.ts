import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
import { TranslocoPipe } from '@jsverse/transloco';
import { WithDestroyObservable } from '../../mixins/with-destroy-observable';
import { InputComponent } from '../../shared/components/input-component/input-component';
import { Topics } from '../topics/topics';

@Component({
  selector: 'app-home-component',
  imports: [InputComponent, TranslocoPipe, Topics],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent extends WithDestroyObservable(Object) {
  iconSearch = faMagnifyingGlass;

  searchControl: FormControl<string> = new FormControl('', {
    nonNullable: true,
  });

  constructor(private readonly router: Router) {
    super();
  }

  searchForum(): void {
    if (!this.searchControl.value && this.searchControl.value === '') {
      this.router.navigate(['/', 'forum', 'search']);
    }
  }
}
