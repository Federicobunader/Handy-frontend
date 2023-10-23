import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsArViewerComponent } from './posts-ar-viewer.component';

describe('PostsArViewerComponent', () => {
  let component: PostsArViewerComponent;
  let fixture: ComponentFixture<PostsArViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsArViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsArViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
