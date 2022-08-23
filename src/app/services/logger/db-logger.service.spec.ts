import { TestBed } from '@angular/core/testing';

import { DbLoggerService } from './db-logger.service';

describe('DbLoggerService', () => {
  let service: DbLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
