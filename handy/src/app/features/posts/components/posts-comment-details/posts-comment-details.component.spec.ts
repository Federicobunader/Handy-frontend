import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCommentDetailsComponent } from './posts-comment-details.component';

describe('PostsCommentDetailsComponent', () => {
  let component: PostsCommentDetailsComponent;
  let fixture: ComponentFixture<PostsCommentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCommentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsCommentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
