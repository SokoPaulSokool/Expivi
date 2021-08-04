import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { AuthStateService } from '../services/auth/authState.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public authStateService: AuthStateService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  ngOnInit(): void {
    this.authStateService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.dialogRef.close();
      }
    });
  }

  loginForm = this.fb.group({
    email: ['dev@xpv', Validators.required],
    password: ['password', Validators.required],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authStateService.login(email, password);
    }
  }
}
