import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpendatureDataComponent } from './expendature-data.component';

describe('ExpendatureDataComponent', () => {
  let component: ExpendatureDataComponent;
  let fixture: ComponentFixture<ExpendatureDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpendatureDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpendatureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
