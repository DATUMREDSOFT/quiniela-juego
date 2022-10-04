import { TestBed } from '@angular/core/testing';

import { JuegoApiService } from './juego-api.service';

describe('JuegoApiService', () => {
  let service: JuegoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
