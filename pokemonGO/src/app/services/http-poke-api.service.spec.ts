import { TestBed } from '@angular/core/testing';

import { HttpPokeApiService } from './http-poke-api.service';

describe('HttpPokeApiService', () => {
  let service: HttpPokeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPokeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
