import { Injectable, PLATFORM_ID } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PlantInPlot } from '../models/plantInPlot';
import { Plot } from '../models/plot';

export interface FarmState {
  plots: Plot[];
}

const defaultState: FarmState = {
  plots: new Array(10).fill(null).map((_, i) => { return { id: i, isWild: true, isDry: true, growingPlant: undefined } }),
};

@Injectable()
export class FarmStore extends ComponentStore<FarmState> {

  constructor() { super(defaultState); }

  readonly plots$ = this.select(({ plots }) => plots);

  readonly loadPlots = this.updater((state, plots: Plot[] | null) => ({
    ...state,
    people: plots || [],
  }));
}
