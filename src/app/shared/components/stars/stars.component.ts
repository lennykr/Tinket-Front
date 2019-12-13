import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
  
  @Input() vraag: string;
  @Input() rating: number;
  @Output() starClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.starClick.emit({
      rating: rating
    });
  }
}