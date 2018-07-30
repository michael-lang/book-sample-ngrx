import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
}
