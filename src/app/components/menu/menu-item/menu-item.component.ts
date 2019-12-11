import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent implements OnInit {
  @Input() routerLink: String;
  @Input() icon: String;
  @Input() label: String;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
