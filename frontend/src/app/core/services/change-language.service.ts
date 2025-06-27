import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeLanguageService {
  currentAllowedLangs = [
    {
      lang: 'en',
      name: 'English',
    },
    {
      lang: 'hu',
      name: 'Magyar',
    },
    {
      lang: 'de',
      name: 'Deutsch',
    },
  ];
}
