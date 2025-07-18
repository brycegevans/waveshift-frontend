import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionStatement } from './mission-statement';

describe('MissionStatement', () => {
  let component: MissionStatement;
  let fixture: ComponentFixture<MissionStatement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionStatement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionStatement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
