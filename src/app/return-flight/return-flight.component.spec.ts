import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnFlightComponent } from './return-flight.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

describe('ReturnFlightComponent', () => {
  let component: ReturnFlightComponent;
  let fixture: ComponentFixture<ReturnFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnFlightComponent, SearchFormComponent, SearchResultsComponent ],
      imports: [FormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
