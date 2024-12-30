import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetHistoryComponent } from './budget-history.component';

describe('BudgetHistoryComponent', () => {
  let component: BudgetHistoryComponent;
  let fixture: ComponentFixture<BudgetHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
