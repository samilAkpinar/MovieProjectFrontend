import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgottenFormsComponent } from './password-forgotten-forms.component';

describe('PasswordForgottenFormsComponent', () => {
  let component: PasswordForgottenFormsComponent;
  let fixture: ComponentFixture<PasswordForgottenFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordForgottenFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordForgottenFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
