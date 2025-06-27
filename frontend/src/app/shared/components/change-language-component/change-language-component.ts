import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleUp } from '@fortawesome/pro-regular-svg-icons';
import { TranslocoService } from '@jsverse/transloco';
import { ChangeLanguageService } from '../../../core/services/change-language.service';

@Component({
  selector: 'app-change-language-component',
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './change-language-component.html',
  styleUrl: './change-language-component.scss',
})
export class ChangeLanguageComponent {
  langs!: { lang: string; name: string }[];
  currentLang!: { lang: string; name: string };
  dropdown: boolean = false;
  faAngleUp = faAngleUp;

  constructor(
    private readonly changeLanguageService: ChangeLanguageService,
    private readonly translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.langs = this.changeLanguageService.currentAllowedLangs;

    this.currentLang =
      this.changeLanguageService.currentAllowedLangs.find((obj) => {
        return obj.lang === localStorage.getItem('localization');
      }) || this.changeLanguageService.currentAllowedLangs[0];
  }

  openDropdown(): void {
    this.dropdown = !this.dropdown;
  }

  changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('localization', lang);
    this.currentLang =
      this.changeLanguageService.currentAllowedLangs.find((obj) => {
        return obj.lang === lang;
      }) || this.changeLanguageService.currentAllowedLangs[0];

    this.openDropdown();
  }
}
