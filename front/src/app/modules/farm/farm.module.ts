import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmRoutingModule } from './farm-routing.module';
import { PlantsAreaComponent } from './farm/plants-area/plants-area.component';
import { FarmComponent } from './farm/farm.component';
import { ToolsComponent } from './farm/tools/tools.component';
import { PlantDetailsComponent } from './farm/plant-details/plant-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlantsAreaComponent,
    FarmComponent,
    ToolsComponent,
    PlantDetailsComponent
  ],
  imports: [
    CommonModule,
    FarmRoutingModule,
    NgSelectModule, 
    FormsModule
  ]
})
export class FarmModule { }
