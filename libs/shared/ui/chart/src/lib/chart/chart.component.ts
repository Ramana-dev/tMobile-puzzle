import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable, Subscription} from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  private dataSub: Subscription = new Subscription();
  @Input() data$: Observable<any>;
  chartData: any;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };
  constructor() {}

  ngOnInit() {
    this.chart = {
      title: '',
      type: 'LineChart',
      data: [],
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };

   this.dataSub = this.data$.subscribe(newData => {
     if (newData !== undefined || null) {
      this.chartData = newData
     }
   });
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
