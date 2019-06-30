import { TestBed } from '@angular/core/testing';

import { StationApiService } from './station-api.service';

describe('StationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StationApiService = TestBed.get(StationApiService);
    expect(service).toBeTruthy();
  });
});
