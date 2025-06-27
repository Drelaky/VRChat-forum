import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private readonly _isInited$ = new BehaviorSubject<boolean>(false);
  readonly isInited$ = this._isInited$.asObservable();

  readonly #config$ = new BehaviorSubject<any>({});
  readonly config$ = this.#config$.asObservable();

  constructor(private readonly http: HttpClient) {}

  public init$(): Observable<unknown> {
    return this.http.get('').pipe(
      tap((configs) => {
        this.#config$.next(configs);
        this._isInited$.next(true);
      })
    );
  }
}
