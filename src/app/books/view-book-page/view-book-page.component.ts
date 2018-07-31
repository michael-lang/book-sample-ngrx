import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookFeatureAppState, bookActions } from '../store/book.store';

@Component({
  selector: 'app-view-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-book-page.component.html'
})
export class ViewBookPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<BookFeatureAppState>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => bookActions.create(bookActions.select, params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
