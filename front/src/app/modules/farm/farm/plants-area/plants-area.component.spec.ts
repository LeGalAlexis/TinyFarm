import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsAreaComponent } from './plants-area.component';

describe('PlantsAreaComponent', () => {
  let component: PlantsAreaComponent;
  let fixture: ComponentFixture<PlantsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
