import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FarmingCommand } from '../models/farmingCommand';
import { FarmingTools } from '../models/farmingTools';
import { Plot } from '../models/plot';
import { FarmStore } from './farm-store.service';
import { FarmService } from './farm.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
  providers: [ FarmStore ]
})
export class FarmComponent implements OnInit {

  public plots$: BehaviorSubject<Plot[]> = new BehaviorSubject([] as Plot[]);

  public selectedTool: FarmingTools = FarmingTools.eyes;

  public selectedPlot: Plot | undefined = undefined;

  public newCommand: FarmingCommand | undefined;

  constructor(public readonly farmStore: FarmStore, private farmService: FarmService) { }

  ngOnInit(): void {
    this.farmStore.plots$.subscribe(this.plots$);
    this.farmService.getPlots().subscribe(p => this.farmStore.loadPlots(p));
  }

  public selectTool($event: FarmingTools): void {
    this.selectedTool = $event;
  }

  public sendNewCommand($event: FarmingCommand): void {
    if ($event.farmingTool === FarmingTools.eyes) {
      this.selectedPlot = this.plots$.value.find(p => p.id === $event.plotIds[0]);
    } else {
      this.farmStore.applyCommand($event);
    }
  }

}
