import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDataComponent } from './budget-data.component';

describe('BudgetDataComponent', () => {
  let component: BudgetDataComponent;
  let fixture: ComponentFixture<BudgetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
