import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LocalizedDatePipe } from '../../pipes/localized-date-pipe';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-event',
  imports: [LocalizedDatePipe, DatePipe, TranslocoPipe],
  templateUrl: './event.html',
  styleUrl: './event.scss',
})
export class Event {
  events = [
    {
      title: 'DJ event',
      description: 'Gyere csatlakozz egy jó buliba!',
      date: new Date(),
    },
    {
      title: 'DJ event',
      description: 'Gyere csatlakozz egy jó buliba!',
      date: new Date(),
    },
    {
      title: 'DJ event',
      description: 'Gyere csatlakozz egy jó buliba!',
      date: new Date(),
    },
    {
      title: 'DJ event',
      description: 'Gyere csatlakozz egy jó buliba!',
      date: new Date(),
    },
  ];
}
