import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Book } from '../books.models';
import { collectionActions } from './collection.store';
import { ofAction } from 'src/lib/effects';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('books_app');
  });

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofAction(collectionActions.load),
    switchMap(() =>
      this.db.query('books').pipe(
        toArray(),
        map((books: Book[]) => collectionActions.create(collectionActions.loadSuccess, books)),
        catchError(error => of(collectionActions.create(collectionActions.loadFail, error)))
      )
    )
  );

  @Effect()
  addBookToCollection$: Observable<Action> = this.actions$.pipe(
    ofAction(collectionActions.addBook),
    mergeMap(book =>
      this.db.insert('books', [book]).pipe(
        map(() => collectionActions.create(collectionActions.addBookSuccess, book)),
        catchError(() => of(collectionActions.create(collectionActions.addBookFail, book)))
      )
    )
  );

  @Effect()
  removeBookFromCollection$: Observable<Action> = this.actions$.pipe(
    ofAction(collectionActions.removeBook),
    mergeMap(book =>
      this.db.executeWrite('books', 'delete', [book.id]).pipe(
        map(() => collectionActions.create(collectionActions.removeBookSuccess, book)),
        catchError(() => of(collectionActions.create(collectionActions.removeBookFail, book)))
      )
    )
  );

  constructor(private actions$: Actions, private db: Database) {}
}
