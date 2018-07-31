import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { GoogleBooksService } from '../../core/services/google-books.service';
import { Scheduler } from 'rxjs/internal/Scheduler';
import { bookActions } from './book.store';
import { ofAction } from 'src/lib/effects';
import { Book } from '../books.models';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class BookEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofAction(bookActions.search),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.pipe(
        ofAction(bookActions.search),
        skip(1)
      );

      return this.googleBooks.searchBooks(query).pipe(
        takeUntil(nextSearch$),
        map((books: Book[]) => bookActions.create(bookActions.searchComplete, books)),
        catchError(err => of(bookActions.create(bookActions.searchError, err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private googleBooks: GoogleBooksService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    /**
     * You inject an optional Scheduler that will be undefined
     * in normal application usage, but its injected here so that you can mock out
     * during testing using the RxJS TestScheduler for simulating passages of time.
     */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
