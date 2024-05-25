import { TestBed } from '@angular/core/testing';

import { PokemonDataServiceService } from './pokemon-data-service.service';

describe('PokemonDataServiceService', () => {
  let service: PokemonDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
