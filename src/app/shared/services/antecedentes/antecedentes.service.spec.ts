import { TestBed } from '@angular/core/testing';

import { AntecedentesService } from './antecedentes.service';

describe('AntecedentesService', () => {
  let service: AntecedentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntecedentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
