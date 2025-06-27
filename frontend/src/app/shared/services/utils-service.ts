import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: InjectionToken<object>
  ) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  customEmailValidator(control: AbstractControl) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(control.value) ? null : { INVALID_EMAIL: true };
  }
}
