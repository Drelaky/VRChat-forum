import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { formatDate } from '@angular/common';

@Pipe({ name: 'localizedDate', standalone: true, pure: false })
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(value: Date | string | number, format: string = 'LLL'): string {
    const lang = this.translocoService.getActiveLang();
    return formatDate(value, format, lang);
  }
}
