import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smartDate',
})
export class SmartDatePipe implements PipeTransform {
  transform(value: Date | string | number): string {
    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffYears = now.getFullYear() - date.getFullYear();

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }

    if (diffDays < 7) {
      return this.formatWeekdayTime(date);
    }

    if (diffYears < 1) {
      return this.formatMonthDay(date);
    }

    return this.formatFullDate(date);
  }

  private formatWeekdayTime(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }

  private formatMonthDay(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  private formatFullDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }
}
