import { Injectable, PLATFORM_ID } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap, withLatestFrom } from 'rxjs';
import { FarmingCommand } from '../models/farmingCommand';
import { Plot } from '../models/plot';
import { FarmService } from './farm.service';

export interface FarmState {
  plots: Plot[];
}

const defaultState: FarmState = {
  plots: [],
};

@Injectable()
export class FarmStore extends ComponentStore<FarmState> {

  constructor(private farmService: FarmService) { super(defaultState); }

  readonly plots$ = this.select(({ plots }) => plots);

  readonly loadPlots = this.updater((state, plots: Plot[] | null) => ({
    ...state,
    plots: plots || [],
  }));

  readonly applyCommand = this.effect((command$: Observable<FarmingCommand>) => 
    command$.pipe(
      withLatestFrom(this.plots$),
      tap<[FarmingCommand, Plot[]]>(([command, plots]) => {
        let newPlots = this.farmService.applyCommand(plots, command);
        this.loadPlots(newPlots);
      })
    )
  );
}
