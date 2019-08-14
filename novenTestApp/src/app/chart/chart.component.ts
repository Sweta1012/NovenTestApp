import { Component,  Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  usersGraph:any;
	seriesData = [];
	@Input() TodoGraphData;
	flag = false;
	@ViewChild('chartTarget', {}) chartTarget: ElementRef;

  constructor() { }

  ngOnChanges(simpleChanges){
		if(this.flag){
			this.TodoGraphData = simpleChanges.TodoGraphData.currentValue;
			this.getGraphData();
		}
	}

  ngOnInit() {
    this.flag = true;
		this.getGraphData();
  }
  getGraphData(){
		this.usersGraph = {
			chart: {
				type: 'bar'
			},
			title: {
				text: 'User Todo List'
			},
			xAxis: {
				categories: ['Completed', 'Pending'],
				crosshair: true
			},
			yAxis: {
				title: {
					text: 'Todo List Summary'
				}
			},
			plotOptions: {
				column: {
					pointPadding: 0.4,
					dataLabels: {
						enabled: true,
						format: '<b>{point.y}</b>'
					}

				},
				bar: {
					pointPadding: 0.3,
					groupPadding: 0.2,
					dataLabels: {
						enabled: true,
						format: '<b>{point.y}</b>',
						allowOverlap:false
					}
				},
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '{point.name}: <b>{point.y}</b>'
					}
				},
				line: {
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.y:.2f} ',
					}
				}
			},
			series: this.TodoGraphData
		};
		chart(this.chartTarget.nativeElement, this.usersGraph);
	} 

}
