import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNewGeneratedPasswordComponent } from './confirm-new-generated-password.component';

describe('ConfirmNewGeneratedPasswordComponent', () => {
  let component: ConfirmNewGeneratedPasswordComponent;
  let fixture: ComponentFixture<ConfirmNewGeneratedPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmNewGeneratedPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmNewGeneratedPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
