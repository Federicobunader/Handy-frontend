import { TestBed } from '@angular/core/testing';
import { PostRatingService } from './user-rating.service';

describe('RatingService', () => {
  let service: PostRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
