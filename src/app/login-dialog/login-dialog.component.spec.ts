import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { MockAuthStateService } from '../helper/mock-helpers';
import { AuthStateService } from '../services/auth/authState.service';

import { LoginDialogComponent } from './login-dialog.component';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDialogComponent],
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: AuthStateService, useClass: MockAuthStateService },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not accept invalid form', () => {
    fixture.detectChanges();
    spyOn(component.authStateService, 'login');
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('123456789');

    component.onSubmit();
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('');

    component.onSubmit();
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('123456789');

    component.onSubmit();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should submit login form when submit button is clicked', () => {
    fixture.detectChanges();
    spyOn(component.authStateService, 'login');
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('123456789');

    component.onSubmit();
    expect(component.loginForm.valid).toBeTruthy();
    expect(component).toBeTruthy();
    expect(component.authStateService.login).toHaveBeenCalledTimes(1);
  });
});
