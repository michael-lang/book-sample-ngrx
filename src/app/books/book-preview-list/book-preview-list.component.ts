import { Component, Input } from '@angular/core';
import { Book } from '../books.models';

@Component({
  selector: 'app-book-preview-list',
  templateUrl: './book-preview-list.component.html',
  styleUrls: ['./book-preview-list.component.css']
})
export class BookPreviewListComponent {
  @Input() books: Book[];
}
