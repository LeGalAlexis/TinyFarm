import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FarmingTools } from '../../models/farmingTools';

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

  constructor() { }

  ngOnInit(): void {
  }

  public selectTool(tool: FarmingTools): void {
    this.selectedToolChange.emit(tool);
  }

}
