import { Component, Input, OnInit } from '@angular/core';
import { Plot } from '../../models/plot';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})
export class PlantDetailsComponent implements OnInit {

  @Input()
  public plot: Plot | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
