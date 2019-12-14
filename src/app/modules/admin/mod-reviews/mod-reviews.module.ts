import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModReviewsComponent } from './mod-reviews/mod-reviews.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [ModReviewsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ModReviewsModule { }
