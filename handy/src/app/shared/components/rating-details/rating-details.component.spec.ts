import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogPostRatingDetailsComponent } from './rating-details.component';

describe('PostRatingComponent', () => {
  let component: DialogPostRatingDetailsComponent;
  let fixture: ComponentFixture<DialogPostRatingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPostRatingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPostRatingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
