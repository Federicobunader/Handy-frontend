import { TestBed } from '@angular/core/testing';

import { PostsArService } from './posts-ar.service';

describe('PostsArService', () => {
  let service: PostsArService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsArService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
