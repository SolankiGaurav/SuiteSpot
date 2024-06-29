import { Component, Input } from '@angular/core';
import { IStatistics } from '@suiteportal/api-interfaces';

@Component({
  selector: 'statistics-component',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  @Input('statsData') statsData: IStatistics[];

  displayedColumns: string[] = ['serviceType', 'closedCount', 'openCount'];

  constructor() {}
}
