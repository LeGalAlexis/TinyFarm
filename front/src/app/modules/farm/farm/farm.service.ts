import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FarmingCommand } from '../models/farmingCommand';
import { FarmingTools } from '../models/farmingTools';
import { Plot } from '../models/plot';
import { FarmStore } from './farm-store.service';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor() { }

  public getPlots(): Observable<Plot[]> {
    let plots = new Array(25).fill(null).map((_, i) => { return { id: i, isWild: true, isDry: true, growingPlant: undefined } });
    return of(plots);
  }

  public applyCommand(plots: Plot[], command: FarmingCommand): Plot[] {
    switch(command.farmingTool) {
      case FarmingTools.hoe:
        plots = this.plow(plots, command.plotIds);
        break;
      case FarmingTools.watering:
        plots = this.water(plots, command.plotIds);
        break;
    }  
    return plots;
  }

  water(plots: Plot[], plotIds: number[]): Plot[] {
    plots.forEach(p => {
      if (plotIds.includes(p.id)) {
        p.isDry = false;
      }
    })
    return plots;
  }

  plow(plots: Plot[], plotIds: number[]): Plot[] {
    plots.forEach(p => {
      if (plotIds.includes(p.id)) {
        p.isWild = false;
      }
    })
    return plots;
  }
}
