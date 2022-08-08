import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FarmingCommand } from '../../models/farmingCommand';
import { FarmingTools } from '../../models/farmingTools';
import { Plot } from '../../models/plot';

export interface SelectablePlot {
  id: number;
  isSelected: boolean;
  isError: boolean;
}

@Component({
  selector: 'app-plants-area',
  templateUrl: './plants-area.component.html',
  styleUrls: ['./plants-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantsAreaComponent implements OnInit {

  public _plots: Plot[] | null = [];

  @Input() set plots(value: Plot[] | null) {
    this._plots = value;
    this.selectedPlots = new Array(value?.length).fill(null).map((_, i) => { return { id: i, isSelected: false, isError: false } })
  }

  @Input()
  public selectedTool: FarmingTools = FarmingTools.eyes;

  public selectedPlots: SelectablePlot[] = [];

  @Output()
  public newCommand = new EventEmitter<FarmingCommand>();

  private debounceTimeout: any;

  constructor() { }

  ngOnInit(): void {
  }

  public getSquareStateClass(plot: Plot): string {
    if (plot.isWild) { return 'wildPlot' }
    if (plot.growingPlant !== undefined) { return 'withPlant'}
    if (plot.isDry) { return 'dryPlot' }
    return 'wateredPlot';
  }

  public getRowStart(start: number): string {
    return (start % 5).toString()
  }

  public getRowEnd(end: number): string {
    return ((end % 5) +1).toString()
  }

  public getColumnStart(start: number): string {
    return (Math.floor(start / 5) + 1).toString()
  }

  public getColumnEnd(end: number): string {
    return (Math.floor(end / 5) + 2).toString()
  }

  public selectSquare(plot: SelectablePlot): void {
    if (this.selectedTool === FarmingTools.eyes) {
      this.newCommand.emit({
        farmingTool: FarmingTools.eyes,
        plotIds: [plot.id]
      })
    } else if (this.canSelect(this._plots!.find(p => p.id === plot.id)!)) {
      let selectedPlot = this.selectedPlots.find(p => p.id === plot.id);
      if(selectedPlot) {
        selectedPlot.isSelected = !selectedPlot.isSelected;
      }
      clearTimeout(this.debounceTimeout),
      this.debounceTimeout = setTimeout(() => {
        let plotsToSend = this.selectedPlots.filter(p => p.isSelected);
        if(plotsToSend.length > 0) {
          this.newCommand.emit({
            farmingTool: this.selectedTool,
            plotIds: plotsToSend.map(p => p.id)
          });
          this.selectedPlots.forEach(p => p.isSelected = false);
        }
        clearTimeout(this.debounceTimeout);
      }, 1000);
    }
  }

  private canSelect(plot: Plot) {
    switch(this.selectedTool) {
      case FarmingTools.eyes :
        return false;
      case FarmingTools.hoe :
        return plot.isWild;
      case FarmingTools.watering :
        return !plot.isWild && plot.isDry;
      default :
        throw new Error("No tools detected");
    }
  }
}
