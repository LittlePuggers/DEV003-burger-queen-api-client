import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookedOrdersComponent } from './cooked-orders.component';

describe('CookedOrdersComponent', () => {
  let component: CookedOrdersComponent;
  let fixture: ComponentFixture<CookedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
