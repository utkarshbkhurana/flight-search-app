import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormComponent, SearchResultsComponent ],
      imports: [FormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a search-results component`, async(() => {
    const fixture = TestBed.createComponent(SearchFormComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-search-results')).toBeDefined();
  }));
});
