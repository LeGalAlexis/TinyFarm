import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Plot } from '../../models/plot';

@Component({
  selector: 'app-plants-area',
  templateUrl: './plants-area.component.html',
  styleUrls: ['./plants-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantsAreaComponent implements OnInit {

  @Input()
  public plots: Plot[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

  public getSquareStateClass(plot: Plot): string {
    if (plot.isWild) { return 'wildPlot' }
    if (plot.growingPlant !== undefined) { return 'withPlant'}
    if (plot.isDry) { return 'dryPlot' }
    return 'wateredPlot';
  }
}
