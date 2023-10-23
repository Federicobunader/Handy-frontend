import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCommentDashboardComponent } from './posts-comment-dashboard.component';

describe('PostsCommentDashboardComponent', () => {
  let component: PostsCommentDashboardComponent;
  let fixture: ComponentFixture<PostsCommentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCommentDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsCommentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
