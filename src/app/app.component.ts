import { Component } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthStateService } from './services/auth/authState.service';
import { ModelsStateService } from './services/models/modelsState.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Expivi';

  constructor(
    public dialog: MatDialog,
    public authStateService: AuthStateService,
    public modelStateService: ModelsStateService
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (!token) {
      this.authStateService.setIsLoggedIn(false);
    } else {
      this.authStateService.setIsLoggedIn(true);
    }
    // Opens the login model if the user is not logged in
    this.authStateService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.openLoginDialog();
        this.modelStateService.setModelsState([]);
        this.modelStateService.setAvators([]);
      }
    });
  }

  // Opens the login dialog
  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      data: {
      },
      disableClose: true,
      panelClass: 'myapp-no-padding-dialog',
      minHeight: '20vh',
      minWidth: '50vw',
    });
  }

  logout() {
    this.authStateService.logOut();
  }
}
