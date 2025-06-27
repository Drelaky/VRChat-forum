import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  isMainPage: WritableSignal<boolean> = signal(false);
}
