import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FarmingCommand } from '../models/farmingCommand';
import { FarmingTools } from '../models/farmingTools';
import { FarmStore } from './farm-store.service';
import { FarmService } from './farm.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
  providers: [ FarmStore ]
})
export class FarmComponent implements OnInit {

  public plots$ = this.farmStore.plots$;

  public selectedTool: FarmingTools = FarmingTools.eyes;

  public newCommand: FarmingCommand | undefined;

  constructor(public readonly farmStore: FarmStore, private farmService: FarmService) { }

  ngOnInit(): void {
    this.farmService.getPlots().subscribe(p => this.farmStore.loadPlots(p));
  }

  public selectTool($event: FarmingTools): void {
    this.selectedTool = $event;
  }

  public sendNewCommand($event: FarmingCommand): void {
    this.farmStore.applyCommand($event);
  }

}
