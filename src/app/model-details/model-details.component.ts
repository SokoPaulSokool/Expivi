import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModelsDetails } from '../interfaces/models-details';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss'],
})
export class ModelDetailsComponent implements OnInit {
  @Input() details: ModelsDetails = {
    avatar: '',
    category: '',
    description: '',
    downloads: 0,
    license: '',
    name: '',
    slug: '',
    vertices: 0,
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

   // Opens the login dialog
   openConfirmDeleteDialog(details:ModelsDetails) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        details
      },
      disableClose: false,
      panelClass: 'myapp-no-padding-dialog',
      minHeight: '20vh',
      width: '30vw',
    });
  }

}
