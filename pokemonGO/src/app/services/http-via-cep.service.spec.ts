import { TestBed } from '@angular/core/testing';

import { HttpViaCEPService } from './http-via-cep.service';

describe('HttpViaCEPService', () => {
  let service: HttpViaCEPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpViaCEPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
