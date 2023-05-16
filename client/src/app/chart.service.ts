import { Injectable } from '@angular/core';
import Chart, { ChartTypeRegistry, Point, BubbleDataPoint } from 'chart.js/auto';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }

  generateChart(canvas: HTMLCanvasElement, chartData: any): void {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx, chartData);
    }
  }

  getChart(canvas: HTMLCanvasElement): Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | null {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const chart = Chart.getChart(ctx);
      return chart ? chart : null;
    }
    return null;
  }
}
