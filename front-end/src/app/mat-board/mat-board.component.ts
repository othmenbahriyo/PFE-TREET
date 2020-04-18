import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartDataSets, ChartOptions, ChartType , RadialChartOptions } from 'chart.js';
import { Color ,  SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { KafkaService } from '../shared/kafka.service';


@Component({
  selector: 'app-mat-board',
  templateUrl: './mat-board.component.html',
  styleUrls: ['./mat-board.component.css']
})
export class MatBoardComponent implements OnInit, OnDestroy {
  messages = '' ;
  connection;
  message = this.messages.split(' ').map(Number);
  // tslint:disable-next-line:ban-types
  options: object;
  @ViewChild('chartVar') refObj: any;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['nb p v'], ['nb p p'], '[nb p p c]', ['nb p p p'], 'nb p p n' ];
  public pieChartData: SingleDataSet = [10, 20, 20, 12, 17, 21];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Punctuality', 'Communication', 'Problem Solving',
    'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];

  public radarChartData: ChartDataSets[] = [
    { data: [0, 1, 2, 3, 4, 5, 6], label: 'Employee Skill Analysis' }
  ];
  public radarChartType: ChartType = 'radar';



  LineChart = [];
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'nb de voiture/moi' },
  ];

  lineChartLabels: Label[] = this.messages.split(' ');

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType  = 'line';

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['lundi', 'mardi', 'merc', 'jeudi', 'vend', 'samedi',
   'dim', 'lundi', 'mardi', 'merc', 'jeudi', 'vend'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.message , label: 'nb voiture / jours' }
  ];
  constructor(private breakpointObserver: BreakpointObserver, private chatService: KafkaService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


  ngOnInit() {
    this.chatService.getromKaf(40).subscribe( res => {
      this.messages = res;
      console.log(this.messages);
      console.log(this.messages.split(' ').map(Number));
    },
    error => {
      console.log(error);
    }
    );
  }
  ngOnDestroy() {
  }

}
