import { TestBed } from '@angular/core/testing';

import { SolicitudesRobotsService } from './solicitudes-robots.service';

describe('SolicitudesRobotsService', () => {
  let service: SolicitudesRobotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudesRobotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
