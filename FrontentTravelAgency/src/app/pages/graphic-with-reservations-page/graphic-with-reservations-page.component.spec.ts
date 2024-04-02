import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicWithReservationsPageComponent } from './graphic-with-reservations-page.component';

describe('GraphicWithReservationsPageComponent', () => {
  let component: GraphicWithReservationsPageComponent;
  let fixture: ComponentFixture<GraphicWithReservationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicWithReservationsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphicWithReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
