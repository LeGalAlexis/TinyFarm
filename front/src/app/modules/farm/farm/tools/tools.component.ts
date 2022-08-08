import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FarmingTools } from '../../models/farmingTools';
import { Seed } from '../../models/seed';
import { FarmStore } from '../farm-store.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @Input()
  public selectedTool: FarmingTools = FarmingTools.eyes;

  @Output()
  public selectedToolChange = new EventEmitter<FarmingTools>;

  public FarmingTools = FarmingTools;

  public seeds: Seed[] = [
    {id: 0, name: "graine 1", plant: { id: 0, name: "plante 1", needWater: false, growthTime: 10 }},
    {id: 1, name: "graine 2", plant: { id: 1, name: "plante 2", needWater: true, growthTime: 30 }}
  ]

  public selectedSeed: Seed | undefined;

  constructor(private farmStore: FarmStore) {
   }

  ngOnInit(): void {
    this.selectedSeed = this.seeds[0]
  }

  public selectTool(tool: FarmingTools): void {
    this.selectedToolChange.emit(tool);
  }

  public onSelectedSeedChange($event: number): void {
    this.farmStore.updateSeed(this.seeds.find(s => s.id === $event));
  }

}
