import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayFlightComponent } from './one-way-flight.component';

describe('OneWayFlightComponent', () => {
  let component: OneWayFlightComponent;
  let fixture: ComponentFixture<OneWayFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneWayFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWayFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
