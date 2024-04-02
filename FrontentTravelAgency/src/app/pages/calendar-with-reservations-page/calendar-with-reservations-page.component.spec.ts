import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWithReservationsPageComponent } from './calendar-with-reservations-page.component';

describe('CalendarWithReservationsPageComponent', () => {
  let component: CalendarWithReservationsPageComponent;
  let fixture: ComponentFixture<CalendarWithReservationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWithReservationsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarWithReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
