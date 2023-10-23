import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPostPhotoDetailsComponent } from './post-photos-details.component';

describe('PostPhotoDetailsComponent', () => {
  let component: DialogPostPhotoDetailsComponent;
  let fixture: ComponentFixture<DialogPostPhotoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPostPhotoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPostPhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
