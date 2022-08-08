import { state } from '@angular/animations';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap, withLatestFrom } from 'rxjs';
import { FarmingCommand } from '../models/farmingCommand';
import { Plot } from '../models/plot';
import { Seed } from '../models/seed';
import { FarmService } from './farm.service';

export interface FarmState {
  plots: Plot[];
  seed: Seed | undefined;
}

const defaultState: FarmState = {
  plots: [],
  seed: undefined
};

@Injectable()
export class FarmStore extends ComponentStore<FarmState> {

  constructor(private farmService: FarmService) { super(defaultState); }

  readonly plots$ = this.select(({ plots }) => plots);
  readonly seed$ = this.select(({ seed }) => seed);

  readonly loadPlots = this.updater((state, plots: Plot[] | null) => ({
    ...state,
    plots: plots || [],
  }));

  readonly updateSeed = this.updater((state, seed: Seed | undefined) => ({
    ...state,
    seed: seed
  }));

  readonly applyCommand = this.effect((command$: Observable<FarmingCommand>) => 
    command$.pipe(
      withLatestFrom(this.plots$, this.seed$),
      tap<[FarmingCommand, Plot[], Seed | undefined]>(([command, plots, seed]) => {
        let newPlots = this.farmService.applyCommand(plots, command, seed);
        this.loadPlots([ ...newPlots]);
      })
    )
  );
}
