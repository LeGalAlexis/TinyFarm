import { Component, OnInit } from '@angular/core';
import { FarmStore } from './farm-store.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
  providers: [ FarmStore ]
})
export class FarmComponent implements OnInit {

  public plots$ = this.farmStore.plots$;

  constructor(private readonly farmStore: FarmStore) { }

  ngOnInit(): void {
  }

}
