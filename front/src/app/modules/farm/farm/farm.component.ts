import { Component, OnInit } from '@angular/core';
import { FarmingCommand } from '../models/farmingCommand';
import { FarmingTools } from '../models/farmingTools';
import { FarmStore } from './farm-store.service';

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

  constructor(private readonly farmStore: FarmStore) { }

  ngOnInit(): void {
  }

  public selectTool($event: FarmingTools): void {
    this.selectedTool = $event;
  }

  public sendNewCommand($event: FarmingCommand): void {
    this.newCommand = $event;
  }

}
