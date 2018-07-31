import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindBookPageComponent } from './find-book-page/find-book-page.component';
import { ViewBookPageComponent } from './view-book-page/view-book-page.component';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { BookExistsGuard } from './book-exists.guard';

export const routes: Routes = [
  { path: 'find', component: FindBookPageComponent },
  {
    path: ':id',
    component: ViewBookPageComponent,
    canActivate: [BookExistsGuard],
  },
  { path: '', component: CollectionPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
