import { Component, OnInit } from '@angular/core';
// import {ChartType} from 'chart.js';
import { ChartOptions } from 'chart.js';
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
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

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
