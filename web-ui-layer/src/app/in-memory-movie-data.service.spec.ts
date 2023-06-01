import { TestBed } from '@angular/core/testing';

import { InMemoryMovieDataService } from './in-memory-movie-data.service';

describe('InMemoryMovieDataServiceService', () => {
  let service: InMemoryMovieDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryMovieDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
