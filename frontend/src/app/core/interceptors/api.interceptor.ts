import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from '../../shared/services/utils-service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const utils = inject(UtilsService);
  const router = inject(Router);
  const apiUrl = utils.isBrowser()
    ? 'http://localhost:3000/api'
    : 'http://localhost:3000/api';

  if (!req.url.startsWith('http') && !req.url.startsWith('/assets/')) {
    req = req.clone({
      url: `${apiUrl}/${req.url}`,
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/']);
      }
      return throwError(() => error);
    })
  );
};
