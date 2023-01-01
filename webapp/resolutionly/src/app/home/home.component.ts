import { Component, OnInit } from '@angular/core';
// import {ChartType} from 'chart.js';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [  'Goals Set', 'Goals Achieved' ];
  public pieChartDatasets = [ {
    data: [ 2, 8 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Sept', 'oct', 'Nov', 'Dec' ],
    datasets: [
      { data: [ 65, 59, 80, 81 ], label: 'Positive Sentiment' },
      { data: [ 28, 48, 40, 19], label: 'Negative Sentiment' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  constructor() { }

  // public pieChartOptions: ChartOptions<'pie'> = {
  //   responsive: false,
  // };
  // public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  // public pieChartDatasets = [ {
  //   data: [ 300, 500, 100 ]
  // } ];
  // public pieChartLegend = true;
  // public pieChartPlugins = [];


  ngOnInit(): void {
  }

}
