import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsSummaryComponent } from './flight-details-summary.component';

describe('FlightDetailsSummaryComponent', () => {
  let component: FlightDetailsSummaryComponent;
  let fixture: ComponentFixture<FlightDetailsSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightDetailsSummaryComponent]
    });
    fixture = TestBed.createComponent(FlightDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
