import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { PingCheck, LatencyHistory, PingCheckIns } from '../models/ping-check.model';
import { PingCheckService } from '../ping-check.service';
import { ChartService } from '../chart.service';
import { PingCheckDialogComponent } from '../ping-check-dialog/ping-check-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DeletePingCheckDialogComponent } from '../delete-ping-check-dialog/delete-ping-check-dialog.component';
import 'chartjs-adapter-moment';
import * as moment from 'moment';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  pingChecks: PingCheck[] = [];
  selectedView: string = 'last10minutes'; // Default selected view
  @ViewChildren('canvasRef') canvasRefs!: QueryList<ElementRef<HTMLCanvasElement>>;
  @ViewChildren('canvasRef', { read: ElementRef }) canvasRefsArray!: QueryList<ElementRef<HTMLCanvasElement>>;
  chartInstances: any[] = [];
  dialogRef!: MatDialogRef<any>;


  constructor(private pingCheckService: PingCheckService, private chartService: ChartService, private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pingCheckService.getPingChecks().subscribe(
      (res: any) => {
        this.pingChecks = res.pingChecks;
        console.log(this.pingChecks.length);
      },
      error => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.generateCharts();
    }, 250);
  }

  generateCharts(): void {
    this.canvasRefsArray.forEach((canvasRef, index) => {
      const canvas = canvasRef.nativeElement;
      const pingCheck = this.pingChecks[index];
  
      if (canvas) {
        const latencyHistory = this.filterLatencyHistoryByView(pingCheck.latencyHistory);
        const latencyData = latencyHistory.map(latency => (latency.latency === 99999 ? null : latency.latency));
        const checkedAtData = latencyHistory.map(latency => moment(latency.checkedAt).toDate());
  
        const chartData = {
          type: 'line',
          data: {
            labels: checkedAtData,
            datasets: [{
              label: 'Latency',
              data: latencyData,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              fill: true,
              spanGaps: true
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'second',
                  displayFormats: {
                    second: 'HH:mm:ss'
                  }
                }
              },
              y: {
                beginAtZero: true
              }
            }
          }
        };
  
        // Destroy existing chart if it exists
        const existingChart = this.chartService.getChart(canvas);
        if (existingChart) {
          existingChart.destroy();
        }
  
        this.chartService.generateChart(canvas, chartData);
      }
    });
  }  

  ngOnDestroy(): void {
    // Distruggi tutti i grafici prima di uscire dal componente
    this.chartInstances.forEach(chart => {
      if (chart) {
        chart.destroy();
      }
    });
  }


  filterLatencyHistoryByView(latencyHistory: LatencyHistory[]): LatencyHistory[] {
    const now = moment();
    let startDate: moment.Moment;

    switch (this.selectedView) {
      case 'last10minutes':
        startDate = now.clone().subtract(10, 'minutes');
        break;
      case 'lastday':
startDate = now.clone().subtract(1, 'day');
break;
case 'lastweek':
startDate = now.clone().subtract(1, 'week');
break;
case 'alltime':
startDate = moment.min(latencyHistory.map(latency => moment(latency.checkedAt)));
break;
default:
startDate = now.clone().subtract(10, 'minutes');
}
return latencyHistory.filter(latency => moment(latency.checkedAt).isAfter(startDate));
}

addPingCheck(): void {
  this.openDialog();
}

openDialog(): void {
  const dialogRef = this.dialog.open(PingCheckDialogComponent, {
    width: '400px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const newPingCheck: PingCheckIns = {
        ipAddress: result.ipAddress,
        interval: result.interval
      };

      this.pingCheckService.createPingCheck(newPingCheck).subscribe(
        (res: any) => {
          this.pingChecks.push(res.pingCheck);
        },
        error => {
          console.error(error);
        }
      );
    }
  });
}

openDeleteDialog(pingCheckId: string): void {
  const dialogRef = this.dialog.open(DeletePingCheckDialogComponent, {
    width: '400px',
    data: pingCheckId,
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'delete') {
      this.deletePingCheck(pingCheckId);
    }
  });
}

deletePingCheck(pingCheckId: string): void {
  this.pingCheckService.deletePingCheck(pingCheckId).subscribe(
    () => {
      // Rimuovi il ping check dalla lista pingChecks
      this.pingChecks = this.pingChecks.filter(pingCheck => pingCheck._id !== pingCheckId);
    },
    error => {
      console.error(error);
    }
  );
}




}

