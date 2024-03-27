import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestionationsPageComponent } from './destionations-page.component';

describe('DestionationsPageComponent', () => {
  let component: DestionationsPageComponent;
  let fixture: ComponentFixture<DestionationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestionationsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestionationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
