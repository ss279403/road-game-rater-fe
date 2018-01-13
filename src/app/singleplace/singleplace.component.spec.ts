import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleplaceComponent } from './singleplace.component';

describe('SingleplaceComponent', () => {
  let component: SingleplaceComponent;
  let fixture: ComponentFixture<SingleplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
