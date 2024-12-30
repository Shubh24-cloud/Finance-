import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDataComponent } from './income-data.component';

describe('IncomeDataComponent', () => {
  let component: IncomeDataComponent;
  let fixture: ComponentFixture<IncomeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
