import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import {
  provideTransloco,
  Translation,
  TranslocoService,
} from '@jsverse/transloco';
import { NgxPermissionsModule } from 'ngx-permissions';
import { firstValueFrom, tap } from 'rxjs';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';

export function initTransloco(): Promise<Translation> {
  const transloco = inject(TranslocoService);
  const savedLocale = localStorage.getItem('localization');
  const locale = savedLocale || navigator.language.split('-')[0] || 'en';

  if (!savedLocale) {
    localStorage.setItem('localization', locale);
  }

  return firstValueFrom(
    transloco.load(locale).pipe(
      tap(() => {
        transloco.setActiveLang(locale);
      })
    )
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'hu', 'de'],
        defaultLang: 'hu',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(initTransloco),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
  ],
};
