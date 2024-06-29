import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared.module';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
   ],
  declarations: [AdminComponent,StatisticsComponent],
  exports: [AdminComponent]
})
export class AdminModule {}
