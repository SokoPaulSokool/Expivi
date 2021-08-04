import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthStateService } from '../services/auth/authState.service';
import { ModelsStateService } from '../services/models/modelsState.service';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss'],
})
export class ConfirmDeleteDialogComponent {
  modelName = '';
  slug = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    public modelStateService: ModelsStateService
  ) {
    if (this.data && this.data.details) {
      this.modelName = this.data.details.name;
      this.slug = this.data.details.slug;
    }
  }

  // When user accepts delete
  onAccept() {
    this.modelStateService.deleteModel(this.data.details);
    this.dialogRef.close();
  }

  // when user declines delete
  onDecline() {
    this.dialogRef.close();
  }
}
