import { Component, Input } from '@angular/core';
import { Book } from '../books.models';

@Component({
  selector: 'app-book-authors',
  templateUrl: './book-authors.component.html',
  styleUrls: ['./book-authors.component.css']
})
export class BookAuthorsComponent {
  @Input() book: Book;

  get authors() {
    return this.book.volumeInfo.authors;
  }
}
