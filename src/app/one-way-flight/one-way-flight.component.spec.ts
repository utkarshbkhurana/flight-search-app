import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayFlightComponent } from './one-way-flight.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('OneWayFlightComponent', () => {
  let component: OneWayFlightComponent;
  let fixture: ComponentFixture<OneWayFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneWayFlightComponent, SearchFormComponent, SearchResultsComponent ],
      imports: [FormsModule, HttpClientModule]
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
