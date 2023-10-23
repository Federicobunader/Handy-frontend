import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsDashboardComponent } from './posts-dashboard.component';

describe('ToolsDashboardComponent', () => {
  let component: PostsDashboardComponent;
  let fixture: ComponentFixture<PostsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
