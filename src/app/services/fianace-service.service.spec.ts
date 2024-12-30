import { TestBed } from '@angular/core/testing';

import { FianaceServiceService } from './fianace-service.service';

describe('FianaceServiceService', () => {
  let service: FianaceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FianaceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
