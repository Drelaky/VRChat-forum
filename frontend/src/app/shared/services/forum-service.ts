import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainCategory } from '../types/mainCategory.types';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  isSearchPage: WritableSignal<boolean> = signal(false);
  isQestionDetailPage: WritableSignal<boolean> = signal(false);

  CurrentMainCategory: BehaviorSubject<MainCategory | null> =
    new BehaviorSubject<MainCategory | null>(null);
  CurrentAltCategory: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
}
