import { TestBed } from '@angular/core/testing';

import { SessiontokenService } from './sessiontoken.service';

describe('SessiontokenService', () => {
  let service: SessiontokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessiontokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
